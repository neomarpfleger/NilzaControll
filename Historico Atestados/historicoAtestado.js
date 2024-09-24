import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

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
    const dataObj = new Date(data + 'T00:00:00'); // Adiciona 'T00:00:00' para garantir que seja interpretado como o dia correto
    const dia = String(dataObj.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero, então adicionamos 1
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

function constroiItem(colaborador, atestadoUrl, dataInicio, dataTermino) {
    const cardAtestado = document.createElement("div");
    cardAtestado.className = "cardAtestado";
    cardAtestado.innerHTML = `
        <p>${colaborador}</p>
        <img class="imgAtestado" src="${atestadoUrl}" alt="Imagem do atestado de ${colaborador}" srcset="">
        <p class="dataInicio">${formataData(dataInicio)}</p>
        <p class="dataFinal">${formataData(dataTermino)}</p>`;

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
        const dataInicioBusca = new Date(inicioDaBusca + 'T00:00:00'); // Garante que a data seja interpretada corretamente
        const dataFinalBusca = new Date(finalDaBusca + 'T23:59:59'); // Inclui o último dia completo no filtro

        const atestadosFiltrados = atestados.filter(atestado => {
            const dataInicioAtestado = new Date(atestado.dataInicio + 'T00:00:00'); // Ajuste para evitar fuso horário
            return dataInicioAtestado >= dataInicioBusca && dataInicioAtestado <= dataFinalBusca;
        });

        const listaParaSeparar = document.querySelector("#consultaAtestados");
        listaParaSeparar.innerHTML = '';

        atestadosFiltrados.forEach(atestado => {
            const dadosDoAtestado = constroiItem(atestado.colaborador, atestado.atestadoUrl, atestado.dataInicio, atestado.dataTermino);
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


// Remova esta chamada se não precisar carregar todos os atestados no início
// listaDeAtestados();
