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

carregarOpcoes();
