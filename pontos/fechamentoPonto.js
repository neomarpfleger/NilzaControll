import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
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

const btnFecharPonto = document.querySelector(".btnFecharPonto");
const controlePonto = document.getElementById("controlePonto");

btnFecharPonto.addEventListener("click", function() {
  controlePonto.innerHTML = `
    <div id="fechamentoPonto">
      <div id="inputDates">
        <button type="button" id="btnConsultar">Consultar pontos</button>
        <div class="date">
          <label for="inicioDaBusca">Inicio</label>
          <input type="date" id="inicioDaBusca" />
        </div>
        <div class="date">
          <label for="finalDaBusca">Final</label>
          <input type="date" id="finalDaBusca" />
        </div>
      </div>
      <div id="pontoColaborador">
        <table id="tabelaPontos">
          <thead>
            <tr id="headerRow">
              <th>Semana</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody id="tabelaBody"></tbody>
        </table>
        <div id="paginationControls">
          <button id="prevPage">⬅️ Anterior</button>
          <span id="pageInfo"></span>
          <button id="nextPage">Próximo ➡️</button>
          <button id="btnImprimir">Imprimir</button>
        </div>
      </div>
    </div>
  `;

  let currentPage = 1;
  let totalPages = 1;
  let colaboradores = [];
  let pontosData = {};

  document.getElementById("btnConsultar").addEventListener("click", async () => {
    try {
      const inicioDaBusca = document.getElementById("inicioDaBusca").value;
      const finalDaBusca = document.getElementById("finalDaBusca").value;
      if (!inicioDaBusca || !finalDaBusca) {
        alert("Favor preencher os campos com a data inicial e final do fechamento");
        return;
      }
      
      let paginationControls = document.getElementById("paginationControls")
      let tabelaPontos = document.getElementById("tabelaPontos");
      tabelaPontos.style.display = "block";
      paginationControls.style.display = "flex" 

      const categoriasRef = collection(db, "categorias");
      const q = query(categoriasRef, where("fechamentoPonto", "==", true));
      const querySnapshot = await getDocs(q);
      colaboradores = querySnapshot.docs.map(doc => doc.data().nome);
      totalPages = Math.ceil(colaboradores.length / 6);
      currentPage = 1;

      pontosData = await carregarPontos(inicioDaBusca, finalDaBusca);
      atualizarTabela(inicioDaBusca, finalDaBusca);
    } catch (error) {
      console.error("Erro ao consultar colaboradores:", error);
    }
  });

  async function carregarPontos(inicio, fim) {
    let dados = {};
    const pontoRef = collection(db, "ponto");
    const pontoQuery = query(pontoRef, where("dataPonto", ">=", inicio), where("dataPonto", "<=", fim));
    const pontoSnapshot = await getDocs(pontoQuery);
  
    pontoSnapshot.forEach(doc => {
      const ponto = doc.data();
      const chave = `${ponto.nomeColaborador}-${ponto.dataPonto}`;
      dados[chave] = ponto.totalMinutosTrabalhados || 0;
    });
  
    return dados;
  }

  function atualizarTabela(inicioDaBusca, finalDaBusca) {
    const tabelaBody = document.getElementById("tabelaBody");
    const headerRow = document.getElementById("headerRow");
    const pageInfo = document.getElementById("pageInfo");
    
    tabelaBody.innerHTML = "";
    headerRow.innerHTML = "<th>Semana</th><th>Data</th>";
    pageInfo.textContent = `${currentPage} / ${totalPages}`;

    const startIdx = (currentPage - 1) * 6;
    const endIdx = startIdx + 6;
    const colaboradoresPagina = colaboradores.slice(startIdx, endIdx);
    
    colaboradoresPagina.forEach(colaborador => {
      const th = document.createElement("th");
      th.textContent = colaborador;
      headerRow.appendChild(th);
    });
    
    let dataAtual = new Date(inicioDaBusca + "T00:00:00");
    const dataFinal = new Date(finalDaBusca + "T00:00:00");
    
    while (dataAtual <= dataFinal) {
      const options = { weekday: "short", day: "2-digit", month: "2-digit" };
      const dataFormatada = dataAtual.toLocaleDateString("pt-BR", options);
      const [diaSemana, diaMes] = dataFormatada.split(", ");
  
      const row = document.createElement("tr");
      row.innerHTML = `<td>${diaSemana}</td><td>${diaMes}</td>`;
  
      for (const colaborador of colaboradoresPagina) {
        const td = document.createElement("td");
        const chave = `${colaborador}-${dataAtual.toISOString().split('T')[0]}`;
        const totalMinutos = pontosData[chave] || 0;

        const diaSemana = dataAtual.toLocaleDateString("pt-BR", { weekday: "short" }).toLowerCase().replace(".", "");
        const cargaHoraria = diaSemana === "sex" ? 480 : 540;
        const margem = 10;
        const diferenca = Math.abs(totalMinutos - cargaHoraria);

        if (diferenca <= margem) {
          td.textContent = "✅ Cumpriu";
        } else if (totalMinutos < cargaHoraria) {
          td.textContent = `❌ Falta (${diferenca} min.)`;
        } else {
          td.textContent = `⚠️ Hora extra (${diferenca} min extra)`;
        }
        row.appendChild(td);
      }
      tabelaBody.appendChild(row);
      dataAtual.setDate(dataAtual.getDate() + 1);
    }
  }

  document.getElementById("btnImprimir").addEventListener("click", () => {
    window.print();
  });

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      atualizarTabela(document.getElementById("inicioDaBusca").value, document.getElementById("finalDaBusca").value);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      atualizarTabela(document.getElementById("inicioDaBusca").value, document.getElementById("finalDaBusca").value);
    }
  });
});
