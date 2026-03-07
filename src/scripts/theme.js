/**
 * theme.js - Lógica de alternância entre tema claro e escuro
 * Persiste preferência no localStorage (chave: tema)
 */

const TEMA_KEY = "tema";
const TEMA_ESCURO = "escuro";

/**
 * Carrega o tema salvo e aplica na página
 */
function carregarTema() {
  const temaSalvo = localStorage.getItem(TEMA_KEY);
  const isEscuro = temaSalvo === TEMA_ESCURO;

  if (isEscuro) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  atualizarIconeTheme(isEscuro);
}

/**
 * Alterna entre tema claro e escuro
 */
function alternarTema() {
  document.body.classList.toggle("dark-theme");
  const isEscuro = document.body.classList.contains("dark-theme");

  if (isEscuro) {
    localStorage.setItem(TEMA_KEY, TEMA_ESCURO);
  } else {
    localStorage.removeItem(TEMA_KEY);
  }

  atualizarIconeTheme(isEscuro);
}

/**
 * Atualiza o ícone e aria-label do botão de tema
 * @param {boolean} isEscuro - Se o tema escuro está ativo
 */
function atualizarIconeTheme(isEscuro) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const isEn = document.documentElement.lang === "en";
  const labelLight = isEn ? "Switch to light mode" : "Alternar para modo claro";
  const labelDark = isEn ? "Switch to dark mode" : "Alternar para modo escuro";
  btn.setAttribute("aria-label", isEscuro ? labelLight : labelDark);
  btn.innerHTML = isEscuro ? "&#9789;" : "&#9728;"; // Lua e Sol (unicode)
}
