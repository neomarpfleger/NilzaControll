async function listaDeEpis() {
    const conexao = await fetch("http://localhost:3000/uniformeEPI");
    const conexaoConvertida = await conexao.json();

    console.log("Lista de EPIs:", conexaoConvertida);

    const listaParaSeparar = document.querySelector(".listaParaSeparar");

    conexaoConvertida.forEach(epi => {
        const item = constroiItem(epi.nome, epi.uniformeEPI, epi.tamanho, epi.data);
        listaParaSeparar.appendChild(item);
    });

    return conexaoConvertida;
}

listaDeEpis();

const listaParaSeparar = document.querySelector(".listaParaSeparar");

function constroiItem(nome, uniformeEPI, tamanho, data) {
    const itemEmSeparacao = document.createElement("li");
    itemEmSeparacao.className = "pedidos";
    itemEmSeparacao.innerHTML = 
                                `<p class="nome">${nome}</p>
                                <p class="uniformeEPI">${uniformeEPI}</p>
                                <p class="tamanho">${tamanho}</p>
                                <p class="data">${data}</p>
                                <input type="checkbox" name="" id="separacaoOK">`
    return itemEmSeparacao;
}