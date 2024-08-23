import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Função para fazer upload e registrar no Firestore
async function uploadAndRegister(dataUrl) {
    const storageRef = ref(storage, 'atestado/' + Date.now() + '.png');

    try {
        // Faz o upload da imagem para o Firebase Storage
        const snapshot = await uploadString(storageRef, dataUrl, 'data_url');
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Salva os dados no Firestore com a URL da imagem
        await addDoc(collection(db, 'registraAtestado'), {
            colaborador: document.querySelector("#colaborador").value.trim(),
            dataInicio: document.querySelector("#dataInicio").value.trim(),
            dataTermino: document.querySelector("#dataTermino").value.trim(),
            atestadoUrl: downloadURL,
            timestamp: serverTimestamp()
        });

        alert("Atestado registrado com sucesso!");
    } catch (error) {
        console.error("Erro ao registrar atestado: ", error);
        alert("Erro ao registrar atestado, tente novamente.");
    }
}

// Evento de clique para capturar imagem do canvas
document.addEventListener("DOMContentLoaded", function() {
    const registrarAtestado = document.querySelector("[data-enviar]");

    registrarAtestado.addEventListener('click', async () => {
        const canvas = document.querySelector("[data-video-canvas]");
        const dataUrl = canvas.toDataURL();
        await uploadAndRegister(dataUrl);

        const mensagem = document.querySelector("[data-mensagem]");
        mensagem.style.display = "none";

        const botaoIniciarCamera = document.querySelector("[data-video-botao]");
        botaoIniciarCamera.style.display = "block";
    });
});

// Evento de clique para capturar imagem do arquivo selecionado
const upLoadArquivo = document.querySelector("#upLoadArquivo");

upLoadArquivo.addEventListener('click', () => {
    const upLoadArquivo = document.getElementById('upLoadArquivo');
    const fileInput = document.querySelector("#photoUpload");
    const file = fileInput.files[0];

    if (!file) {
        alert("Por favor, selecione uma foto para enviar.");
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async function() {
        const dataUrl = reader.result;
        await uploadAndRegister(dataUrl);
        upLoadArquivo.style.display = 'none';
        fileInput.value = ''; // Limpa o campo de seleção de arquivo após o sucesso
    };

    reader.onerror = function(error) {
        console.error("Erro ao ler o arquivo: ", error);
        alert("Erro ao ler o arquivo. Por favor, tente novamente.");
    };
});

document.getElementById('photoUpload').addEventListener('change', function() {
    const upLoadArquivo = document.getElementById('upLoadArquivo');
    
    if (this.files && this.files.length > 0) {
        upLoadArquivo.style.display = 'block';
    } else {
        upLoadArquivo.style.display = 'none';
    }
});
