/**
 * animacoes.js - Letras dançando, typewriter do greeting e entrada por scroll
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
 * Dispara a animação de letras no título do hero (classe .is-dancing).
 * Reinicia a cada chamada para permitir replay ao voltar ao topo.
 */
function dispararDancaTitulo(titulo) {
  if (!titulo || titulo.dataset.danceReady !== "true") return;

  titulo.classList.remove("is-dancing");
  // Força reflow para reiniciar a animação CSS
  void titulo.offsetWidth;
  titulo.classList.add("is-dancing");

  const letras = titulo.querySelectorAll(".dance__c");
  const ultima = letras[letras.length - 1];
  if (!ultima) return;

  const aoTerminar = (e) => {
    if (e.animationName !== "dance-hop") return;
    titulo.classList.remove("is-dancing");
    ultima.removeEventListener("animationend", aoTerminar);
  };
  ultima.addEventListener("animationend", aoTerminar);
}

/**
 * Typewriter no balão "Olá, eu sou o Richard" / "Hi, I'm Richard".
 * Preserva o texto completo em aria-label para acessibilidade.
 */
function digitarGreeting(greeting, { onComplete } = {}) {
  if (!greeting) return;

  const texto =
    greeting.getAttribute("aria-label") ||
    greeting.dataset.typeText ||
    greeting.textContent.trim();
  if (!texto) return;

  greeting.dataset.typeText = texto;
  greeting.setAttribute("aria-label", texto);
  greeting.classList.add("is-typing");
  greeting.classList.remove("is-typed");

  const preferReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (preferReduced) {
    greeting.textContent = texto;
    greeting.classList.remove("is-typing");
    greeting.classList.add("is-typed");
    if (typeof onComplete === "function") onComplete();
    return;
  }

  if (greeting._typeTimer) {
    clearInterval(greeting._typeTimer);
    greeting._typeTimer = null;
  }

  greeting.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "hero__type-cursor";
  cursor.setAttribute("aria-hidden", "true");
  greeting.appendChild(cursor);

  let i = 0;
  const velocidade = 42;

  greeting._typeTimer = setInterval(() => {
    if (i >= texto.length) {
      clearInterval(greeting._typeTimer);
      greeting._typeTimer = null;
      cursor.remove();
      greeting.classList.remove("is-typing");
      greeting.classList.add("is-typed");
      if (typeof onComplete === "function") onComplete();
      return;
    }
    cursor.insertAdjacentText("beforebegin", texto.charAt(i));
    i += 1;
  }, velocidade);
}

/**
 * Anima greeting (typewriter) + título (dance) ao entrar no hero.
 * Replay sempre que o usuário volta ao topo / hero reentra na viewport.
 */
function inicializarHeroEntrada() {
  const hero = document.getElementById("home");
  const greeting = document.querySelector(".hero__greeting");
  const titulo = document.querySelector(".hero__title");
  if (!hero || (!greeting && !titulo)) return;

  const preferReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tocar = () => {
    if (greeting) {
      digitarGreeting(greeting, {
        onComplete: () => {
          if (titulo) dispararDancaTitulo(titulo);
        },
      });
    } else if (titulo) {
      dispararDancaTitulo(titulo);
    }
  };

  if (preferReduced || !("IntersectionObserver" in window)) {
    if (greeting) {
      const texto = greeting.dataset.typeText || greeting.textContent.trim();
      greeting.setAttribute("aria-label", texto);
      greeting.textContent = texto;
      greeting.classList.add("is-typed");
    }
    return;
  }

  let estavaVisivel = false;
  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        const visivel = entrada.isIntersecting && entrada.intersectionRatio >= 0.45;
        if (visivel && !estavaVisivel) {
          tocar();
        }
        estavaVisivel = visivel;
      });
    },
    { threshold: [0, 0.45, 0.75] }
  );

  observer.observe(hero);
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
  inicializarHeroEntrada();
});
