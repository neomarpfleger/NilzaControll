async function listaDeEpis() {
    const conexao = await fetch("http://localhost:3000/uniformeEPI");
    const conexaoConvertida = await conexao.json();

    console.log("Lista de EPIs:", conexaoConvertida);

    const listaParaSeparar = document.querySelector(".listaParaSeparar");

    conexaoConvertida.forEach(epi => {
        if (!epi.dataDeEntrega) {
            const item = constroiItem(epi.id, epi.nome, epi.uniformeEPI, epi.tamanho, epi.data, epi.dataDeEntrega);
            listaParaSeparar.appendChild(item);
        }
    });

    // Adiciona o evento de escuta após adicionar os itens à lista
    document.querySelectorAll(".pedidos input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            if (e.target.checked) {
                const id = parseInt(e.target.parentElement.dataset.id);
                const today = new Date().toLocaleDateString('pt-BR');

                const itemAtualizado = {
                    ...conexaoConvertida.find(epi => epi.id === id),
                    dataDeEntrega: today
                };

                fetch(`http://localhost:3000/uniformeEPI/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemAtualizado)
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao atualizar data de entrega.');
                    }
                    return response.json();
                }).then(data => {
                    console.log('Data de entrega atualizada com sucesso:', data);
                }).catch(error => {
                    console.error('Erro:', error);
                });
            }
        });
    });

    return conexaoConvertida;
}

function constroiItem(id, nome, uniformeEPI, tamanho, data, dataDeEntrega) {
    const itemEmSeparacao = document.createElement("li");
    itemEmSeparacao.className = "pedidos";
    itemEmSeparacao.dataset.id = id;
    itemEmSeparacao.innerHTML = 
                                `<p class="nome">${nome}</p>
                                <p class="uniformeEPI">${uniformeEPI}</p>
                                <p class="tamanho">${tamanho}</p>
                                <p class="data">${data}</p>
                                <input type="checkbox" name="" id="separacaoOK">`
    if (dataDeEntrega) {
        const checkbox = itemEmSeparacao.querySelector('input[type="checkbox"]');
        checkbox.checked = true;
    }

    return itemEmSeparacao;
}

listaDeEpis();
