/**
 * main.js - Entry point do portfólio
 * Inicializa tema, certificados, projetos, navbar mobile e formulário
 */

document.addEventListener("DOMContentLoaded", () => {
  // Tema
  carregarTema();
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", alternarTema);
  }

  // Certificados
  const certContainer = document.querySelector(".certificates__grid");
  if (certContainer && typeof CERTIFICADOS !== "undefined") {
    const { cursos, formacoes, bootcamps } = contarCertificados();
    const countersEl = document.querySelector(".certificates__counters");
    if (countersEl) {
      const isEn = document.documentElement.lang === "en";
      const lbl1 = isEn ? "Courses" : "Cursos";
      const lbl2 = isEn ? "Formations" : "Formações";
      const lbl3 = isEn ? "Bootcamps" : "Bootcamps";
      countersEl.innerHTML = `${lbl1}: <span>${cursos}</span> | ${lbl2}: <span>${formacoes}</span> | ${lbl3}: <span>${bootcamps}</span>`;
    }
    renderizarCertificados(certContainer);
  }

  // Projetos (renderização via HTML estático ou dados)
  if (typeof PROJETOS !== "undefined") {
    renderizarProjetos();
  }

  // Navbar mobile (hamburger)
  const hamburger = document.querySelector(".navbar__hamburger");
  const nav = document.querySelector(".navbar__nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("is-active");
      nav.classList.toggle("is-open");
      document.body.style.overflow = nav.classList.contains("is-open") ? "hidden" : "";
    });

    // Fecha menu ao clicar em link
    nav.querySelectorAll(".navbar__link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("is-active");
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  // Formulário de contato (Formspree via AJAX)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const successEl = document.querySelector(".contact__success");
      const action = form.getAttribute("action");

      if (!action || action.includes("YOUR_FORMSPREE_ID")) {
        alert(document.documentElement.lang === "en" ? "Configure Formspree ID in the form action attribute." : "Configure o ID do Formspree no atributo action do formulário.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = document.documentElement.lang === "en" ? "Sending..." : "Enviando...";

      try {
        const formData = new FormData(form);
        const res = await fetch(action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          successEl?.classList.add("is-visible");
          form.reset();
        } else {
          alert(document.documentElement.lang === "en" ? "Error sending. Try again." : "Erro ao enviar. Tente novamente.");
        }
      } catch (err) {
        alert(document.documentElement.lang === "en" ? "Connection error. Try again." : "Erro de conexão. Tente novamente.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = document.documentElement.lang === "en" ? "Send" : "Enviar";
      }
    });
  }

  // Copiar email ao clicar
  const emailLink = document.querySelector('[data-copy-email]');
  if (emailLink) {
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailLink.getAttribute("data-copy-email");
      navigator.clipboard?.writeText(email).then(() => {
        emailLink.classList.add("copied");
        setTimeout(() => emailLink.classList.remove("copied"), 2000);
      });
    });
  }

  // Ano dinâmico no footer
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/**
 * Retorna a data de hoje no formato YYYY.MM.DD (atualiza automaticamente a cada dia)
 */
function formatarDataHoje() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

/**
 * Resolve um campo que pode ser string (mesmo texto nos dois idiomas) ou { pt, en }
 */
function t(valor, isEn) {
  if (valor == null) return "";
  if (typeof valor === "string") return valor;
  return (isEn ? valor.en : valor.pt) || "";
}

const ICONE_CADEADO =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>';

const ICONE_RAIO =
  '<svg class="card__image-bolt" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>';

/**
 * Renderiza os projetos no grid a partir de PROJETOS
 * Usa lang do HTML para labels (Repositório/Repository, Site)
 */
function renderizarProjetos() {
  const grid = document.querySelector(".projects__grid");
  if (!grid || typeof PROJETOS === "undefined") return;

  const isEn = document.documentElement.lang === "en";
  const lblRepo = isEn ? "Repository" : "Repositório";
  const lblSite = isEn ? "Site" : "Site";
  const lblProjeto = isEn ? "Project" : "Projeto";

  const basePath = window.location.pathname.includes("/en/") ? "../" : "";
  grid.innerHTML = PROJETOS.map((p) => {
    const imgSrc = p.imagem ? (p.imagem.startsWith("http") ? p.imagem : basePath + p.imagem) : null;
    const img = imgSrc
      ? `<img src="${imgSrc}" alt="${p.titulo}" class="card__image" loading="lazy" decoding="async" />`
      : `<div class="card__image card__image--placeholder">${ICONE_RAIO}<span class="card__image-letter">${(p.titulo.trim().charAt(0) || lblProjeto.charAt(0)).toUpperCase()}</span></div>`;

    const tags = (p.tech || [])
      .map((tc) => `<span class="card__tag">${tc}</span>`)
      .join("");

    const links = [];
    if (p.repoPrivado) {
      links.push(
        `<button type="button" class="card__link card__link--privado" data-aviso="repo-privado" data-site="${p.site || ""}">${ICONE_CADEADO}${lblRepo}</button>`
      );
    } else if (p.repo) {
      links.push(`<a href="${p.repo}" target="_blank" rel="noopener noreferrer" class="card__link">${lblRepo}</a>`);
    }
    if (p.site) links.push(`<a href="${p.site}" target="_blank" rel="noopener noreferrer" class="card__link">${lblSite}</a>`);

    const statusTexto = t(p.status, isEn);
    const statusText = statusTexto ? (p.statusDate ? `${statusTexto} (${formatarDataHoje()})` : statusTexto) : "";
    const statusBadge = statusText ? `<span class="card__status">${statusText}</span>` : "";

    const classeCard = "card card--project reveal" + (p.destaque ? " card--destaque" : "");

    return `
      <article class="${classeCard}">
        ${img}
        <h3 class="card__title" data-dance>${p.titulo}</h3>
        ${statusBadge}
        <p class="card__description">${t(p.descricao, isEn)}</p>
        <div class="card__tags">${tags}</div>
        <div class="card__links">${links.join("")}</div>
      </article>
    `;
  }).join("");

  grid.addEventListener("click", (e) => {
    const alvo = e.target instanceof Element ? e.target.closest("[data-aviso='repo-privado']") : null;
    if (!alvo) return;
    const site = alvo.dataset.site;
    abrirAviso({
      titulo: isEn ? "Private repository" : "Repositório privado",
      texto: isEn
        ? "GMC is under active development under contract and its source code remains private. I'm glad to walk through the architecture, technical decisions and code samples in a conversation or interview."
        : "O GMC (Granja Mult Core) está em desenvolvimento sob contrato e o código-fonte permanece privado. Posso apresentar a arquitetura, as decisões técnicas e trechos do código em uma conversa ou entrevista.",
      cta: site ? { label: isEn ? "See it live" : "Ver sistema no ar", href: site } : null,
      fecharLabel: isEn ? "Close" : "Fechar",
    });
  });
}
