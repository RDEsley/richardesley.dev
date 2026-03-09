/**
 * projetos.js - Dados dos projetos para exibição no portfólio
 * Cada projeto possui título, descrição, imagem, tech stack e links
 */

const PROJETOS = [
  {
    titulo: "GMC (Granja Mult Core)",
    status: "Em Desenvolvimento",
    statusDate: true, // adiciona data atual automaticamente (YYYY.MM.DD)  
    descricao:
      "Sistema completo para gestão de granjas, controle de insumos, produção e relatórios em Dashboard.",
    imagem: "assets/images/Granja-Mult-Core.png", 
    tech: ["Angular", "Typescript", "Supabase", "HTML/CSS", "Dashboard"],
    site: "https://gmc-granja-mult-core.vercel.app/login",
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
  }
];
