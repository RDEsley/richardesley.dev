/**
 * certificados.js - Renderiza os certificados no DOM
 * Depende de src/data/certificados.js (CERTIFICADOS)
 */

/**
 * Conta cursos, formações e bootcamps
 * @returns {{ cursos: number, formacoes: number, bootcamps: number }}
 */
function contarCertificados() {
  let cursos = 0;
  let formacoes = 0;
  let bootcamps = 0;

  CERTIFICADOS.forEach((c) => {
    const nome = (c.nome || "").toLowerCase();
    if (nome.includes("formação")) formacoes++;
    else if (nome.includes("bootcamp")) bootcamps++;
    else cursos++;
  });

  return { cursos, formacoes, bootcamps };
}

/**
 * Renderiza os certificados no container
 * @param {HTMLElement} container - Elemento .certificados-list ou .certificates__grid
 */
function renderizarCertificados(container) {
  if (!container || typeof CERTIFICADOS === "undefined") return;

  CERTIFICADOS.forEach((certificado) => {
    const item = document.createElement("div");
    item.classList.add("card", "card--certificate");

    const conteudo = `
      <h3>${certificado.nome}</h3>
      <p><strong>Instituição:</strong> ${certificado.instituicao}</p>
      <p><strong>Ano:</strong> ${certificado.ano}</p>
    `;

    if (certificado.url) {
      item.innerHTML = `
        <a href="${certificado.url}" target="_blank" rel="noopener noreferrer" class="card__link">
          ${conteudo}
        </a>
      `;
    } else {
      item.innerHTML = `<div class="card__link" data-certificado="${certificado.nome}">${conteudo}</div>`;
      item.querySelector(".card__link").addEventListener("click", () => {
        alert(`O certificado "${certificado.nome}" ainda não possui PDF disponível.`);
      });
    }

    container.appendChild(item);
  });
}
