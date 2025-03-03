const btnRegistraPonto = document.querySelector(".btn01");
const btnEditarPonto = document.querySelector(".btn02");
const btnFecharPonto = document.querySelector(".btn03");

function handleButtonClick(clickedButton) {
  // Remove a classe 'btnHover' de todos os botões
  btnRegistraPonto.classList.remove("btnHover");
  btnEditarPonto.classList.remove("btnHover");
  btnFecharPonto.classList.remove("btnHover");

  // Adiciona a classe 'btnHover' ao botão clicado
  clickedButton.classList.add("btnHover");
}

btnRegistraPonto.addEventListener("click", () => handleButtonClick(btnRegistraPonto));
btnEditarPonto.addEventListener("click", () => handleButtonClick(btnEditarPonto));
btnFecharPonto.addEventListener("click", () => handleButtonClick(btnFecharPonto));