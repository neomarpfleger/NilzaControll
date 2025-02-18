import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
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

const btnRegistraPonto = document.querySelector(".btnRegistraPonto");
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

btnRegistraPonto.addEventListener("click", async function registraPonto() {
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
          <button type="submit">Registrar pontos.</button>
        </form>
      </div>
    </div>
  `;

  // Aguarda carregar as opções do select
  await carregarOpcoes();

  // Adiciona funcionalidade de avançar com "Enter"
  const inputs = document.querySelectorAll("#meuFormulario input");
  inputs.forEach((input, index) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Evita o envio do formulário

        const proximo = inputs[index + 1]; // Pega o próximo campo
        if (proximo) {
          proximo.focus(); // Foca no próximo campo
        }
      }
    });
  });

  // Captura o formulário criado dinamicamente
  const form = document.getElementById("meuFormulario");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Captura os valores dos campos
    const nomeColaborador = document.getElementById("nomeColaborador").value;
    const dataPonto = document.getElementById("dataPonto").value;
    const pontoObservacao = document.getElementById("pontoObservacao").value;
    const pontoEntrada = document.getElementById("pontoEntrada").value;
    const pontoSaidaAlmoco = document.getElementById("pontoSaidaAlmoco").value;
    const pontoEntradaAlmoco = document.getElementById("pontoEntradaAlmoco").value;
    const pontoSaida = document.getElementById("pontoSaida").value;
    const pontoEntradaExtra = document.getElementById("pontoEntradaExtra").value;
    const pontoSaidaExtra = document.getElementById("pontoSaidaExtra").value;

    // Validação básica
    if (!nomeColaborador || !dataPonto) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    try {
      // Salva os dados no Firestore na coleção "ponto"
      await addDoc(collection(db, "ponto"), {
        nomeColaborador,
        dataPonto,
        pontoObservacao,
        pontoEntrada,
        pontoSaidaAlmoco,
        pontoEntradaAlmoco,
        pontoSaida,
        pontoEntradaExtra,
        pontoSaidaExtra,
        timestamp: new Date(), // Adiciona um timestamp
      });

      alert("Registro de ponto salvo com sucesso!");
      form.reset(); // Limpa o formulário após salvar
    } catch (error) {
      console.error("Erro ao registrar ponto:", error);
      alert("Erro ao salvar ponto. Tente novamente.");
    }
  });
});
