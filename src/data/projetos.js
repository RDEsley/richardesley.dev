/**
 * projetos.js - Dados dos projetos para exibição no portfólio
 * Cada projeto possui título, descrição, imagem, tech stack e links
 * status/descricao aceitam string (mesmo texto nos dois idiomas) ou { pt, en }
 */

const PROJETOS = [
  {
    titulo: "GMC (Granja Mult Core)",
    status: { pt: "Em Desenvolvimento", en: "In Development" },
    statusDate: true, // adiciona data atual automaticamente (YYYY.MM.DD)
    descricao: {
      pt: "Sistema completo para gestão de granjas, controle de insumos, produção e relatórios em Dashboard.",
      en: "Complete farm management system: supply control, production tracking, and dashboard reporting.",
    },
    imagem: "assets/images/granja-mult-core.png",
    tech: ["React", "Typescript", "Supabase", "HTML/CSS", "Dashboard"],
    site: "https://gmc-granja-mult-core.vercel.app/",
    repoPrivado: true, // código sob contrato — botão abre aviso de projeto privado
    destaque: true,
  },
  {
    titulo: "Abdoria — Treino de Core Gamificado",
    status: { pt: "Em funcionamento", en: "Live" },
    statusDate: false,
    descricao: {
      pt: "Treino de core em casa que virou aventura: XP, conquistas, ranking, perfil personalizável e exploração offline.",
      en: "At-home core training turned into an adventure: XP, achievements, rankings, custom profiles and offline exploration.",
    },
    imagem: "assets/images/abdoria-logo.webp",
    tech: ["React 19", "Typescript", "Vite", "Tailwind", "Framer Motion", "Express", "Supabase"],
    site: "https://abdoria-project.vercel.app",
    repo: "https://github.com/RDEsley/Abdoria",
  },
  {
    titulo: "InstaAnalytics - Plataforma de Análise de Perfis do Instagram",
    status: { pt: "Finalizado - Protótipo", en: "Completed - Prototype" },
    statusDate: false,
    descricao: {
      pt: "Plataforma de análise de perfis do Instagram, com funcionalidades de scraping, análise de dados, e geração de relatórios.",
      en: "Instagram profile analysis platform, with scraping, data analysis, and report generation features.",
    },
    imagem: "assets/images/instaanalytics.jpg",
    tech: ["React", "Typescript", "Supabase", "HTML/CSS", "Dashboard"],
    site: "https://insta-analytics.vercel.app/",
    repo: "https://github.com/RDEsley/InstaAnalytics",
  },
  {
    titulo: "Fate Eight Finance",
    status: { pt: "Em Desenvolvimento", en: "In Development" },
    statusDate: true, // adiciona data atual automaticamente (YYYY.MM.DD)
    descricao: {
      pt: "Sistema financeiro da Fate Eight Tech, construído por fases: autenticação passwordless SSR, onboarding, perfil e configurações de workspace — com suíte de testes unitários, E2E e de acessibilidade.",
      en: "Fate Eight Tech's financial system, built in phases: passwordless SSR auth, onboarding, profile and workspace settings — with unit, E2E and accessibility test suites.",
    },
    imagem: "assets/images/fate-eight-project-logo.webp",
    tech: ["Next.js", "Typescript", "Supabase", "PostgreSQL", "Vitest", "Playwright"],
    repo: "https://github.com/RDEsley/FateEightProject",
  },
  {
    titulo: "SASens - Sistema de Análise de Sentimentos",
    status: { pt: "Em Desenvolvimento", en: "In Development" },
    statusDate: true, // adiciona data atual automaticamente (YYYY.MM.DD)
    descricao: {
      pt: "Sistema de análise de sentimentos para textos e postagens, com classificação automática em positivo, negativo e neutro, explicação descritiva e dashboard de tendência temporal.",
      en: "Sentiment analysis system for texts and posts, with automatic positive/negative/neutral classification, descriptive explanations, and a temporal trend dashboard.",
    },
    imagem: "assets/images/Sasens-logo.webp",
    tech: ["Python", "JavaScript", "HTML/CSS"],
    repo: "https://github.com/RDEsley/SASens",
  },
  {
    titulo: "WhatsApp - App Android",
    status: { pt: "Finalizado", en: "Completed" },
    statusDate: false,
    descricao: {
      pt: "Uma réplica do App WhatsApp com funcionalidades básicas.",
      en: "A WhatsApp app replica with basic features.",
    },
    imagem: "assets/images/whatsapp.webp",
    tech: ["Android Studio", "Java", "Kotlin", "XML", "Firebase", "Firebase Auth", "Firebase Database", "Firebase Storage"],
    repo: "https://github.com/RDEsley/App_WhatsApp",
  },
  {
    titulo: "Fate Eight Tech",
    status: { pt: "Em funcionamento", en: "Live" },
    statusDate: false,
    descricao: {
      pt: "Site da Fate Eight Tech, uma empresa de Marketing Digital e desenvolvimento de Softwares.",
      en: "Website for Fate Eight Tech, a Digital Marketing and Software Development company.",
    },
    imagem: "assets/images/fateeighttech.png",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/fateeighttech",
    site: "https://fateeight.com.br",
  },
];
