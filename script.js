// Controla a abertura/fechamento do menu mobile
// (a lógica visual já existia no CSS, mas faltava este script para acioná-la)
document.addEventListener("DOMContentLoaded", () => {
  const btnAbrir = document.getElementById("abrir-menu");
  const btnFechar = document.getElementById("fechar-menu");
  const menuMobile = document.getElementById("menu-mobile");
  const overlay = document.getElementById("overlay");
  // Funções para abrir e fechar o menu
  function abrirMenu() {
    menuMobile.classList.add("abrir-menu");
    overlay.classList.add("mostrar");
    document.body.style.overflow = "hidden"; 
  }

  function fecharMenu() {
    menuMobile.classList.remove("abrir-menu");
    overlay.classList.remove("mostrar");
    document.body.style.overflow = ""; 
  }

  btnAbrir?.addEventListener("click", abrirMenu);
  btnFechar?.addEventListener("click", fecharMenu);
  overlay?.addEventListener("click", fecharMenu);

  // fecha o menu automaticamente ao clicar em um link (rolagem para a seção)
  document.querySelectorAll(".menu-mobile nav a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });
});
