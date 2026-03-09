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
      ? `<img src="${imgSrc}" alt="${p.titulo}" class="card__image" />`
      : `<div class="card__image" style="background: var(--accent-light); display: flex; align-items: center; justify-content: center; color: var(--accent); font-weight: 600;">${lblProjeto}</div>`;
    const tags = (p.tech || [])
      .map((t) => `<span class="card__tag">${t}</span>`)
      .join("");
    const links = [];
    if (p.repo) links.push(`<a href="${p.repo}" target="_blank" rel="noopener" class="card__link">${lblRepo}</a>`);
    if (p.site) links.push(`<a href="${p.site}" target="_blank" rel="noopener" class="card__link">${lblSite}</a>`);

    const statusText = p.status
      ? (p.statusDate ? `${p.status} (${formatarDataHoje()})` : p.status)
      : "";
    const statusBadge = statusText ? `<span class="card__status">${statusText}</span>` : "";

    return `
      <article class="card card--project">
        ${img}
        <h3 class="card__title">${p.titulo}</h3>
        ${statusBadge}
        <p class="card__description">${p.descricao}</p>
        <div class="card__tags">${tags}</div>
        <div class="card__links">${links.join("")}</div>
      </article>
    `;
  }).join("");
}
