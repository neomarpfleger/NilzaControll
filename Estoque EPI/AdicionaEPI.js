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
const db = firebase.firestore();

document.querySelector('#CriarEPI').addEventListener('click', async () => {

    const item = document.getElementById('nomeEPI').value;
    const tamanho = document.getElementById("tamanhoEPI").value;
    const estoque = document.getElementById("quantEPI").value;
    const estoqueMinimo = document.getElementById("estoqueMinimo").value;

    try {
        // Adiciona um documento à coleção 'estoqueEPI' do Firestore
        await db.collection('estoqueEPI').add({
            item,
            tamanho,
            estoque,
            estoqueMinimo
        });
        alert('Solicitação enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
        alert('Erro ao enviar solicitação. Verifique o console para mais detalhes.');
    }
});
