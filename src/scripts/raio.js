/**
 * raio.js - Raio que cai onde o usuário clica
 * Geometria por deslocamento de ponto médio (fractal clássico de relâmpago),
 * com 2 ramificações e 3 traços empilhados (halo, núcleo externo, núcleo interno).
 * Desliga sozinho sob prefers-reduced-motion.
 */

const SVG_NS = "http://www.w3.org/2000/svg";
const RAIO_THROTTLE_MS = 110;
const RAIO_MAX_ATIVOS = 3;
const RAIO_SELETOR_IGNORADO = "input, textarea, select, [contenteditable='true'], [contenteditable='']";

let raioCamada = null;
let raioAtivos = 0;
let raioUltimoClique = 0;

/**
 * Desloca o ponto médio do segmento perpendicularmente, recursivamente.
 * @returns {number[][]} lista de pontos [x, y] do início ao fim
 */
function gerarSegmentoFractal(x1, y1, x2, y2, deslocamento, nivel) {
  if (nivel <= 0) return [[x1, y1], [x2, y2]];

  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const comprimento = Math.hypot(dx, dy) || 1;
  const px = -dy / comprimento;
  const py = dx / comprimento;
  const offset = (Math.random() - 0.5) * 2 * deslocamento;
  const nx = mx + px * offset;
  const ny = my + py * offset;

  const esquerda = gerarSegmentoFractal(x1, y1, nx, ny, deslocamento / 2, nivel - 1);
  const direita = gerarSegmentoFractal(nx, ny, x2, y2, deslocamento / 2, nivel - 1);
  return [...esquerda.slice(0, -1), ...direita];
}

function gerarRaioCompleto(x1, y1, x2, y2) {
  const tronco = gerarSegmentoFractal(x1, y1, x2, y2, 22, 6);
  const ramos = [];

  for (let i = 0; i < 2; i++) {
    const idx = Math.floor(tronco.length * (0.3 + Math.random() * 0.35));
    const origem = tronco[idx];
    const proximo = tronco[Math.min(idx + 1, tronco.length - 1)];
    const anguloBase = Math.atan2(proximo[1] - origem[1], proximo[0] - origem[0]);
    const sentido = Math.random() < 0.5 ? -1 : 1;
    const anguloRamo = anguloBase + sentido * (25 + Math.random() * 25) * (Math.PI / 180);
    const restante = Math.hypot(x2 - origem[0], y2 - origem[1]);
    const comprimentoRamo = restante * (0.3 + Math.random() * 0.25);
    const fimX = origem[0] + Math.cos(anguloRamo) * comprimentoRamo;
    const fimY = origem[1] + Math.sin(anguloRamo) * comprimentoRamo;
    ramos.push(gerarSegmentoFractal(origem[0], origem[1], fimX, fimY, 10, 3));
  }

  return { tronco, ramos };
}

function pontosParaPath(pontos) {
  return pontos.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
}

function obterCamadaRaio() {
  if (raioCamada) return raioCamada;
  raioCamada = document.createElementNS(SVG_NS, "svg");
  raioCamada.setAttribute("id", "raio-layer");
  raioCamada.setAttribute("aria-hidden", "true");
  document.body.appendChild(raioCamada);
  return raioCamada;
}

function desenharImpacto(layer, x, y) {
  const anel = document.createElementNS(SVG_NS, "circle");
  anel.setAttribute("cx", String(x));
  anel.setAttribute("cy", String(y));
  anel.setAttribute("r", "0");
  anel.setAttribute("class", "raio__ring");
  layer.appendChild(anel);
  const animAnel = anel.animate(
    [
      { r: 0, opacity: 0.9 },
      { r: 26, opacity: 0 },
    ],
    { duration: 340, easing: "ease-out", fill: "forwards" }
  );
  animAnel.onfinish = () => anel.remove();

  const numFaiscas = 6;
  for (let i = 0; i < numFaiscas; i++) {
    const angulo = (Math.PI * 2 * i) / numFaiscas + Math.random() * 0.4;
    const distancia = 14 + Math.random() * 14;
    const dx = Math.cos(angulo) * distancia;
    const dy = Math.sin(angulo) * distancia;

    const faisca = document.createElementNS(SVG_NS, "circle");
    faisca.setAttribute("cx", String(x));
    faisca.setAttribute("cy", String(y));
    faisca.setAttribute("r", "2");
    faisca.setAttribute("class", "raio__spark");
    layer.appendChild(faisca);

    const animFaisca = faisca.animate(
      [
        { transform: "translate(0px, 0px)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 },
      ],
      { duration: 300, easing: "ease-out", fill: "forwards" }
    );
    animFaisca.onfinish = () => faisca.remove();
  }
}

function desenharRaio(x, y) {
  const layer = obterCamadaRaio();
  const alturaQueda = 150 + Math.random() * 70;
  const deslocamentoX = (Math.random() - 0.5) * 60;
  const x1 = x + deslocamentoX;
  const y1 = Math.max(0, y - alturaQueda);

  const { tronco, ramos } = gerarRaioCompleto(x1, y1, x, y);
  const grupo = document.createElementNS(SVG_NS, "g");
  const caminhos = [tronco, ...ramos];
  const elementosTraco = [];

  caminhos.forEach((pontos, idx) => {
    const d = pontosParaPath(pontos);
    ["halo", "outer", "inner"].forEach((variante) => {
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", `raio__bolt raio__bolt--${variante}`);
      if (idx > 0) {
        path.style.opacity = variante === "halo" ? "0.35" : "0.75";
      }
      grupo.appendChild(path);
      elementosTraco.push(path);
    });
  });

  layer.appendChild(grupo);
  raioAtivos++;

  elementosTraco.forEach((path) => {
    const comprimento = path.getTotalLength();
    path.style.strokeDasharray = String(comprimento);
    path.style.strokeDashoffset = String(comprimento);
    path.animate([{ strokeDashoffset: comprimento }, { strokeDashoffset: 0 }], {
      duration: 85,
      easing: "ease-out",
      fill: "forwards",
    });
  });

  grupo.animate(
    [
      { opacity: 1, offset: 0 },
      { opacity: 1, offset: 0.09 },
      { opacity: 0.3, offset: 0.22 },
      { opacity: 1, offset: 0.3 },
      { opacity: 0.45, offset: 0.5 },
      { opacity: 0.95, offset: 0.65 },
      { opacity: 0, offset: 1 },
    ],
    { duration: 470, delay: 85, easing: "linear", fill: "forwards" }
  );

  setTimeout(() => desenharImpacto(layer, x, y), 85);

  setTimeout(() => {
    grupo.remove();
    raioAtivos--;
  }, 470 + 85 + 20);
}

function aoClicarRaio(e) {
  const agora = performance.now();
  if (agora - raioUltimoClique < RAIO_THROTTLE_MS) return;
  if (raioAtivos >= RAIO_MAX_ATIVOS) return;

  const alvo = e.target;
  if (alvo instanceof Element && alvo.closest(RAIO_SELETOR_IGNORADO)) return;

  raioUltimoClique = agora;
  desenharRaio(e.clientX, e.clientY);
}

function iniciarRaio() {
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduzMovimento) return;
  document.addEventListener("click", aoClicarRaio);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarRaio);
} else {
  iniciarRaio();
}
