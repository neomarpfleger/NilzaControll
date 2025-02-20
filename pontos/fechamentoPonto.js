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
              <th>Dia da Semana</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody id="tabelaBody"></tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("btnConsultar").addEventListener("click", async () => {
    try {
      const inicioDaBusca = document.getElementById("inicioDaBusca").value;
      const finalDaBusca = document.getElementById("finalDaBusca").value;
      if (!inicioDaBusca || !finalDaBusca) {
        alert("Favor preencher os campos com a data inicial e final do fechamento");
        return;
      }

      const tabelaPontos = document.getElementById("tabelaPontos");
      tabelaPontos.style.display = "block";

      
      const categoriasRef = collection(db, "categorias");
      const q = query(categoriasRef, where("fechamentoPonto", "==", true));
      const querySnapshot = await getDocs(q);
      const tabelaBody = document.getElementById("tabelaBody");
      const headerRow = document.getElementById("headerRow");

      tabelaBody.innerHTML = "";

      if (querySnapshot.empty) {
        tabelaBody.innerHTML = "<tr><td colspan='2'>Nenhum colaborador precisa fechar o ponto.</td></tr>";
        return;
      }

      const colaboradores = [];
      querySnapshot.forEach((doc) => {
        const colaborador = doc.data();
        colaboradores.push(colaborador.nome);
        const th = document.createElement("th");
        th.textContent = colaborador.nome;
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
        
        for (const colaborador of colaboradores) {
          const td = document.createElement("td");
          
          const pontoRef = collection(db, "ponto");
          const pontoQuery = query(pontoRef, where("nomeColaborador", "==", colaborador), where("dataPonto", "==", dataAtual.toISOString().split('T')[0]));
          const pontoSnapshot = await getDocs(pontoQuery);
          
          let totalMinutos = 0;
          pontoSnapshot.forEach((doc) => {
            const ponto = doc.data();
            
            function calcularMinutos(horario) {
              if (!horario) return 0;
              const [hora, minuto] = horario.split(":" ).map(Number);
              return hora * 60 + minuto;
            }

            const entrada = calcularMinutos(ponto.pontoEntrada);
            const saida = calcularMinutos(ponto.pontoSaida);
            const entradaAlmoco = calcularMinutos(ponto.pontoEntradaAlmoco);
            const saidaAlmoco = calcularMinutos(ponto.pontoSaidaAlmoco);
            const entradaExtra = calcularMinutos(ponto.pontoEntradaExtra);
            const saidaExtra = calcularMinutos(ponto.pontoSaidaExtra);
            
            totalMinutos = (saida - entrada) - (saidaAlmoco - entradaAlmoco) + (saidaExtra - entradaExtra);
          });
          
          const cargaHoraria = diaSemana === "sex" ? 480 : 540;
          td.textContent = totalMinutos >= cargaHoraria ? "✅ Cumpriu" : "❌ Não cumpriu";
          row.appendChild(td);
        }
        
        tabelaBody.appendChild(row);
        dataAtual.setDate(dataAtual.getDate() + 1);
      }
    } catch (error) {
      console.error("Erro ao consultar colaboradores:", error);
    }
  });
});
