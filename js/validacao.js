
// Seleciona o elemento <select> pelo ID
var selectElement = document.querySelector('#item');
const itemBotina = document.querySelector('.botina');
const tamanhoUniforme = document.querySelector('.tamanhoUniforme');
const itemPadrao = document.querySelector('.itemPadrao');


// Adiciona um listener para o evento 'change'
selectElement.addEventListener('change', function() {
    
    var itemSelecionado = selectElement.value;
    
    //função para selecionar botina e tamanho.
    // Obtém o valor selecionado.

    if(itemSelecionado =='Botina'){
        itemBotina.style.display = "block";
        itemBotina.classList.add('tamanhoAtivo');
        tamanhoUniforme.style.display = "none";
        tamanhoUniforme.classList.remove('tamanhoAtivo');
    } else {
        itemBotina.style.display = "none";
        itemBotina.classList.remove('tamanhoAtivo');
    }
    
    if(itemSelecionado =='Camiseta' || itemSelecionado == 'Calça' || itemSelecionado == 'Moletao' || itemSelecionado == 'Camiseta longa'){
        tamanhoUniforme.style.display = "block";
        tamanhoUniforme.classList.add('tamanhoAtivo');
    } else {
        tamanhoUniforme.style.display = "none";
        tamanhoUniforme.classList.remove('tamanhoAtivo');
    }
    
    if(itemSelecionado == 'Luva pano' || itemSelecionado == 'Luva latex'){
        itemPadrao.style.display = "block";
        itemPadrao.classList.add('tamanhoAtivo');
        tamanhoUniforme.style.display = "none";
        tamanhoUniforme.classList.remove('tamanhoAtivo');
    } else {
        itemPadrao.style.display = "none";
        itemPadrao.classList.remove('tamanhoAtivo');
    }
});
