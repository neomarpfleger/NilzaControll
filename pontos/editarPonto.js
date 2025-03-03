import { getFirestore, collection, getDocs, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const btnEditarPonto = document.querySelector(".btnEditarPonto");
const controlePonto = document.getElementById("controlePonto");

async function carregarOpcoes() {
  const select = document.getElementById("nomeColaborador");
  const querySnapshot = await getDocs(collection(db, "categorias"));

  querySnapshot.forEach((doc) => {
    const option = document.createElement("option");
    option.value = doc.data().nome; // Agora o valor será o nome
    option.textContent = doc.data().nome; // Exibe o nome na lista
    select.appendChild(option);
  });
}

btnEditarPonto.addEventListener("click", async function registraPonto() {
  // Cria dinamicamente o formulário
  controlePonto.innerHTML = `
    <div id="containerPainel">
      <div class="divSelectColaborador">
        <form id="meuFormulario">
          <div class="colaboradorData">
            <div class="labelInput">
              <label class="campo__etiqueta" for="nomeColaborador">Selecione colaborador:</label>
              <select id="nomeColaborador" class="nomeColaborador" name="item" required>
                <option value="">Selecione...</option>
              </select>
            </div>
            <div class="labelInput">
              <label for="dataPonto">Data de registro</label>
              <input type="date" name="dataPonto" id="dataPonto" required />
            </div>
            <div class="labelInput">
              <label for="pontoObservacao">Justifique a ausência</label>
              <input type="text" id="pontoObservacao" name="pontoObservacao" />
            </div>
          </div>
          <div class="divHoras">
            <div class="inputHoras">
              <label for="pontoEntrada">Entrada:</label>
              <input type="time" id="pontoEntrada" name="pontoEntrada" />
              <label for="pontoSaidaAlmoco">Saída almoço:</label>
              <input type="time" id="pontoSaidaAlmoco" name="pontoSaidaAlmoco" />
            </div>
            <div class="inputHoras">
              <label for="pontoEntradaAlmoco">Entrada almoço:</label>
              <input type="time" id="pontoEntradaAlmoco" name="pontoEntradaAlmoco" />
              <label for="pontoSaida">Saída:</label>
              <input type="time" id="pontoSaida" name="pontoSaida" />
            </div>
            <div class="inputHoras">
              <label for="pontoEntradaExtra">Entrada extra:</label>
              <input type="time" id="pontoEntradaExtra" name="pontoEntradaExtra" />
              <label for="pontoSaidaExtra">Saída extra:</label>
              <input type="time" id="pontoSaidaExtra" name="pontoSaidaExtra" />
            </div>
          </div>
          <div class="btns">
            <button id="btnConsultaPonto" type="search">Consultar ponto.</button>
            <button type="submit">Editar ponto.</button>
            <button type="button" id="btnExcluirPonto">Excluir ponto.</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const btnConsultaPonto = document.getElementById("btnConsultaPonto");

  btnConsultaPonto.addEventListener("click", function consultaPonto(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário
    const nomeColaborador = document.getElementById("nomeColaborador").value;
    const dataPonto = document.getElementById("dataPonto").value;

    if(!nomeColaborador || !dataPonto) {
      alert("Por favor, selecione um colaborador e uma data.");
      return;
    }

    try {
      const pontoRef = collection(db, "ponto");
      const q = query(pontoRef, where("nomeColaborador", "==", nomeColaborador), where("dataPonto", "==", dataPonto));
      const querySnapshot = getDocs(q);

      querySnapshot.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const ponto = doc.data();
          document.getElementById("pontoEntrada").value = ponto.pontoEntrada;
          document.getElementById("pontoSaidaAlmoco").value = ponto.pontoSaidaAlmoco;
          document.getElementById("pontoEntradaAlmoco").value = ponto.pontoEntradaAlmoco;
          document.getElementById("pontoSaida").value = ponto.pontoSaida;
          document.getElementById("pontoEntradaExtra").value = ponto.pontoEntradaExtra;
          document.getElementById("pontoSaidaExtra").value = ponto.pontoSaidaExtra;
          document.getElementById("pontoObservacao").value = ponto.pontoObservacao;
        });
      });
    } catch (error) {
      console.error("Erro ao buscar o ponto:", error);
      alert("Ponto não encontrado.");
    }
  });

  const btnExcluirPonto = document.getElementById("btnExcluirPonto");

  btnExcluirPonto.addEventListener("click", async () => {
    const nomeColaborador = document.getElementById("nomeColaborador").value;
    const dataPonto = document.getElementById("dataPonto").value;

    if (!nomeColaborador || !dataPonto) {
      alert("Por favor, selecione um colaborador e uma data.");
      return;
    }

    try {
      const pontoRef = collection(db, "ponto");
      const q = query(pontoRef, where("nomeColaborador", "==", nomeColaborador), where("dataPonto", "==", dataPonto));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        document.getElementById("nomeColaborador").value = "";
        document.getElementById("dataPonto").value = "";
        document.getElementById("pontoEntrada").value = "";
        document.getElementById("pontoSaidaAlmoco").value = "";
        document.getElementById("pontoEntradaAlmoco").value = "";
        document.getElementById("pontoSaida").value = "";
        document.getElementById("pontoEntradaExtra").value = "";
        document.getElementById("pontoSaidaExtra").value = "";
        document.getElementById("pontoObservacao").value = "";
      });

      alert("Ponto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir ponto:", error);
      alert("Erro ao excluir ponto. Tente novamente mais tarde.");
    }
  });

  // Aguarda carregar as opções do select
  await carregarOpcoes();
});