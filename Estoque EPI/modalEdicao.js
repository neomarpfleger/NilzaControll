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
                <div>
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
        modal.remove(); // Remove o modal após fechar
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            modal.remove();
        }
    });

    // Lida com o submit do formulário
    const form = modal.querySelector("#editEPIForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const editedItem = form.editItem.value;
        const editedTamanho = form.editTamanho.value;
        const editedEstoque = form.editEstoque.value;
        const editedEstoqueMinimo = form.editEstoqueMinimo.value;

        console.log({
            itemId,
            editedItem,
            editedTamanho,
            editedEstoque,
            editedEstoqueMinimo
        });

        // Aqui você pode fazer a chamada para o back-end ou Firebase para salvar as edições

        modal.style.display = "none";
        modal.remove(); // Remove o modal após o submit
    });
}
