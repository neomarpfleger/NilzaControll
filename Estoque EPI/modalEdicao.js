import { doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { db } from './firebaseConfig.js';

export default function editarItem(itemId, item, tamanho, estoque, estoqueMinimo) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Editar EPI</h2>
            <form id="editEPIForm">
                <div class="inputEdicao">
                    <label for="editItem">EPI</label>
                    <input type="text" id="editItem" name="editItem" value="${item}" required>
                </div>
                <div class="inputEdicao">
                    <label for="editTamanho">Tamanho</label>
                    <input type="text" id="editTamanho" name="editTamanho" value="${tamanho}" required>
                </div>
                <div class="inputEdicao">
                    <label for="editEstoque">Estoque</label>
                    <input type="number" id="editEstoque" name="editEstoque" value="${estoque}" required>
                </div>
                <div class="inputEdicao">
                    <label for="editEstoqueMinimo">Estoque Mínimo</label>
                    <input type="number" id="editEstoqueMinimo" name="editEstoqueMinimo" value="${estoqueMinimo}" required>
                </div>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Mostra o modal
    modal.style.display = "flex";

    // Função para fechar o modal
    const closeModal = modal.querySelector(".close");
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        modal.remove();
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            modal.remove();
        }
    });

    // Submissão do formulário de edição
    const form = modal.querySelector('#editEPIForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Pega os novos valores dos campos
        const updatedItem = form.editItem.value;
        const updatedTamanho = form.editTamanho.value;
        const updatedEstoque = form.editEstoque.value;
        const updatedEstoqueMinimo = form.editEstoqueMinimo.value;

        // Atualiza no Firestore
        const epiDoc = doc(db, 'EPIs', itemId);
        await updateDoc(epiDoc, {
            item: updatedItem,
            tamanho: updatedTamanho,
            estoque: updatedEstoque,
            estoqueMinimo: updatedEstoqueMinimo
        });

        // Fecha o modal após salvar
        modal.style.display = "none";
        modal.remove();
        console.log("Item atualizado com sucesso!");
    });
}
