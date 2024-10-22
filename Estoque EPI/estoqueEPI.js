import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import editarItem from './modalEdicao.js';

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

// Função para construir o item de EPI com os ícones de lixeira e lápis (edição)
function constroiItem(id, item, tamanho, estoque, estoqueMinimo) {
    const listaDeEPI = document.createElement("tr");
    listaDeEPI.className = "pedidosEntregues";
    listaDeEPI.innerHTML = `
        <td>${item}</td>
        <td>${tamanho}</td>
        <td>${estoque}</td>
        <td>${estoqueMinimo}</td>
        <td>
            <i class="fa-solid fa-trash-can" style="cursor:pointer;" data-id="${id}"></i> 
            <i class="fa-solid fa-pencil" style="cursor:pointer;" data-id="${id}"></i>
        </td>
    `;

    // Adiciona evento de clique no ícone da lixeira
    listaDeEPI.querySelector(".fa-trash-can").addEventListener('click', async (event) => {
        const itemId = event.target.getAttribute("data-id");

        // Chama a função para excluir o item
        await excluirItem(itemId);

        // Remove o item da lista após a exclusão
        listaDeEPI.remove();
    });

    // Adiciona evento de clique no ícone de lápis para edição
    listaDeEPI.querySelector(".fa-pencil").addEventListener('click', () => {

        const itemId = id;

        // Chama a função para editar o item
        editarItem(itemId, item, tamanho, estoque, estoqueMinimo);
    });

    return listaDeEPI;
}

/* Função para editar um item de EPI (você pode adaptar essa função conforme suas necessidades)
function editarItem(id, item, tamanho, estoque, estoqueMinimo) {
    // Exemplo: Abrir um modal ou exibir campos de edição no lugar dos valores atuais
    console.log(`Editar item ID: ${id}`);
    console.log(`Item: ${item}, Tamanho: ${tamanho}, Estoque: ${estoque}, Estoque Mínimo: ${estoqueMinimo}`);
    
    // Aqui você pode abrir um modal ou substituir os campos com inputs para editar
    // Exemplo: Abrir um modal com um formulário para edição
    // Pode incluir a chamada para o back-end para editar o item
}*/


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
