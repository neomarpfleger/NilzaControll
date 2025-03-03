import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
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

document.querySelector(".btnEnviaSolicitacao").addEventListener("click", async (event) => {
  event.preventDefault(); // Previne o comportamento padrão de envio do formulário

  const nomeUsuario = document.getElementById("nomeColaborador").value.trim();
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
    alert("O campo uniforme/EPI não pode estar vazio. Favor preencher.");
    return; // Evita recarregar a página
  }

  try {
    // Adiciona um documento à coleção 'uniformeEPI' do Firestore
    await addDoc(collection(db, ""), {
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
    alert("Erro ao enviar solicitação. Verifique o console para mais detalhes.");
  }
});