/**
 * projetos.js - Dados dos projetos para exibição no portfólio
 * Cada projeto possui título, descrição, imagem, tech stack e links
 * status/descricao aceitam string (mesmo texto nos dois idiomas) ou { pt, en }
 * statusDate aceita uma data YYYY.MM.DD ou true para usar a data atual
 */

const PROJETOS = [
  {
    titulo: "GMC (Granja Mult Core)",
    status: { pt: "Em Desenvolvimento", en: "In Development" },
    statusDate: "2026.08.26",
    descricao: {
      pt: "Sistema completo para gestão de granjas, controle de insumos, produção e relatórios em Dashboard.",
      en: "Complete farm management system: supply control, production tracking, and dashboard reporting.",
    },
    imagem: "assets/images/granja-mult-core.png",
    tech: ["React", "TypeScript", "Supabase", "Dashboard"],
    site: "https://gmc-granja-mult-core.vercel.app/",
    repoPrivado: true, // código sob contrato — botão abre aviso de projeto privado
    destaque: true,
  },
  {
    titulo: "Evolyn · Core Quest",
    status: { pt: "Em funcionamento", en: "Live" },
    statusDate: false,
    descricao: {
      pt: "Treinos de core transformados em aventura, com XP, conquistas, rankings, herói personalizável e exploração automática.",
      en: "Core workouts turned into an adventure with XP, achievements, rankings, a customizable hero and automatic exploration.",
    },
    imagem: "assets/images/banner-evolyn.jpg",
    logo: "assets/images/evolyn-logo.webp",
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Express", "Supabase"],
    site: "https://evolyn-core-quest.vercel.app",
    repo: "https://github.com/RDEsley/Evolyn-Core-Quest",
  },
  {
    titulo: "Fate Light",
    status: { pt: "Em Desenvolvimento", en: "In Development" },
    statusDate: "2026.08.26",
    descricao: {
      pt: "Gestão financeira operacional para clientes, serviços, cobranças, despesas e domínios, com recorrência e isolamento por workspace.",
      en: "Operational financial management for clients, services, billing, expenses and domains, with recurrence and workspace isolation.",
    },
    imagem: "assets/images/banner-fate-light.jpg",
    logo: "assets/images/fate-light.png",
    tech: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Playwright"],
    site: "https://fatelight-alpha.vercel.app/",
    repo: "https://github.com/RDEsley/Fate-Light",
  },
  {
    titulo: "Insta Analytics",
    status: { pt: "Finalizado — Protótipo", en: "Completed — Prototype" },
    statusDate: false,
    descricao: {
      pt: "Plataforma de análise de perfis do Instagram, com coleta de dados, indicadores de desempenho e geração de relatórios.",
      en: "Instagram profile analytics platform with data collection, performance indicators and report generation.",
    },
    imagem: "assets/images/banner-instaanalytics.jpg",
    logo: "assets/images/instaanalytics.jpg",
    logoEstilo: "square",
    tech: ["React", "TypeScript", "Supabase", "Dashboard"],
    site: "https://insta-analytics.vercel.app/",
    repo: "https://github.com/RDEsley/InstaAnalytics",
  },
  {
    titulo: "SASens - Sistema de Análise de Sentimentos",
    status: { pt: "Em Desenvolvimento", en: "In Development" },
    statusDate: "2026.08.26",
    descricao: {
      pt: "Sistema de análise de sentimentos para textos e postagens, com classificação automática em positivo, negativo e neutro, explicação descritiva e dashboard de tendência temporal.",
      en: "Sentiment analysis system for texts and posts, with automatic positive/negative/neutral classification, descriptive explanations, and a temporal trend dashboard.",
    },
    imagem: "assets/images/banner-sasens.jpg",
    logo: "assets/images/Sasens-logo.webp",
    logoEstilo: "wide",
    tech: ["Python", "JavaScript", "HTML/CSS"],
    repo: "https://github.com/RDEsley/SASens",
  },
  {
    titulo: "Casas de Oração — Brasília e Águas Lindas",
    status: { pt: "Em funcionamento", en: "Live" },
    statusDate: false,
    descricao: {
      pt: "Encontre o próximo culto por dia, período e distância, com GPS, favoritos, rotas e dados armazenados localmente.",
      en: "Find the next service by day, time and distance, with GPS, favorites, directions and locally stored preferences.",
    },
    imagem: "assets/images/banner-ccb-brasilia.jpg",
    logo: "assets/images/ccb-brasilia-logo.png",
    logoEstilo: "square",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "LocalStorage"],
    site: "https://relatorio-ccb-brasilia-xi.vercel.app",
    repo: "https://github.com/RDEsley/Relatorio-CCB-Brasilia",
  },
  {
    titulo: "WhatsApp - App Android",
    status: { pt: "Finalizado", en: "Completed" },
    statusDate: false,
    descricao: {
      pt: "Uma réplica do App WhatsApp com funcionalidades básicas.",
      en: "A WhatsApp app replica with basic features.",
    },
    imagem: "assets/images/banner-whatsapp.jpg",
    logo: "assets/images/whatsapp.webp",
    logoEstilo: "square dark",
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
    imagem: "assets/images/banner-fate-eight-tech.jpg",
    logo: "assets/images/fateeighttech.png",
    logoEstilo: "compact",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/fateeighttech",
    site: "https://fateeight.com.br",
  },
];
