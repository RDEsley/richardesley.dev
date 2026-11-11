/**
 * certificados.js - Livro-razão de certificados com filtro por instituição
 * Depende de src/data/certificados.js (CERTIFICADOS), aviso.js (abrirAviso) e
 * dos utilitários IS_EN / BASE_PATH / esc definidos em main.js.
 */

const LIMITE_INICIAL = 8;

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

function renderizarCertificados() {
  const lista = document.querySelector("[data-ledger]");
  if (!lista || typeof CERTIFICADOS === "undefined") return;

  const L = IS_EN
    ? {
        todos: "All",
        cursos: "courses",
        formacoes: "programs",
        bootcamps: "bootcamp",
        pdf: "View PDF",
        pedir: "On request",
        mais: (n) => `Show all ${n} certificates`,
        menos: "Show fewer",
      }
    : {
        todos: "Todos",
        cursos: "cursos",
        formacoes: "formações",
        bootcamps: "bootcamp",
        pdf: "Ver PDF",
        pedir: "Sob pedido",
        mais: (n) => `Ver todos os ${n} certificados`,
        menos: "Mostrar menos",
      };

  // Contadores
  const contadores = document.querySelector("[data-ledger-counts]");
  if (contadores) {
    const { cursos, formacoes, bootcamps } = contarCertificados();
    contadores.innerHTML = [
      [cursos, L.cursos],
      [formacoes, L.formacoes],
      [bootcamps, L.bootcamps],
    ]
      .map(([n, rotulo]) => `<p class="ledger__count"><strong>${String(n).padStart(2, "0")}</strong><span class="mono">${rotulo}</span></p>`)
      .join("");
  }

  // Linhas (ordenadas do mais recente para o mais antigo, mantendo a ordem original em empates)
  const itens = CERTIFICADOS.map((c, i) => ({ ...c, i })).sort((a, b) => b.ano - a.ano || a.i - b.i);

  lista.innerHTML = itens
    .map((c) => {
      const conteudo = `
        <span class="ledger__year">${c.ano}</span>
        <span class="ledger__name">${esc(c.nome)}</span>
        <span class="ledger__inst">${esc(c.instituicao)}</span>
        <span class="ledger__action" data-kind="${c.url ? "pdf" : "request"}">${c.url ? `${L.pdf} ↗` : L.pedir}</span>`;
      const elemento = c.url
        ? `<a class="ledger__link" href="${BASE_PATH + encodeURI(c.url)}" target="_blank" rel="noopener noreferrer">${conteudo}</a>`
        : `<button type="button" class="ledger__link" data-sem-pdf="${esc(c.nome)}">${conteudo}</button>`;
      return `<li class="ledger__row" data-inst="${esc(c.instituicao)}">${elemento}</li>`;
    })
    .join("");

  // Filtros por instituição
  const filtros = document.querySelector("[data-ledger-filters]");
  const botaoMais = document.querySelector("[data-ledger-more]");
  const contagem = itens.reduce((acc, c) => ((acc[c.instituicao] = (acc[c.instituicao] || 0) + 1), acc), {});
  let filtroAtual = "*";
  let expandido = false;

  if (filtros) {
    const opcoes = [["*", L.todos, itens.length], ...Object.entries(contagem).sort((a, b) => b[1] - a[1]).map(([k, n]) => [k, k, n])];
    filtros.innerHTML = opcoes
      .map(
        ([valor, rotulo, n]) =>
          `<button type="button" class="chip" data-filter="${esc(valor)}" aria-pressed="${valor === "*"}">${esc(rotulo)}<sup>${n}</sup></button>`
      )
      .join("");
    filtros.addEventListener("click", (e) => {
      const chip = e.target instanceof Element ? e.target.closest("[data-filter]") : null;
      if (!chip) return;
      filtroAtual = chip.dataset.filter;
      filtros.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === chip)));
      aplicar();
    });
  }

  function aplicar() {
    let visiveis = 0;
    const linhas = lista.querySelectorAll(".ledger__row");
    const correspondentes = Array.from(linhas).filter((li) => filtroAtual === "*" || li.dataset.inst === filtroAtual);
    linhas.forEach((li) => {
      const combina = correspondentes.includes(li);
      const mostrar = combina && (expandido || visiveis < LIMITE_INICIAL);
      if (combina && mostrar) visiveis++;
      li.hidden = !mostrar;
    });
    if (botaoMais) {
      const sobra = correspondentes.length > LIMITE_INICIAL;
      botaoMais.hidden = !sobra;
      botaoMais.setAttribute("aria-expanded", String(expandido));
      botaoMais.querySelector("span").textContent = expandido ? L.menos : L.mais(correspondentes.length);
    }
  }

  if (botaoMais) {
    botaoMais.addEventListener("click", () => {
      expandido = !expandido;
      aplicar();
      if (!expandido) lista.scrollIntoView({ block: "start" });
    });
  }

  lista.addEventListener("click", (e) => {
    const alvo = e.target instanceof Element ? e.target.closest("[data-sem-pdf]") : null;
    if (!alvo) return;
    const nome = alvo.dataset.semPdf;
    abrirAviso({
      titulo: IS_EN ? "Certificate without PDF" : "Certificado sem PDF",
      texto: IS_EN
        ? `The certificate "${nome}" doesn't have a downloadable PDF yet. I'm happy to send it by email if you need proof.`
        : `O certificado "${nome}" ainda não tem PDF para download. Posso enviá-lo por e-mail se precisar de comprovação.`,
      cta: { label: IS_EN ? "Get in touch" : "Falar comigo", href: "#contato" },
      fecharLabel: IS_EN ? "Close" : "Fechar",
    });
  });

  aplicar();
}
