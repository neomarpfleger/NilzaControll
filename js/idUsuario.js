
document.addEventListener('DOMContentLoaded', async function() {

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
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    var usersRef = db.collection('categorias');

    // Obtém o usuário logado
    const usuarioLogadoElement = document.getElementById("nomeUsuarioLogado");
    const usuarioLogado = usuarioLogadoElement.textContent;
    const nomeFormatado = usuarioLogado.charAt(0).toLowerCase() + usuarioLogado.slice(1);

    console.log("Nome do usuário logado:", usuarioLogado);

    // Consulta no Firestore para verificar se o usuário é admin
    const snapshot = await usersRef.where('nome', '==', nomeFormatado).get();

    // Verifica se o usuário é um administrador
    if (snapshot.docs.length > 0 && snapshot.docs[0].data().usuario === 'admin') {
        console.log('Usuário é admin');
        console.log(snapshot.docs.length > 0 && snapshot.docs[0].data().usuario);
    } else {
        console.log('Usuário não é admin');
        // Oculta os elementos com a classe ".item"
        document.querySelectorAll(".item").forEach(element => {
            element.style.display = 'none';
        });
    }

    return true; // Retorna true se o usuário for válido
});


