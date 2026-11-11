/**
 * cordas.js - Pauta de cinco cordas interativas no hero
 *
 * Cada linha é uma corda simulada pela equação da onda (integração de Verlet com
 * amortecimento). Passar o cursor/dedo atravessando uma linha "belisca" a corda.
 * Som opcional (desligado por padrão), sintetizado com Karplus-Strong via Web Audio.
 * Sem dependências. Respeita prefers-reduced-motion (desenha linhas estáticas).
 */
(function () {
  const canvas = document.querySelector("[data-strings]");
  if (!canvas || !canvas.getContext) return;

  const stage = canvas.parentElement;
  const anchor = document.querySelector(".hero__name");
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const NUM = 5;
  let SEG = 96; // recalculado pela largura (~10px por segmento)
  const TENSAO = 0.5; // <= 1 para estabilidade numérica
  const AMORTECIMENTO = 0.988;
  const VISCOSIDADE = 0.18; // amortece modos de alta frequência (evita serrilhado)
  const COR_TINTA = [23, 20, 15];
  const COR_VERNIZ = [166, 60, 22];
  // Agudo (linha de cima) para grave: Mi5, Si4, Lá4, Sol4, Ré4
  const NOTAS = [659.26, 493.88, 440.0, 392.0, 293.66];

  let W = 0;
  let H = 0;
  let cordas = [];
  let rodando = false;
  let desenho = reduce ? 1 : 0; // progresso do traço inicial (0 → 1)
  let ultimo = null;

  function medir() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = stage.getBoundingClientRect();
    W = r.width;
    H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    SEG = Math.max(36, Math.min(128, Math.round(W / 10)));

    const a = anchor ? anchor.getBoundingClientRect() : r;
    const topo = a.top - r.top + a.height * 0.12;
    const base = a.top - r.top + a.height * 0.9;

    cordas = Array.from({ length: NUM }, (_, i) => ({
      y: topo + ((base - topo) * i) / (NUM - 1),
      u: new Float32Array(SEG + 1),
      p: new Float32Array(SEG + 1),
      energia: 0,
      ultimoSom: 0,
    }));
    desenhar();
  }

  function passo() {
    const tmp = new Float32Array(SEG + 1);
    const vel = new Float32Array(SEG + 1);
    let ativo = false;
    cordas.forEach((c) => {
      for (let sub = 0; sub < 2; sub++) {
        for (let i = 0; i <= SEG; i++) vel[i] = (c.u[i] - c.p[i]) * AMORTECIMENTO;
        for (let i = 1; i < SEG; i++) {
          const visc = VISCOSIDADE * (vel[i - 1] + vel[i + 1] - 2 * vel[i]);
          tmp[i] = c.u[i] + vel[i] + visc + TENSAO * (c.u[i - 1] + c.u[i + 1] - 2 * c.u[i]);
        }
        c.p.set(c.u);
        c.u.set(tmp);
      }
      let e = 0;
      for (let i = 0; i <= SEG; i++) e = Math.max(e, Math.abs(c.u[i]));
      c.energia = e;
      if (e > 0.05) ativo = true;
    });
    return ativo;
  }

  function desenhar() {
    ctx.clearRect(0, 0, W, H);
    const limite = W * easeOut(desenho);
    cordas.forEach((c) => {
      const t = Math.min(c.energia / 14, 1);
      const cor = COR_TINTA.map((v, k) => Math.round(v + (COR_VERNIZ[k] - v) * t));
      ctx.strokeStyle = `rgba(${cor.join(",")}, ${0.26 + t * 0.6})`;
      ctx.lineWidth = 1 + t * 1.2;
      ctx.beginPath();
      ctx.moveTo(0, c.y + c.u[0]);
      for (let i = 1; i <= SEG; i++) {
        const x = (i / SEG) * W;
        if (x > limite) {
          ctx.lineTo(limite, c.y + c.u[i]);
          break;
        }
        ctx.lineTo(x, c.y + c.u[i]);
      }
      ctx.stroke();
    });
  }

  function easeOut(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function loop() {
    if (desenho < 1) desenho = Math.min(1, desenho + 0.014);
    const ativo = passo();
    desenhar();
    if (ativo || desenho < 1) {
      requestAnimationFrame(loop);
    } else {
      rodando = false;
    }
  }

  function acordar() {
    if (reduce) return;
    if (!rodando) {
      rodando = true;
      requestAnimationFrame(loop);
    }
  }

  function beliscar(corda, indice, forca, comSom = true) {
    const largura = Math.max(6, Math.round(SEG * 0.12));
    for (let j = 1; j < SEG; j++) {
      const d = Math.abs(j - indice);
      if (d > largura) continue;
      const v = forca * 0.5 * (1 + Math.cos((Math.PI * d) / largura));
      corda.u[j] += v;
      corda.p[j] = corda.u[j];
    }
    if (comSom) tocar(cordas.indexOf(corda), Math.min(Math.abs(forca) / 22, 1));
    acordar();
  }

  function posicao(evt) {
    const r = stage.getBoundingClientRect();
    return { x: evt.clientX - r.left, y: evt.clientY - r.top };
  }

  function atravessar(de, para) {
    cordas.forEach((c) => {
      if ((de.y - c.y) * (para.y - c.y) >= 0) return;
      const t = (c.y - de.y) / (para.y - de.y);
      const x = de.x + (para.x - de.x) * t;
      const indice = Math.round((x / W) * SEG);
      if (indice <= 0 || indice >= SEG) return;
      const dy = para.y - de.y;
      const forca = Math.sign(dy) * Math.min(Math.max(Math.abs(dy) * 0.9, 7), 24);
      beliscar(c, indice, forca);
    });
  }

  if (!reduce) {
    stage.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      const atual = posicao(e);
      if (ultimo) atravessar(ultimo, atual);
      ultimo = atual;
    });
    stage.addEventListener("pointerleave", () => {
      ultimo = null;
    });

    // Toque: deslizar o dedo verticalmente cruza as cordas (sem bloquear o scroll)
    let toqueAnterior = null;
    stage.addEventListener(
      "touchstart",
      (e) => {
        toqueAnterior = posicao(e.touches[0]);
        // Toque perto de uma corda também belisca
        const perto = cordas.find((c) => Math.abs(c.y - toqueAnterior.y) < 16);
        if (perto) beliscar(perto, Math.round((toqueAnterior.x / W) * SEG), 12);
      },
      { passive: true }
    );
    stage.addEventListener(
      "touchmove",
      (e) => {
        const atual = posicao(e.touches[0]);
        if (toqueAnterior) atravessar(toqueAnterior, atual);
        toqueAnterior = atual;
      },
      { passive: true }
    );
    stage.addEventListener("touchend", () => {
      toqueAnterior = null;
    });
  }

  /* ---------- Som (Karplus-Strong) ---------- */
  let audio = null;
  let buffers = [];
  let somLigado = false;

  function sintetizar(freq) {
    const sr = audio.sampleRate;
    const len = Math.floor(sr * 1.8);
    const periodo = Math.max(2, Math.round(sr / freq));
    const buf = audio.createBuffer(1, len, sr);
    const out = buf.getChannelData(0);
    const anel = new Float32Array(periodo);
    for (let i = 0; i < periodo; i++) anel[i] = Math.random() * 2 - 1;
    let k = 0;
    for (let i = 0; i < len; i++) {
      const prox = (k + 1) % periodo;
      out[i] = anel[k];
      anel[k] = 0.4985 * (anel[k] + anel[prox]);
      k = prox;
    }
    return buf;
  }

  function tocar(indice, volume) {
    if (!somLigado || !audio || indice < 0) return;
    const c = cordas[indice];
    const agora = audio.currentTime;
    if (agora - c.ultimoSom < 0.07) return;
    c.ultimoSom = agora;
    const fonte = audio.createBufferSource();
    const ganho = audio.createGain();
    fonte.buffer = buffers[indice];
    ganho.gain.value = 0.08 + volume * 0.22;
    fonte.connect(ganho).connect(audio.destination);
    fonte.start();
  }

  // Há mais de um botão (faixa abaixo das cordas no desktop, ao lado da foto no mobile)
  const botoesSom = document.querySelectorAll("[data-sound-toggle]");
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  botoesSom.forEach((botaoSom) => {
    if (!AudioCtx) {
      botaoSom.hidden = true;
      return;
    }
    botaoSom.addEventListener("click", () => {
      if (!audio) {
        audio = new AudioCtx();
        buffers = NOTAS.map(sintetizar);
      }
      if (audio.state === "suspended") audio.resume();
      somLigado = !somLigado;
      botoesSom.forEach((b) => b.setAttribute("aria-pressed", String(somLigado)));
      if (somLigado) {
        // Arpejo curto confirmando que o som está ativo
        [4, 3, 2, 1, 0].forEach((i, n) =>
          setTimeout(() => cordas[i] && beliscar(cordas[i], Math.round(SEG * (0.3 + n * 0.1)), 10), n * 90)
        );
      }
    });
  });

  /* ---------- Inicialização ---------- */
  function iniciar() {
    medir();
    if (reduce) return;
    acordar();
    // Arpejo de abertura (silencioso): cada corda vibra logo após ser desenhada
    cordas.forEach((c, i) => {
      setTimeout(() => beliscar(c, Math.round(SEG * (0.62 + i * 0.06)), 9 - i, false), 900 + i * 110);
    });
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(medir, 120);
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(iniciar);
  } else {
    window.addEventListener("load", iniciar);
  }
})();
