
// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBKmHpwQWG0vCHael2iMFYzgNv_2ctlij4",
    authDomain: "nilza-controll.firebaseapp.com",
    projectId: "nilza-controll",
    storageBucket: "nilza-controll.appspot.com",
    messagingSenderId: "304218993931",
    appId: "1:304218993931:web:56ce1292e315fbfbccde0e",
    measurementId: "G-TM623T80R8"
};


// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

async function listaDeEpis() {
    const uniformeEPIRef = db.collection('epi-uniforme');
    const snapshot = await uniformeEPIRef.get();
    const conexaoConvertida = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const listaParaSeparar = document.querySelector(".listaParaSeparar");

    conexaoConvertida.forEach(epi => {
        if (!epi.dataDeEntrega) {
            const item = constroiItem(epi.id, epi.nomeUsuario, epi.uniformeEPI, epi.tamanho, epi.dataSolicitacao, epi.dataDeEntrega);
            listaParaSeparar.appendChild(item);
        }
    });

    // Adiciona o evento de escuta após adicionar os itens à lista
    document.querySelectorAll(".pedidos input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            if (e.target.checked) {
                const id = e.target.parentElement.dataset.id;
                const today = new Date().toLocaleDateString('pt-BR');

                const itemAtualizado = {
                    ...conexaoConvertida.find(epi => epi.id === id),
                    dataDeEntrega: today
                };

                // Atualiza o documento no Firestore
                uniformeEPIRef.doc(id).update(itemAtualizado).then(() => {
                    console.log('Data de entrega atualizada com sucesso:', itemAtualizado);
                }).catch(error => {
                    console.error('Erro ao atualizar data de entrega:', error);
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
                                <p class="checkBox">Confirme</p><input type="checkbox" name="" id="separacaoOK">`
    if (dataDeEntrega) {
        const checkbox = itemEmSeparacao.querySelector('input[type="checkbox"]');
        checkbox.checked = true;
    }

    return itemEmSeparacao;
}

listaDeEpis();


/*async function listaDeEpis() {
    const conexao = await fetch("http://localhost:3001/uniformeEPI");
    const conexaoConvertida = await conexao.json();

    console.log("Lista de EPIs:", conexaoConvertida);

    const listaParaSeparar = document.querySelector(".listaParaSeparar");

    conexaoConvertida.forEach(epi => {
        if (!epi.dataDeEntrega) {
            const item = constroiItem(epi.id, epi.nomeUsuario, epi.uniformeEPI, epi.tamanho, epi.dataSolicitacao, epi.dataDeEntrega);
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

                fetch(`http://localhost:3001/uniformeEPI/${id}`, {
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
                                <p class="checkBox">Confirme</p><input type="checkbox" name="" id="separacaoOK">`
    if (dataDeEntrega) {
        const checkbox = itemEmSeparacao.querySelector('input[type="checkbox"]');
        checkbox.checked = true;
    }

    return itemEmSeparacao;
}

listaDeEpis();*/
