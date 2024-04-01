let nomeUsuarioLogado; // Variável global para armazenar o nome do usuário logado

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
});
