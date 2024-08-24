document.querySelector(".btnSelectArquivo").addEventListener("click", function() {

    const Captura = document.getElementById("Captura");
    Captura.style.display = 'none';

    const SelectArquivo = document.getElementById("SelectArquivo");
    SelectArquivo.style.display = 'flex';
});

document.querySelector(".btnCaptura").addEventListener("click", function() {

    const SelectArquivo = document.getElementById("SelectArquivo");
    SelectArquivo.style.display = 'none';

    const Captura = document.getElementById("Captura");
    Captura.style.display = 'block';
});