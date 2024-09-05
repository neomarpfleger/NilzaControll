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

// Função para listar os EPIs
async function listaEPI() {
    const estoqueEPIRef = collection(db, 'estoqueEPI');
    const snapshot = await getDocs(estoqueEPIRef);
    const conexaoConvertida = snapshot.docs.map(doc => doc.data());

    const listaDeEPI = document.querySelector(".listaDeEPI");

    conexaoConvertida.forEach(epi => {
        const itemEPI = constroiItem(epi.item, epi.estoque, epi.estoqueMinimo);
        listaDeEPI.appendChild(itemEPI);
    });

    return conexaoConvertida;
}

// Função para construir o item de EPI
function constroiItem(item, estoque, estoqueMinimo) {
    const listaDeEPI = document.createElement("li");
    listaDeEPI.className = "pedidosEntregues";
    listaDeEPI.innerHTML =
        `<p class="nome">${item}</p>
        <p class="uniformeEPI">${estoque}</p>
        <p class="tamanho">${estoqueMinimo}</p>`;

    return listaDeEPI;
}

// Chama a função para listar os EPIs
listaEPI();
