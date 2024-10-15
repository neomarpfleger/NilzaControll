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
        const itemEPI = constroiItem(epi.item, epi.tamanho, epi.estoque, epi.estoqueMinimo);
        listaDeEPI.appendChild(itemEPI);
    });

    return conexaoConvertida;
}

// Função para construir o item de EPI
function constroiItem(item, tamanho, estoque, estoqueMinimo) {
    const listaDeEPI = document.createElement("tr");
    listaDeEPI.className = "pedidosEntregues";
    listaDeEPI.innerHTML =
                            `
                            <td>${item}</td>
                            <td>${tamanho}</td>
                            <td>${estoque}</td>
                            <td>${estoqueMinimo}</td>
                            `
    return listaDeEPI;
}

// Chama a função para listar os EPIs
listaEPI();
