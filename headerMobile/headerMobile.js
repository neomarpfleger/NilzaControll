const menuAtestado = document.getElementById("menuAtestado");
const btnFechar = document.getElementById("btnFechar");

menuAtestado.addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-250px"; // Fecha o menu
    menuAtestado.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Ícone original de menu
    menuAtestado.style.backgroundColor = "var(--verde)";
  } else {
    sidebar.style.left = "0px"; // Abre o menu
    menuAtestado.style.display = "none";
  }
});

btnFechar.addEventListener("click", function () {
  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-250px"; // Fecha o menu
    menuAtestado.style.display = "flex";
  }
});
