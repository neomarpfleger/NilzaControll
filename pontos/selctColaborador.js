// Importação do Firebase (caso ainda não tenha feito)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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

// Função para buscar os dados e popular o select
async function carregarOpcoes() {
  const select = document.getElementById("selectcolaborador");
  const querySnapshot = await getDocs(collection(db, "categorias"));

  querySnapshot.forEach((doc) => {
    const option = document.createElement("option");
    option.value = doc.id; // Usa o ID do documento como valor
    option.textContent = doc.data().nome; // Substitua 'nome' pelo campo correto no Firestore
    select.appendChild(option);
  });
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarOpcoes);
