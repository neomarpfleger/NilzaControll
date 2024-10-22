// Importa a instância do Firestore exportada de firebaseConfig.js
import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import editarItem from './modalEdicao.js';

// Função para buscar os dados de uma coleção
async function fetchEPIs() {
    const epiCollection = collection(db, 'EPIs');
    const snapshot = await getDocs(epiCollection);
    const epiList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(epiList);
}

// Chama a função para buscar os dados (exemplo de uso)
fetchEPIs();

// Adicione o evento de clique para abrir o modal de edição
document.querySelectorAll('.fa-pencil').forEach(pencilIcon => {
    pencilIcon.addEventListener('click', (event) => {
        const itemId = event.target.getAttribute('data-id');
        const item = event.target.getAttribute('data-item');
        const tamanho = event.target.getAttribute('data-tamanho');
        const estoque = event.target.getAttribute('data-estoque');
        const estoqueMinimo = event.target.getAttribute('data-estoque-minimo');

        // Chama a função para abrir o modal de edição
        editarItem(itemId, item, tamanho, estoque, estoqueMinimo);
    });
});
