
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

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

async function listaHistorico() {
    const uniformeEPIRef = db.collection('uniformeEPI');
    const snapshot = await uniformeEPIRef.get();
    const conexaoConvertida = snapshot.docs.map(doc => doc.data());

    const listaDeHistorico = document.querySelector(".listaDeHistorico");

    conexaoConvertida.forEach(epi => {
        const item = constroiItem(epi.nomeUsuario, epi.uniformeEPI, epi.tamanho, epi.dataSolicitacao, epi.dataDeEntrega);
        listaDeHistorico.appendChild(item);
    });

    return conexaoConvertida;
}

function constroiItem(nome, uniformeEPI, tamanho, dataSolicitacao, dataDeEntrega) {
    const listaDeHistorico = document.createElement("li");
    listaDeHistorico.className = "pedidosEntregues";
    listaDeHistorico.innerHTML =
        `<p class="nome">${nome}</p>
        <p class="uniformeEPI">${uniformeEPI}</p>
        <p class="tamanho">${tamanho}</p>
        <p class="data">${dataSolicitacao}</p>
        <p class="data">${dataDeEntrega}</p>`;

    return listaDeHistorico;
}

listaHistorico();
