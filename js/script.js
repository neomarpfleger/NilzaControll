/*let nomeUsuarioLogado; // Variável global para armazenar o nome do usuário logado

async function verificarLogin(nome, senha) {
    const conexao = await fetch("http://localhost:3000/usuario");
    const usuarios = await conexao.json();

    const usuarioValido = usuarios.find(usuario => usuario.nome === nome && usuario.senha === senha);

    if (usuarioValido) {
        nomeUsuarioLogado = nome; // Salva o nome do usuário na variável global
        localStorage.setItem('nomeUsuarioLogado', nome); // Salva o nome do usuário no localStorage
        window.location.href = `./html/solicitacaoEPI.html?nome=${nome}`;
        return true; // Retorna true se o usuário for válido
    }

    return false; // Retorna false se o usuário não for válido
}

btnLogin.addEventListener("click", async function(){
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    const usuarioValido = await verificarLogin(nome, senha);

    if (!usuarioValido) {
        alert("Nome de usuário ou senha incorretos. Por favor, tente novamente.");
    }
});*/


let nomeUsuarioLogado; // Variável global para armazenar o nome do usuário logado

async function verificarLogin(nome, senha) {

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
    
    // Consulta no Firestore para verificar se o usuário e senha estão corretos
    const snapshot = await usersRef.where('nome', '==', nome).where('senha', '==', senha).get();

    if (snapshot.empty) {
        return false; // Retorna false se não houver nenhum documento que corresponda ao nome e senha
    }

    snapshot.forEach((doc) => {
        nomeUsuarioLogado = nome; // Salva o nome do usuário na variável global
        localStorage.setItem('nomeUsuarioLogado', nome); // Salva o nome do usuário no localStorage
        window.location.href = `./html/solicitacaoEPI.html?nome=${nome}`;
    });

    return true; // Retorna true se o usuário for válido
}

// Adicionei a referência para o botão de login
let btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", async function(){
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    const usuarioValido = await verificarLogin(nome, senha);

    if (!usuarioValido) {
        alert("Nome de usuário ou senha incorretos. Por favor, tente novamente.");
    }
});
