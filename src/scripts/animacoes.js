/**
 * animacoes.js - Letras dançando no hover + entrada por scroll
 * Roda depois de main.js/certificados.js, para já encontrar o conteúdo dinâmico renderizado.
 */

/**
 * Quebra o texto de um elemento em <span class="dance__c"> por letra, dentro de um
 * wrapper aria-hidden — o elemento original ganha aria-label com o texto completo,
 * então leitor de tela lê a frase normal e nunca as letras soltas.
 */
function dividirTexto(elemento) {
  if (elemento.dataset.danceReady === "true") return;

  const textoOriginal = elemento.textContent.trim();
  if (!textoOriginal) return;

  const wrapper = document.createElement("span");
  wrapper.className = "dance__wrap";
  wrapper.setAttribute("aria-hidden", "true");

  let indice = 0;
  const construir = (origem, destino) => {
    Array.from(origem.childNodes).forEach((filho) => {
      if (filho.nodeType === Node.TEXT_NODE) {
        Array.from(filho.textContent).forEach((letra) => {
          if (letra.trim() === "") {
            destino.appendChild(document.createTextNode(letra));
          } else {
            const span = document.createElement("span");
            span.className = "dance__c";
            span.style.setProperty("--i", String(indice));
            span.textContent = letra;
            destino.appendChild(span);
          }
          indice++;
        });
      } else if (filho.nodeType === Node.ELEMENT_NODE) {
        const clone = filho.cloneNode(false);
        destino.appendChild(clone);
        construir(filho, clone);
      }
    });
  };

  construir(elemento, wrapper);
  elemento.setAttribute("aria-label", textoOriginal);
  elemento.textContent = "";
  elemento.appendChild(wrapper);
  elemento.dataset.danceReady = "true";
}

function inicializarDanca() {
  document.querySelectorAll("[data-dance]").forEach((elemento) => dividirTexto(elemento));
}

/**
 * Pop-in por scroll nos elementos .reveal (cards, títulos de seção).
 * Progressive enhancement: só esconde via CSS depois que <html> ganha .reveal-ready,
 * então se o JS falhar o conteúdo estático continua visível.
 */
function inicializarRevelacao() {
  const elementos = document.querySelectorAll(".reveal");
  if (!elementos.length) return;

  const contadores = new Map();
  elementos.forEach((el) => {
    const pai = el.parentElement;
    const indice = contadores.get(pai) || 0;
    el.style.setProperty("--reveal-i", String(Math.min(indice, 8)));
    contadores.set(pai, indice + 1);
  });

  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  elementos.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("reveal-ready");
  inicializarDanca();
  inicializarRevelacao();
});
