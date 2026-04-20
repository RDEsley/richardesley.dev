/**
 * projetos.js - Dados dos projetos para exibição no portfólio
 * Cada projeto possui título, descrição, imagem, tech stack e links
 */

const PROJETOS = [
  {
    titulo: "WhatsApp - App de Envio de Mensagens",
    status: "Finalizado",
    statusDate: false, 
    descricao: "Uma replica do App WhatsApp com funcionalidades básicas.",
    imagem: "assets/images/whatsapp.png",
    tech: ["Android Studio", "Java", "Kotlin", "XML", "Firebase", "Firebase Auth", "Firebase Database", "Firebase Storage"],
    repo: "https://github.com/RDEsley/App_WhatsApp"
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
  {
    titulo: "GMC (Granja Mult Core)",
    status: "Em Desenvolvimento",
    statusDate: true, // adiciona data atual automaticamente (YYYY.MM.DD)
    descricao:
      "Sistema completo para gestão de granjas, controle de insumos, produção e relatórios em Dashboard.",
    imagem: "assets/images/granja-mult-core.png", 
    tech: ["Angular", "Typescript", "Supabase", "HTML/CSS", "Dashboard"],
    site: "https://gmc-granja-mult-core.vercel.app/",
  },
  {
    titulo: "Purple Kaizen - SaaS de Gestão de Clientes",
    status: "Em desenvolvimento",
    statusDate: true, 
    descricao: "Sistema para gerenciar clientes de uma empresa de forma prática e organizada.",
    imagem: "assets/images/purple-kaizen.png",
    tech: ["React", "Vite", "Typescript", "Node.js", "Express", "PostgreSQL"],
    site: "https://purple-kaizen.vercel.app/",
    repo: "https://github.com/RDEsley/PurpleKaizen",
  },

];
