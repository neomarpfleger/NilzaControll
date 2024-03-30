
async function verificarLogin(nome, senha) {
    const conexao = await fetch("http://localhost:3000/usuario");
    const usuarios = await conexao.json();

    const usuarioValido = usuarios.find(usuario => usuario.nome === nome && usuario.senha === senha);

    return usuarioValido;
}


btnLogin.addEventListener("click", async function(){
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    const usuarioValido = await verificarLogin(nome, senha);

    if (usuarioValido) {
        window.location.href = "./html/solicitacaoEPI.html";
    } else {
        alert("Nome de usuário ou senha incorretos. Por favor, tente novamente.");
    }
});

