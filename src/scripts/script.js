// Lista de certificados e cursos
const certificados = [
  // **Certificados Prioritários**
  { nome: "Python: Avançando na Linguagem", instituicao: "Alura", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Python_ avançando na linguagem - Alura.pdf" },
  { nome: "Boas Práticas em Python: Pacotes, Banco de Dados e Desenvolvimento Web", instituicao: "DIO", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Boas práticas em Python.pdf" },
  { nome: "Curso de Banco de Dados Relacionais com Python DB API", instituicao: "DIO", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Explorando Banco de dados relacionais com Python DB API.pdf" },
  { nome: "Curso de modelagem de dados: Entidades, Relacionamentos e Atributos", instituicao: "Alura", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Modelagem de banco de dados_ entidades, relacionamentos e atributos - Alura.pdf" },
  { nome: "Curso Conhecendo a administração do Github", instituicao: "DIO", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Administração do Github.pdf" },
  { nome: "Curso Utilizando as Ferramentas do Github para solucionar Algoritmos em Python", instituicao: "DIO", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Utilizando Ferramentas Git.pdf" },
  { nome: "Desenvolvimento de APIS em Python com Flask", instituicao: "DIO", ano: 2024 },
  // **Desenvolvimento Web e Mobile**
  { nome: "Curso crie um site completo com HTML, CSS e JavaScript", instituicao: "Udemy", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Crie um site completo HTML, CSS e JS.pdf" },
  { nome: "Curso crie Site Profissional e Loja Virtual WordPress", instituicao: "Udemy", ano: 2025, url: "src/pdfs/Richard Esley Silva Oliveira - Site Profissional e Loja Virtual WordPress.pdf" },
  { nome: "Curso de Desenvolvimento Android Completo 2024 - Kotlin & Java", instituicao: "Udemy", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Desenvolvimento Android Completo 2024 - Kotlin e Java.pdf" },
  { nome: "Curso de HTML e CSS - Desenvolvimento", instituicao: "Alura", ano: 2023, url: "src/pdfs/Richard Esley Silva Oliveira - Curso HTML e CSS_ ambientes de desenvolvimento, estrutura de arquivos e tags - Alura.pdf" },
  { nome: "Desenvolva um Jogo e Pratique lógica de Programação", instituicao: "Alura", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso JavaScript e HTML_ desenvolva um jogo e pratique lógica de programação - Alura.pdf" },
  // **Fundamentos e Bases**
  { nome: "Formação Fundamentos de Inteligência Artificial", instituicao: "DIO", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Formação Fundamentos de Inteligência Artificial.pdf" },
  { nome: "Formação Lógica de Programação", instituicao: "DIO", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Formação Lógica de Programação.pdf" },
  { nome: "Formação de Git e GitHub", instituicao: "DIO", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso formação Github.pdf" },
  { nome: "Bootcamp DIO: Educação e Empregabilidade", instituicao: "DIO", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Bootcamp Dio .pdf" },
  // **Outras Linguagens**
  { nome: "Java: Primeira aplicação", instituicao: "Alura", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Java_ criando a sua primeira aplicação - Alura.pdf" },
  { nome: "Java: Trabalhando com listas e Coleções de Dados", instituicao: "Alura", ano: 2024, url: "src/pdfs/Richard Esley Silva Oliveira - Curso Java_ trabalhando com listas e coleções de dados - Alura.pdf" },
];


// Seleciona o container de certificados
const certificadosList = document.querySelector(".certificados-list");

// Adiciona os certificados dinamicamente
certificados.forEach((certificado) => {
  const item = document.createElement("div");
  item.classList.add("certificado");

  // Verifica se a URL está definida e cria um link
  if (certificado.url) {
    item.innerHTML = `
      <a href="${certificado.url}" target="_blank" class="certificado-link">
        <h3>${certificado.nome}</h3>
        <p><strong>Instituição:</strong> ${certificado.instituicao}</p>
        <p><strong>Ano:</strong> ${certificado.ano}</p>
      </a>
    `;
  } else {
    item.innerHTML = `
      <div class="certificado-link">
        <h3>${certificado.nome}</h3>
        <p><strong>Instituição:</strong> ${certificado.instituicao}</p>
        <p><strong>Ano:</strong> ${certificado.ano}</p>
      </div>
    `;
    item.addEventListener("click", () => {
      alert(
        `O certificado "${certificado.nome}" ainda não possui um PDF disponível ou está em Desenvolvimento.`
      );
    });
  }

  certificadosList.appendChild(item);
});

// Função para carregar o tema preferido do localStorage
const carregarTema = () => {
  if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-theme");
    document.getElementById("theme-toggle").textContent =
      "Alter to White Mode";
  } else {
    document.body.classList.remove("dark-theme");
    document.getElementById("theme-toggle").textContent =
      "Alter to Dark Mode";
  }
};

// Carregar tema ao iniciar a página
carregarTema();

// Seleciona o botão de alternância de tema
const themeToggleBtn = document.getElementById("theme-toggle");

// Alterna entre os temas e salva a preferência no localStorage
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    themeToggleBtn.textContent = "Alter to White Mode";
    localStorage.setItem("tema", "escuro");
  } else {
    themeToggleBtn.textContent = "Alter to Dark Mode";
    localStorage.removeItem("tema");
  }
});

