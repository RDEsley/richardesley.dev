/**
 * projetos.js - Dados dos projetos para exibição no portfólio
 * Cada projeto possui título, descrição, imagem, tech stack e links
 */

const PROJETOS = [
  {
    titulo: "WhatsApp - App Android",
    status: "Finalizado",
    statusDate: false, 
    descricao: "Uma replica do App WhatsApp com funcionalidades básicas.",
    imagem: "assets/images/whatsapp.png",
    tech: ["Android Studio", "Java", "Kotlin", "XML", "Firebase", "Firebase Auth", "Firebase Database", "Firebase Storage"],
    repo: "https://github.com/RDEsley/App_WhatsApp"
  },
  {
    titulo: "InstaAnalytics - Plataforma de Análise de Perfis do Instagram",
    status: "Finalizado - Protótipo",
    statusDate: false, 
    descricao:
      "Plataforma de análise de perfis do Instagram, com funcionalidades de scraping, análise de dados, e geração de relatórios.",
    imagem: "assets/images/instaanalytics.jpg", 
    tech: ["React", "Typescript", "Supabase", "HTML/CSS", "Dashboard"],
    site: "https://insta-analytics.vercel.app/",
    repo: "https://github.com/RDEsley/InstaAnalytics",
  },
  {
    titulo: "Purple Kaizen - SaaS de Gestão de Clientes",
    status: "Finalizado - Protótipo",
    statusDate: false, 
    descricao: "Sistema para gerenciar clientes de uma empresa de forma prática e organizada.",
    imagem: "assets/images/purplekaizen.png",
    tech: ["Next.js", "Typescript", "Node.js", "Express", "Supabase"],
    site: "https://purple-kaizen.vercel.app/",
    repo: "https://github.com/RDEsley/PurpleKaizen",
  },
  {
    titulo: "GMC (Granja Mult Core)",
    status: "Em Desenvolvimento",
    statusDate: true, // adiciona data atual automaticamente (YYYY.MM.DD)
    descricao:
      "Sistema completo para gestão de granjas, controle de insumos, produção e relatórios em Dashboard.",
    imagem: "assets/images/granja-mult-core.png", 
    tech: ["React", "Typescript", "Supabase", "HTML/CSS", "Dashboard"],
    site: "https://gmc-granja-mult-core.vercel.app/",
  },
  {
    titulo: "SASens - Sistema de Análise de Sentimentos",
    status: "Em Desenvolvimento",
    statusDate: true, // adiciona data atual automaticamente (YYYY.MM.DD)
    descricao:
      "Sistema de analise de sentimentos para textos e postagens, com classificacao automatica em positivo, negativo e neutro, explicacao descritiva e dashboard de tendencia temporal.",
    imagem: "assets/images/SASens-logo.png", 
    tech: ["Python", "JavaScript", "HTML/CSS"],
    repo: "https://github.com/RDEsley/SASens",
  },
  {
    titulo: "Fate Eight Tech",
    status: "Em funcionamento",
    statusDate: false, 
    descricao: "Site da Fate Eight Tech, uma empresa de Marketing Digital e desenvolvimento de Softwares.",
    imagem: "assets/images/fateeighttech.png",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/fateeighttech",
    site: "https://fateeight.com.br",
  },

];
