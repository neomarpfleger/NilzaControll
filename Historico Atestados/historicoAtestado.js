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

async function listaDeEpis() {
    const AtestadoRef = collection(db, 'registraAtestado');
    const snapshot = await getDocs(AtestadoRef);
    const conexaoConvertida = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const listaParaSeparar = document.querySelector(".consultaAtestados");

    conexaoConvertida.forEach(atestado => {
        const dadosDoAtestado = constroiItem(atestado.colaborador, atestado.atestadoUrl, atestado.dataInicio, atestado.dataTermino);
        listaParaSeparar.appendChild(dadosDoAtestado);
    });

    return conexaoConvertida;
}

function constroiItem(colaborador, atestadoUrl, dataInicio, dataTermino) {
    const cardAtestado = document.createElement("div");
    cardAtestado.className = "cardAtestado";
    cardAtestado.innerHTML = 
                                `<p>${colaborador}</p>
                                <img src="${atestadoUrl}" alt="Imagem do atestado de ${colaborador}" srcset="">
                                <p class="dataInicio">${dataInicio}</p>
                                <p class="dataFinal">${dataTermino}</p>`

    return cardAtestado;
}

listaDeEpis();
