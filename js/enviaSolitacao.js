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

document.querySelector('.enviaSolitacao').addEventListener('click', async () => {
    document.querySelectorAll(".itemlista").forEach(async (element) => {
        const nomeUsuario = document.getElementById('nomeUsuarioLogado').textContent;
        const uniformeEPI = element.querySelector(".nomeItem").textContent;
        const tamanho = element.querySelector(".tamanhoItem").textContent;
        const dataSolicitacao = new Date().toLocaleDateString('pt-BR');
        const dataDeEntrega = "";
        if(uniformeEPI == " "){
            alert("O campo uniforme/EPI não pode estar vazio favor peencher")
            location.reload();
        }
        try {
            // Adiciona um documento à coleção 'uniformeEPI' do Firestore
            await db.collection('uniformeEPI').add({
                nomeUsuario,
                uniformeEPI,
                tamanho,
                dataSolicitacao,
                dataDeEntrega
            });
            alert('Solicitação enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
            alert('Erro ao enviar solicitação. Verifique o console para mais detalhes.');
        }
        location.reload();
    });
});

