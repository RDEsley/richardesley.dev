/**
 * animacoes.js - Entrada por scroll, estado do cabeçalho, arco de progresso
 * e destaque da seção atual no menu.
 * html.motion-ready é adicionado por um script inline no <head>; este arquivo
 * sinaliza window.__motionOK para que o fallback do <head> não desfaça as animações.
 */
window.__motionOK = true;

function inicializarRevelacao() {
  const elementos = document.querySelectorAll(".reveal, .movement");
  if (!elementos.length) return;

  const contadores = new Map();
  elementos.forEach((el) => {
    const pai = el.parentElement;
    const i = contadores.get(pai) || 0;
    el.style.setProperty("--reveal-i", String(Math.min(i, 6)));
    contadores.set(pai, i + 1);
  });

  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("is-visible");
        obs.unobserve(entrada.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  elementos.forEach((el) => observer.observe(el));
}

function inicializarCabecalho() {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  let agendado = false;

  const atualizar = () => {
    agendado = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle("is-scrolled", y > 12);
    nav.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : "0");
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!agendado) {
        agendado = true;
        requestAnimationFrame(atualizar);
      }
    },
    { passive: true }
  );
  atualizar();
}

function inicializarSecaoAtual() {
  const links = document.querySelectorAll('.nav__link[href^="#"]');
  if (!links.length || !("IntersectionObserver" in window)) return;
  const mapa = new Map();
  const visiveis = new Set();
  links.forEach((a) => {
    const secao = document.querySelector(a.getAttribute("href"));
    if (secao) mapa.set(secao, a);
  });

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) visiveis.add(entrada.target);
        else visiveis.delete(entrada.target);
      });
      const atual = [...mapa.keys()].find((secao) => visiveis.has(secao));
      links.forEach((l) => {
        const ativo = atual && mapa.get(atual) === l;
        l.classList.toggle("is-current", Boolean(ativo));
        if (ativo) l.setAttribute("aria-current", "true");
        else l.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  mapa.forEach((_, secao) => observer.observe(secao));
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarRevelacao();
  inicializarCabecalho();
  inicializarSecaoAtual();
});
