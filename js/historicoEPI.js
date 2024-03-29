async function listaHistorico() {
    const conexao = await fetch("http://localhost:3001/uniformeEPI");
    const conexaoConvertida = await conexao.json();

    console.log("Lista de EPIs:", conexaoConvertida);

    const listaDeHistorico = document.querySelector(".listaDeHistorico");

    conexaoConvertida.forEach(epi => {
        const item = constroiItem(epi.nome, epi.uniformeEPI, epi.tamanho, epi.data, epi.dataDeEntrega);
        listaDeHistorico.appendChild(item);
    });

    return conexaoConvertida;
}

function constroiItem(nome, uniformeEPI, tamanho, data, dataDeEntrega) {
    const listaDeHistorico = document.createElement("li");
    listaDeHistorico.className = "pedidosEntregues";
    listaDeHistorico.innerHTML =
        `<p class="nome">${nome}</p>
        <p class="uniformeEPI">${uniformeEPI}</p>
        <p class="tamanho">${tamanho}</p>
        <p class="data">${data}</p>
        <p class="data">${dataDeEntrega}</p>`;

    return listaDeHistorico;
}

listaHistorico();
