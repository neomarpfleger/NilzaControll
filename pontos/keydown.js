document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll("#meuFormulario input");

  inputs.forEach((input, index) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Evita o envio do formulário

        const proximo = inputs[index + 1]; // Pega o próximo campo
        if (proximo) {
          proximo.focus(); // Foca no próximo campo
        }
      }
    });
  });
});
