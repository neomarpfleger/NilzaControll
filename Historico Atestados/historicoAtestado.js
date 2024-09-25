import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { deleteObject } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";



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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Função para formatar datas no formato dd/mm/aaaa
function formataData(data) {
    const dataObj = new Date(data + 'T00:00:00');
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

async function listaDeAtestados() {
    try {
        const AtestadoRef = collection(db, 'registraAtestado');
        const snapshot = await getDocs(AtestadoRef);
        const conexaoConvertida = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return conexaoConvertida;
    } catch (error) {
        console.error("Erro ao buscar atestados: ", error);
    }
}

function constroiItem(colaborador, atestadoUrl, dataInicio, dataTermino, id) {
    const cardAtestado = document.createElement("div");
    cardAtestado.className = "cardAtestado";
    cardAtestado.innerHTML = `
        <p>${colaborador}</p>
        <img class="imgAtestado" src="${atestadoUrl}" alt="Imagem do atestado de ${colaborador}">
        <p class="dataInicio">${formataData(dataInicio)}</p>
        <p class="dataFinal">${formataData(dataTermino)}</p>
        <i class="btnExcluirProjeto fa-solid fa-trash-can"${id}"></i>`;

    // Adicionar evento ao botão de exclusão
    const btnExcluirProjeto = cardAtestado.querySelector('.btnExcluirProjeto');
    btnExcluirProjeto.addEventListener('click', async () => {
        const confirmacao = confirm(`Tem certeza que deseja excluir o atestado de ${colaborador}?`);
        if (confirmacao) {
            try {
                // Deletar o documento do Firestore
                const atestadoDocRef = doc(db, 'registraAtestado', id); // Usando o id passado como argumento
                await deleteDoc(atestadoDocRef);

                // Deletar a imagem do Firebase Storage
                const storageRef = ref(storage, atestadoUrl); // 'atestadoUrl' é a URL da imagem
                await deleteObject(storageRef);

                alert('Atestado e imagem excluídos com sucesso!');
                
                // Remover o card da interface
                cardAtestado.remove();
            } catch (error) {
                console.error("Erro ao excluir o atestado ou imagem: ", error);
                alert('Erro ao excluir o atestado ou imagem.');
            }
        }
    });

    return cardAtestado;
}

document.querySelector('#btnConsultar').addEventListener('click', async () => {
    const inicioDaBusca = document.querySelector('#inicioDaBusca').value;
    const finalDaBusca = document.querySelector('#finalDaBusca').value;

    if (!inicioDaBusca || !finalDaBusca) {
        alert('Selecione o intervalo de datas');
        return;
    }

    try {
        const atestados = await listaDeAtestados();
        const dataInicioBusca = new Date(inicioDaBusca + 'T00:00:00');
        const dataFinalBusca = new Date(finalDaBusca + 'T23:59:59');

        const atestadosFiltrados = atestados.filter(atestado => {
            const dataInicioAtestado = new Date(atestado.dataInicio + 'T00:00:00');
            return dataInicioAtestado >= dataInicioBusca && dataInicioAtestado <= dataFinalBusca;
        });

        const listaParaSeparar = document.querySelector("#consultaAtestados");
        listaParaSeparar.innerHTML = '';

        atestadosFiltrados.forEach(atestado => {
            const dadosDoAtestado = constroiItem(atestado.colaborador, atestado.atestadoUrl, atestado.dataInicio, atestado.dataTermino, atestado.id);
            listaParaSeparar.appendChild(dadosDoAtestado);
        });
    } catch (error) {
        console.error("Erro ao filtrar atestados: ", error);
    }
});

const btnVoltar = document.getElementById("btnVoltar");
btnVoltar.addEventListener("click", () => {
    window.location = "../html/atestados.html";
});
