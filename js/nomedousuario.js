// Obtém o nome do usuário da URL
const urlParams = new URLSearchParams(window.location.search);
const nomeUsuario = urlParams.get('nome');

// Converte a primeira letra do nome para maiúscula
const nomeFormatado = nomeUsuario.charAt(0).toUpperCase() + nomeUsuario.slice(1);

// Exibe o nome do usuário na tela
document.getElementById("nomeUsuarioLogado").textContent = `${nomeFormatado}`;
document.getElementById("bemVindoUsuario").textContent = `Bem Vindo(a) ${nomeFormatado}!`;

