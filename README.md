<div align="center">

# Richard Oliveira — richardesley.dev

**Portfólio pessoal de um desenvolvedor Full Stack com foco em UI/UX, desenhado como uma partitura.**

[![Acessar portfólio](https://img.shields.io/badge/ACESSAR-richardesley.dev-A63C16?style=for-the-badge)](https://richardesley.dev/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Sem frameworks](https://img.shields.io/badge/depend%C3%AAncias-zero-17140F?style=flat-square)
![Status](https://img.shields.io/badge/status-online-2F6B3A?style=flat-square)

</div>

---

## O conceito

Sou desenvolvedor e violinista desde os 12 anos. Em vez de seguir o layout padrão de portfólio, o site foi composto como uma **partitura**:

- **Abertura** — o nome aparece sobre uma pauta de cinco cordas **interativas**: passe o cursor (ou o dedo, no celular) por elas e elas vibram. Há um botão opcional de **som**, sintetizado no próprio navegador.
- **I. Prelúdio** — quem sou, ficha técnica e a "escala técnica" com as tecnologias escritas em compassos.
- **II. Repertório** — os projetos, apresentados como um programa de concerto numerado.
- **III. Estudos** — certificados em formato de livro-razão, com filtro por instituição.
- **IV. Coda** — contato, com cópia de e-mail em um clique e formulário.
- **Fine.** — o rodapé termina com a barra dupla de fim de partitura.

Paleta única (papel creme, tinta preta, verniz de violino e o azul do blazer), sem modo claro/escuro, e tipografia **Bodoni Moda + Archivo + JetBrains Mono**.

## Destaques técnicos

| | |
| --- | --- |
| **Cordas físicas** | Simulação da equação da onda (Verlet com amortecimento e viscosidade) em `<canvas>`, sem bibliotecas |
| **Som opcional** | Síntese Karplus-Strong via Web Audio, desligada por padrão |
| **Bilíngue** | PT-BR (`/`) e EN (`/en/`) com `hreflang` e dados compartilhados |
| **Responsivo** | Layouts próprios para desktop, tablet e celular; menu em cortina no mobile |
| **Acessibilidade** | HTML semântico, foco visível, skip link, `aria-*` nos controles e respeito a `prefers-reduced-motion` |
| **Progressive enhancement** | O conteúdo continua visível se o JavaScript falhar |
| **Leve** | HTML, CSS e JavaScript puros, sem build e sem dependências |

## Estrutura

```text
├── index.html              # Página principal (PT-BR)
├── sobre.html              # "Minha história" (PT-BR)
├── en/                     # Versões em inglês
├── assets/images/          # Fotos e banners dos projetos
└── src/
    ├── data/
    │   ├── projetos.js     # Cadastro dos projetos
    │   └── certificados.js # Cadastro dos certificados
    ├── scripts/
    │   ├── main.js         # Menu, projetos, formulário e cópia de e-mail
    │   ├── certificados.js # Livro-razão e filtros
    │   ├── cordas.js       # Cordas interativas e som
    │   ├── animacoes.js    # Entradas por scroll e progresso de leitura
    │   └── aviso.js        # Diálogo reutilizável
    ├── styles/             # CSS modular (tokens, base, componentes, seções)
    ├── files/cv.pdf        # Currículo
    └── pdfs/               # Certificados
```

## Rodando localmente

Não há build. Basta servir a raiz com qualquer servidor HTTP:

```bash
python -m http.server 5173
```

Depois acesse `http://localhost:5173/` e `http://localhost:5173/en/`.

## Atualizando o conteúdo

- **Novo projeto:** adicione um objeto em `src/data/projetos.js` (título, `estado`, status, descrição em `pt`/`en`, imagem, tecnologias e links).
- **Novo certificado:** adicione em `src/data/certificados.js` e coloque o PDF em `src/pdfs/`.

## Publicação

Site estático hospedado na **Hostinger** em [richardesley.dev](https://richardesley.dev/). O `.htaccess` força HTTPS, remove o `www` e define cache e cabeçalhos de segurança. O formulário de contato usa o **Formspree**.

## Uso do código

Projeto pessoal e proprietário, publicado apenas para fins de portfólio e demonstração técnica. Não é um template nem um projeto open source, e não é permitido reutilizar a identidade visual ou o conteúdo como próprios.

**© Richard Esley Silva Oliveira — todos os direitos reservados.**

<div align="center">

[Portfólio](https://richardesley.dev/) · [GitHub](https://github.com/RDEsley) · [LinkedIn](https://www.linkedin.com/in/richardesley/)

</div>
