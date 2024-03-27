
document.addEventListener("DOMContentLoaded", function() {
    const minhaLista = document.querySelector(".minhaLista");
    const formulario = document.querySelector(".container__formulario");

    if (minhaLista && formulario) {
        const item = document.querySelector("#item");
        const quantidade = document.querySelector("#tamBotina");
        const tamanhoUniforme = document.querySelector("#tamUniforme");
        const criaNovoitem = document.querySelector(".adionaItem");

        criaNovoitem.addEventListener("click", function(evento) {
            evento.preventDefault();

            const valorNovoItem = item.value;
            const valorQuantItem = quantidade.value;
            const tamanhoUniformeItem = tamanhoUniforme.value;

            console.log("Valor do item selecionado:", tamanhoUniformeItem); //VALOR DO ITEM

            var novoItemLista = document.createElement("li");
            novoItemLista.classList.add("item");

            var novoitem = document.createElement("p");
            novoitem.classList.add("nomeItem");
            novoitem.textContent = valorNovoItem;

            var novaQuant = document.createElement("p");
            novaQuant.classList.add("tamanhoItem");
            if(valorQuantItem != " "){
                novaQuant.textContent = valorQuantItem;
            } else {
                novaQuant.textContent = tamanhoUniformeItem;
            }
            
            novoItemLista.appendChild(novoitem);
            novoItemLista.appendChild(novaQuant);

            minhaLista.appendChild(novoItemLista);

            formulario.reset(); // Limpa os campos do formulário
        });
    } else {
        console.error("Elemento minhaLista ou formulario não encontrado");
    }
});












/*const item = document.querySelector("#item");
const quantidade = document.querySelector("#tamBotina");
const criaNovoitem = document.querySelector(".adionaItem");

document.addEventListener("DOMContentLoaded", function() {
    const minhaLista = document.querySelector(".minhaLista");
    if (minhaLista) {
        // Se o elemento com a classe minhaLista foi encontrado

        criaNovoitem.addEventListener("click", function(evento) {
            evento.preventDefault();
            const valorNovoItem = item.value;
            const valorQuantItem = quantidade.value;
        
            console.log("Valor do item selecionado:", valorNovoItem);                           //VALOR DO ITEM
        
            var novoItemLista = document.createElement("li");
            novoItemLista.classList.add("item");
        
            var novoitem = document.createElement("p");
            novoitem.classList.add("nomeItem");
            novoitem.textContent = valorNovoItem;

            var novaQuant = document.createElement("p");
            novaQuant.classList.add("tamanhoItem");
            novaQuant.textContent = valorQuantItem;
            
            novoItemLista.appendChild(novoitem);
            novoItemLista.appendChild(novaQuant);
        
            minhaLista.appendChild(novoItemLista);

            novoItemLista = " ";
        })

    } else {
        console.error("Elemento minhaLista não encontrado");
    }
});*/
