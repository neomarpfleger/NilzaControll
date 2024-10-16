import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

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
    const conexaoConvertida = snapshot.docs.map(doc => ({
        id: doc.id, // Adiciona o id do documento
        ...doc.data()
    }));

    const listaDeEPI = document.querySelector(".listaDeEPI");
    listaDeEPI.innerHTML = ""; // Limpa a lista antes de adicionar os itens

    conexaoConvertida.forEach(epi => {
        const itemEPI = constroiItem(epi.id, epi.item, epi.tamanho, epi.estoque, epi.estoqueMinimo);
        listaDeEPI.appendChild(itemEPI);
    });

    return conexaoConvertida;
}

// Função para construir o item de EPI com o ícone de lixeira
function constroiItem(id, item, tamanho, estoque, estoqueMinimo) {
    const listaDeEPI = document.createElement("tr");
    listaDeEPI.className = "pedidosEntregues";
    listaDeEPI.innerHTML =`
        <td>${item}</td>
        <td>${tamanho}</td>
        <td>${estoque}</td>
        <td>${estoqueMinimo}</td>
        <td><i class="fa-solid fa-trash-can" style="cursor:pointer;" data-id="${id}"></i></td>
    `;

    // Adiciona evento de clique no ícone da lixeira
    listaDeEPI.querySelector(".fa-trash-can").addEventListener('click', async (event) => {
        const itemId = event.target.getAttribute("data-id");

        // Chama a função para excluir o item
        await excluirItem(itemId);

        // Remove o item da lista após a exclusão
        listaDeEPI.remove();
    });

    return listaDeEPI;
}

// Função para excluir um item do Firestore
async function excluirItem(id) {
    try {
        await deleteDoc(doc(db, "estoqueEPI", id));
        alert("Item excluído com sucesso!");
    } catch (error) {
        console.error("Erro ao excluir item:", error);
        alert("Erro ao excluir item. Verifique o console para mais detalhes.");
    }
}

// Chama a função para listar os EPIs
listaEPI();
