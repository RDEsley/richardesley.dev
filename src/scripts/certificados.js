/**
 * certificados.js - Renderiza os certificados no DOM
 * Depende de src/data/certificados.js (CERTIFICADOS) e src/scripts/aviso.js (abrirAviso)
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

  const isEn = document.documentElement.lang === "en";
  const lblInstituicao = isEn ? "Institution" : "Instituição";
  const lblAno = isEn ? "Year" : "Ano";
  const basePath = window.location.pathname.includes("/en/") ? "../" : "";

  CERTIFICADOS.forEach((certificado, indice) => {
    const item = document.createElement("div");
    item.classList.add("card", "card--certificate", "reveal");

    const conteudo = `
      <h3>${certificado.nome}</h3>
      <p><strong>${lblInstituicao}:</strong> ${certificado.instituicao}</p>
      <p><strong>${lblAno}:</strong> ${certificado.ano}</p>
    `;

    if (certificado.url) {
      const href = basePath + certificado.url;
      item.innerHTML = `
        <a href="${href}" target="_blank" rel="noopener noreferrer" class="card__link">
          ${conteudo}
        </a>
      `;
    } else {
      item.innerHTML = `<button type="button" class="card__link" data-certificado="${certificado.nome}">${conteudo}</button>`;
      item.querySelector(".card__link").addEventListener("click", () => {
        abrirAviso({
          titulo: isEn ? "Certificate without PDF" : "Certificado sem PDF",
          texto: isEn
            ? `The certificate "${certificado.nome}" doesn't have a downloadable PDF yet. I'm happy to send it by email if you need proof.`
            : `O certificado "${certificado.nome}" ainda não tem PDF para download. Posso enviá-lo por e-mail se precisar de comprovação.`,
          cta: { label: isEn ? "Get in touch" : "Falar comigo", href: "#contato" },
          fecharLabel: isEn ? "Close" : "Fechar",
        });
      });
    }

    container.appendChild(item);
  });
}
