/**
 * main.js - Entry point do portfólio
 * Menu mobile, projetos (repertório), certificados, formulário, cópia de e-mail e ano.
 * Depende de: src/data/projetos.js, src/data/certificados.js, aviso.js, certificados.js
 */

const IS_EN = document.documentElement.lang === "en";
const BASE_PATH = window.location.pathname.includes("/en/") ? "../" : "";

/** Resolve um campo string (igual nos dois idiomas) ou { pt, en } */
function t(valor) {
  if (valor == null) return "";
  if (typeof valor === "string") return valor;
  return (IS_EN ? valor.en : valor.pt) || "";
}

/** Escapa texto antes de inserir via innerHTML */
function esc(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resolverCaminho(caminho) {
  if (!caminho) return "";
  return /^https?:\/\//.test(caminho) ? caminho : BASE_PATH + caminho;
}

/** Data de hoje em YYYY.MM.DD */
function formatarDataHoje() {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

const ICONE_CADEADO =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>';

/* =========================================================
   Projetos — programa de concerto
   ========================================================= */
function renderizarProjetos() {
  const lista = document.querySelector("[data-projects]");
  if (!lista || typeof PROJETOS === "undefined") return;

  const L = IS_EN
    ? { repo: "Code", site: "Live site", destaque: "Featured", privado: "Private code" }
    : { repo: "Código", site: "Ver no ar", destaque: "Destaque", privado: "Código privado" };

  lista.innerHTML = PROJETOS.map((p, indice) => {
    const numero = String(indice + 1).padStart(2, "0");
    const logoClasses = (p.logoEstilo || "")
      .split(" ")
      .filter(Boolean)
      .map((e) => ` program__logo--${e}`)
      .join("");
    const logo = p.logo
      ? `<img src="${resolverCaminho(p.logo)}" alt="" class="program__logo${logoClasses}" loading="lazy" decoding="async">`
      : "";

    const statusTexto = t(p.status);
    const data = typeof p.statusDate === "string" ? p.statusDate : p.statusDate ? formatarDataHoje() : "";
    const status = statusTexto
      ? `<p class="program__status mono" data-state="${p.estado || "done"}">${esc(statusTexto)}${
          data ? ` <span aria-hidden="true">·</span> ${data}` : ""
        }</p>`
      : "";

    const tech = (p.tech || []).map((tc) => `<li>${esc(tc)}</li>`).join("");

    const links = [];
    if (p.site) {
      links.push(
        `<a href="${p.site}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">${L.site} <span class="btn__arrow" aria-hidden="true">↗</span></a>`
      );
    }
    if (p.repoPrivado) {
      links.push(
        `<button type="button" class="btn" data-aviso="repo-privado" data-titulo="${esc(p.titulo)}" data-site="${p.site || ""}">${ICONE_CADEADO}${L.privado}</button>`
      );
    } else if (p.repo) {
      links.push(
        `<a href="${p.repo}" target="_blank" rel="noopener noreferrer" class="btn">${L.repo} <span class="btn__arrow" aria-hidden="true">↗</span></a>`
      );
    }

    const midia = p.imagem
      ? `<div class="program__media"${p.destaque ? ` data-flag="${L.destaque}"` : ""}>
          <img src="${resolverCaminho(p.imagem)}" alt="${esc(IS_EN ? `${p.titulo} preview` : `Prévia de ${p.titulo}`)}" loading="lazy" decoding="async">
        </div>`
      : "";

    return `
      <li class="program__item reveal${p.destaque ? " program__item--featured" : ""}">
        <p class="program__no" aria-hidden="true"><small>N.º</small>${numero}</p>
        <div class="program__body">
          <h3 class="program__title">${logo}<span>${esc(p.titulo)}</span></h3>
          ${status}
          <p class="program__desc">${esc(t(p.descricao))}</p>
          <ul class="program__tech" aria-label="${IS_EN ? "Technologies" : "Tecnologias"}">${tech}</ul>
          <div class="program__links">${links.join("")}</div>
        </div>
        ${midia}
      </li>`;
  }).join("");

  lista.addEventListener("click", (e) => {
    const alvo = e.target instanceof Element ? e.target.closest("[data-aviso='repo-privado']") : null;
    if (!alvo) return;
    const nome = alvo.dataset.titulo || (IS_EN ? "This project" : "Este projeto");
    const site = alvo.dataset.site;
    abrirAviso({
      titulo: IS_EN ? "Private repository" : "Repositório privado",
      texto: IS_EN
        ? `${nome} has a private source repository. I'm glad to walk through the architecture, technical decisions and code samples in a conversation or interview.`
        : `O código-fonte de ${nome} permanece privado. Posso apresentar a arquitetura, as decisões técnicas e trechos do código em uma conversa ou entrevista.`,
      cta: site ? { label: IS_EN ? "See it live" : "Ver sistema no ar", href: site } : null,
      fecharLabel: IS_EN ? "Close" : "Fechar",
    });
  });
}

/* =========================================================
   Menu mobile
   ========================================================= */
function inicializarMenu() {
  const botao = document.querySelector("[data-menu-toggle]");
  const menu = document.getElementById("menu");
  if (!botao || !menu) return;

  const rotulos = IS_EN ? ["Menu", "Close"] : ["Menu", "Fechar"];

  const definir = (aberto) => {
    menu.classList.toggle("is-open", aberto);
    document.body.classList.toggle("menu-open", aberto);
    botao.setAttribute("aria-expanded", String(aberto));
    botao.textContent = aberto ? rotulos[1] : rotulos[0];
  };

  menu.querySelectorAll(".nav__links li").forEach((li, i) => li.style.setProperty("--i", String(i)));

  botao.addEventListener("click", () => definir(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => definir(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      definir(false);
      botao.focus();
    }
  });
  window.matchMedia("(min-width: 861px)").addEventListener("change", (mq) => {
    if (mq.matches) definir(false);
  });
}

/* =========================================================
   Formulário (Formspree via fetch)
   ========================================================= */
function inicializarFormulario() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const botao = form.querySelector('button[type="submit"]');
  const feedback = form.querySelector(".form__feedback");
  const rotuloOriginal = botao.innerHTML;

  const avisar = (estado, texto) => {
    feedback.dataset.state = estado;
    feedback.textContent = texto;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    botao.disabled = true;
    botao.textContent = IS_EN ? "Sending…" : "Enviando…";
    avisar("", "");

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      avisar("ok", IS_EN ? "Message sent. Thank you — I'll reply soon." : "Mensagem enviada. Obrigado — respondo em breve.");
    } catch (err) {
      avisar(
        "error",
        IS_EN
          ? "Couldn't send right now. Please email me directly."
          : "Não foi possível enviar agora. Se preferir, escreva direto para o meu e-mail."
      );
    } finally {
      botao.disabled = false;
      botao.innerHTML = rotuloOriginal;
    }
  });
}

/* =========================================================
   Copiar e-mail
   ========================================================= */
function inicializarCopiaEmail() {
  const alvo = document.querySelector("[data-copy-email]");
  if (!alvo) return;
  const rotulo = alvo.querySelector(".contact__email-label");
  const original = rotulo ? rotulo.textContent : "";

  alvo.addEventListener("click", async () => {
    const email = alvo.dataset.copyEmail;
    try {
      await navigator.clipboard.writeText(email);
      alvo.classList.add("is-copied");
      if (rotulo) rotulo.textContent = IS_EN ? "Copied to clipboard ✓" : "Copiado para a área de transferência ✓";
      setTimeout(() => {
        alvo.classList.remove("is-copied");
        if (rotulo) rotulo.textContent = original;
      }, 2200);
    } catch (err) {
      window.location.href = `mailto:${email}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProjetos();
  if (typeof renderizarCertificados === "function") renderizarCertificados();
  inicializarMenu();
  inicializarFormulario();
  inicializarCopiaEmail();

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
});
