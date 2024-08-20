
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

document.addEventListener("DOMContentLoaded", function() {

    const registrarAtestado = document.querySelector("[data-enviar]");
    const uniformeEPIRef = collection(db, 'registraAtestado');

    registrarAtestado.addEventListener('click', async () => {
        const canvas = document.querySelector("[data-video-canvas]");
        const dataUrl = canvas.toDataURL(); // Converte a imagem do canvas para Base64
        
        // Cria uma referência de storage para a imagem
        const storageRef = ref(storage, 'atestado/' + Date.now() + '.png');

        try {
            // Faz o upload da imagem para o Firebase Storage
            const snapshot = await uploadString(storageRef, dataUrl, 'data_url');
            
            // Obtém a URL de download da imagem
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            // Salva os dados no Firestore com a URL da imagem
            await addDoc(uniformeEPIRef, {
                colaborador: document.querySelector("#colaborador").value,
                dataInicio: document.querySelector("#dataInicio").value,
                dataTermino: document.querySelector("#dataTermino").value,
                atestadoUrl: downloadURL, // Armazena a URL da imagem
                timestamp: serverTimestamp()
            });
            
            alert("Atestado registrado com sucesso!");
        } catch (error) {
            console.error("Erro ao registrar atestado: ", error);
            alert("Erro ao registrar atestado, tente novamente.");
        }
    });
});
