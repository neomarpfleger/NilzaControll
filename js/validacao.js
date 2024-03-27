
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
        tamanhoUniforme.style.display = "none";
    } else {
        itemBotina.style.display = "none";
    }
    
    if(itemSelecionado =='Camiseta' || itemSelecionado == 'Calca' || itemSelecionado == 'Moletao' || itemSelecionado == 'Camiseta longa'){
        tamanhoUniforme.style.display = "block";
    } else {
        tamanhoUniforme.style.display = "none";
    }
    
    if(itemSelecionado == 'Luva pano' || itemSelecionado == 'Luva latex'){
        itemPadrao.style.display = "block";
        tamanhoUniforme.style.display = "none";
    } else {
        itemPadrao.style.display = "none";
    }
});
