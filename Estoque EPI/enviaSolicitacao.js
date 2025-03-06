import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBKmHpwQWG0vCHael2iMFYzgNv_2ctlij4",
  authDomain: "nilza-controll.firebaseapp.com",
  projectId: "nilza-controll",
  storageBucket: "nilza-controll.appspot.com",
  messagingSenderId: "304218993931",
  appId: "1:304218993931:web:56ce1292e315fbfbccde0e",
  measurementId: "G-TM623T80R8",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para carregar as opções de colaboradores
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

const btnRegistraPonto = document.querySelector(".btnRegistraPonto");

btnRegistraPonto.addEventListener("click", async () => {
  const controlePonto = document.getElementById("controlePonto");
  controlePonto.innerHTML = `
  <div id="containerPainel">
    <form class="container__formulario" data-formulario>
      <div class="formulario__campo">
        <label class="campo__etiqueta" for="nomeColaborador">Selecione colaborador:</label>
        <select id="nomeColaborador" class="nomeColaborador" name="item" required>
          <option value="">Selecione...</option>
        </select>
      </div>
      <div class="formulario__campo uniformeOuEPI">
        <label class="campo__etiqueta" for="item">Selecione seu uniforme ou EPI:</label><br>
        <select id="item" name="item" required>
          <option value=" "></option>
          <option value="Camiseta">Camiseta</option>
          <option value="Camiseta longa">Camiseta longa</option>
          <option value="Calça">Calça</option>
          <option value="Botina">Botina</option>
          <option value="Luva pano">Luva pano</option>
          <option value="Luva latex">Luva latex</option>
          <option value="Protetor auditivo">Protetor auditivo</option>
          <option value="Protetor pele">Protetor pele</option>
          <option value="Moletao">Moletão</option>
        </select>
      </div>
      <div class="formulario__campo botina">
        <label class="campo__etiqueta" for="tamBotina">Selecione o tamanho da botina:</label><br>
        <select id="tamBotina" class="select" name="quantidade" required>
          <option value=" "></option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
        </select>
      </div>
      <div class="formulario__campo tamanhoUniforme">
        <label class="campo__etiqueta" for="tamUniforme">Selecione o tamanho do uniforme:</label><br>
        <select id="tamUniforme" class="select" name="quantidade" required>
          <option value=" "></option>
          <option value="p">P</option>
          <option value="m">M</option>
          <option value="g">G</option>
          <option value="gg">GG</option>
        </select>
      </div>
      <div class="formulario__campo itemPadrao">
        <label class="campo__etiqueta" for="tamUnico">Item de tamanho padrão:</label><br>
        <select id="tamUnico" class="select" name="quantidade">
          <option value="g">G</option> 
        </select>
      </div>
      <button class="btnEnviaSolicitacao" type="submit">Enviar solicitação</button>
    </form>
  </div>`;

  // Aguarda carregar as opções do select
  await carregarOpcoes();

  // Seleciona o elemento <select> pelo ID
  var selectElement = document.querySelector("#item");
  const itemBotina = document.querySelector(".botina");
  const tamanhoUniforme = document.querySelector(".tamanhoUniforme");
  const itemPadrao = document.querySelector(".itemPadrao");

  // Adiciona um listener para o evento 'change'
  selectElement.addEventListener("change", function () {
    var itemSelecionado = selectElement.value;

    //função para selecionar botina e tamanho.
    // Obtém o valor selecionado.

    if (itemSelecionado == "Botina") {
      itemBotina.style.display = "block";
      itemBotina.classList.add("tamanhoAtivo");
      tamanhoUniforme.style.display = "none";
      tamanhoUniforme.classList.remove("tamanhoAtivo");
    } else {
      itemBotina.style.display = "none";
      itemBotina.classList.remove("tamanhoAtivo");
    }

    if (
      itemSelecionado == "Camiseta" ||
      itemSelecionado == "Calça" ||
      itemSelecionado == "Moletao" ||
      itemSelecionado == "Camiseta longa"
    ) {
      tamanhoUniforme.style.display = "block";
      tamanhoUniforme.classList.add("tamanhoAtivo");
    } else {
      tamanhoUniforme.style.display = "none";
      tamanhoUniforme.classList.remove("tamanhoAtivo");
    }

    if (itemSelecionado == "Luva pano" || itemSelecionado == "Luva latex") {
      itemPadrao.style.display = "block";
      itemPadrao.classList.add("tamanhoAtivo");
      tamanhoUniforme.style.display = "none";
      tamanhoUniforme.classList.remove("tamanhoAtivo");
    } else {
      itemPadrao.style.display = "none";
      itemPadrao.classList.remove("tamanhoAtivo");
    }
  });

  document
    .querySelector(".btnEnviaSolicitacao")
    .addEventListener("click", async (event) => {
      event.preventDefault(); // Previne o comportamento padrão de envio do formulário

      const nomeUsuario = document
        .getElementById("nomeColaborador")
        .value.trim();
      const uniformeEPI = document.getElementById("item").value.trim();
      const tamanhoElement = document.querySelector(".tamanhoAtivo select");
      const tamanho = tamanhoElement ? tamanhoElement.value.trim() : "";
      const dataSolicitacao = new Date().toLocaleDateString("pt-BR");
      const dataDeEntrega = "";

      console.log("nomeUsuario:", nomeUsuario);
      console.log("uniformeEPI:", uniformeEPI);
      console.log("tamanho:", tamanho);
      console.log("dataSolicitacao:", dataSolicitacao);

      if (nomeUsuario === "" || uniformeEPI === "") {
        alert("Favor preencher todos os campos.");
        return; // Evita recarregar a página
      }

      try {
        // Adiciona um documento à coleção 'uniformeEPI' do Firestore
        await addDoc(collection(db, "uniformeEPI"), {
          nomeUsuario,
          uniformeEPI,
          tamanho,
          dataSolicitacao,
          dataDeEntrega,
        });
        alert("Solicitação enviada com sucesso!");
        location.reload(); // Recarrega a página
      } catch (error) {
        console.error("Erro ao enviar solicitação:", error);
        alert(
          "Erro ao enviar solicitação. Verifique o console para mais detalhes."
        );
      }
    });
});
