/**
 * aviso.js - Diálogo de aviso reutilizável
 * Substitui o alert() nativo (repositório privado, certificado sem PDF, etc.)
 * abrirAviso({ titulo, texto, cta, fecharLabel })
 */

const SUPORTA_DIALOG =
  typeof HTMLDialogElement !== "undefined" && typeof HTMLDialogElement.prototype.showModal === "function";

let avisoDialogEl = null;

function garantirAvisoDialog() {
  if (avisoDialogEl) return avisoDialogEl;

  const dialog = document.createElement("dialog");
  dialog.className = "notice";
  dialog.innerHTML = `
    <div class="notice__panel">
      <button type="button" class="notice__close" aria-label="Fechar" data-notice-close>&times;</button>
      <div class="notice__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="10" width="16" height="10" rx="2"></rect>
          <path d="M8 10V7a4 4 0 0 1 8 0v3"></path>
        </svg>
      </div>
      <h3 class="notice__title" data-notice-title></h3>
      <p class="notice__text" data-notice-text></p>
      <div class="notice__actions" data-notice-actions></div>
    </div>
  `;
  document.body.appendChild(dialog);

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.querySelector("[data-notice-close]").addEventListener("click", () => dialog.close());

  avisoDialogEl = dialog;
  return dialog;
}

/**
 * @param {{ titulo: string, texto: string, cta?: { label: string, href: string } | null, fecharLabel?: string }} opcoes
 */
function abrirAviso({ titulo, texto, cta = null, fecharLabel = "Fechar" }) {
  if (!SUPORTA_DIALOG) {
    alert(`${titulo}\n\n${texto}`);
    return;
  }

  const dialog = garantirAvisoDialog();
  dialog.querySelector("[data-notice-title]").textContent = titulo;
  dialog.querySelector("[data-notice-text]").textContent = texto;

  const actions = dialog.querySelector("[data-notice-actions]");
  actions.innerHTML = "";

  if (cta) {
    const link = document.createElement("a");
    link.href = cta.href;
    const isAncoraInterna = cta.href.startsWith("#");
    if (!isAncoraInterna) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    link.className = "btn btn--primary";
    link.textContent = cta.label;
    if (isAncoraInterna) {
      link.addEventListener("click", () => dialog.close());
    }
    actions.appendChild(link);
  }

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "btn btn--ghost";
  closeBtn.textContent = fecharLabel;
  closeBtn.addEventListener("click", () => dialog.close());
  actions.appendChild(closeBtn);

  const elementoAnterior = document.activeElement;
  dialog.addEventListener(
    "close",
    () => {
      if (elementoAnterior && typeof elementoAnterior.focus === "function") {
        elementoAnterior.focus();
      }
    },
    { once: true }
  );

  dialog.showModal();
}
