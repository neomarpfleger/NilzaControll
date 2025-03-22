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

document.querySelector(".btnEditarPonto").addEventListener("click", async () => {
  const uniformeEPIRef = collection(db, 'uniformeEPI');
  const snapshot = await getDocs(uniformeEPIRef);
  const conexaoConvertida = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  conexaoConvertida.forEach(epi => {
    if (!epi.dataDeEntrega) {
      // Exibe no console os documentos que têm o campo dataDeEntrega vazio
      console.log(`ID: ${epi.id}, Nome: ${epi.nomeUsuario}, EPI: ${epi.uniformeEPI}, Tamanho: ${epi.tamanho}, Data de Solicitação: ${epi.dataSolicitacao}, Data de Entrega: ${epi.dataDeEntrega}`);
    }
  });
});