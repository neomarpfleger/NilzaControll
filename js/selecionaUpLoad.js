// Função genérica para alternar exibição e classes dos botões
function toggleButtons(activeButton, inactiveButton, showElement, hideElement) {
    // Alterar a exibição dos elementos
    document.getElementById(showElement).style.display = 'flex';
    document.getElementById(hideElement).style.display = 'none';

    // Adicionar a classe 'btnSelecionado' ao botão ativo
    activeButton.classList.add('btnSelecionado');
    // Remover a classe 'btnSelecionado' do botão inativo
    inactiveButton.classList.remove('btnSelecionado');
}

// Referências aos botões
const btnSelectArquivo = document.querySelector(".btnSelectArquivo");
const btnCaptura = document.querySelector(".btnCaptura");

// Evento de clique no botão "Selecionar Arquivo"
btnSelectArquivo.addEventListener("click", function() {
    toggleButtons(btnSelectArquivo, btnCaptura, 'SelectArquivo', 'Captura');
});

// Evento de clique no botão "Captura"
btnCaptura.addEventListener("click", function() {
    toggleButtons(btnCaptura, btnSelectArquivo, 'Captura', 'SelectArquivo');
});


//Btn que direciona para a Pagina de historico de astados
const btnHistoricoDeAtestados = document.getElementById("btnHistoricoDeAtestados");
btnHistoricoDeAtestados.addEventListener("click", ()=> {
    window.location.href = ("../Historico Atestados/historicoAtestado.html")
})
