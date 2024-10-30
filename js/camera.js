
/*const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video =  document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

botaoIniciarCamera.addEventListener("click", async function(){
    const iniciarVideo = await navigator.mediaDevices
    .getUserMedia({video: true, audio: false})

    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";

    video.srcObject = iniciarVideo;
})

botaoTirarFoto.addEventListener("click", function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL('imagem/jpeg');

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
});
*/
const menuAtestado = document.getElementById("menuAtestado");

menuAtestado.addEventListener("click", function() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px"; // Fecha o menu
        menuAtestado.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Ícone original de menu
        menuAtestado.style.backgroundColor = "var(--verde)"; 
    } else {
        sidebar.style.left = "0px"; // Abre o menu
        menuAtestado.innerHTML = '<i class="fa-solid fa-x"></i>'; // Ícone de fechar
        menuAtestado.style.backgroundColor = "var(--vermelho)";
    }
});


const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

botaoIniciarCamera.addEventListener("click", async function () {
    try {
        const iniciarVideo = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: "environment" } }, // Câmera traseira
            audio: false
        });

        botaoIniciarCamera.style.display = "none";
        campoCamera.style.display = "block";

        video.srcObject = iniciarVideo;
    } catch (err) {
        console.error("Erro ao acessar a câmera: ", err);
    }
});

botaoTirarFoto.addEventListener("click", function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL('image/jpeg');

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
});



const btnArquivarAtestado = document.getElementById("btnArquivarAtestado");
btnArquivarAtestado.addEventListener("click", function() {
    const container = document.getElementById("container")
    container.innerHTML =
                            `<div id="selectColaborador">
                                <label for="colaborador">Selecione o colaborador:</label><br>
                                <select id="colaborador" class="select" name="colaborador" required>
                                    <option value=""></option>
                                    <option value="Altamir Das Dores">Altamir Das Dores</option>
                                    <option value="Dilson">Dilson</option>
                                    <option value="Ednei">Ednei</option>
                                    <option value="Neomar">Neomar</option>
                                    <option value="Wilson">Wilson</option>
                                    <option value="Renato">Renato</option>
                                    <option value="Luis Fernando">Luis Fernando</option>
                                    <option value="Valdemar">Valdemar</option>
                                    <option value="Bruno">Bruno</option>
                                    <option value="Carlos">Carlos</option>
                                    <option value="Fernando">Fernando</option>
                                    <option value="Alex">Alex</option>
                                    <option value="Sydnei">Sydnei</option>
                                    <option value="Osvaldir">Osvaldir</option>
                                    <option value="Moacir">Moacir</option>
                                    <option value="Vanderlei">Vanderlei</option>
                                    <option value="Rodrigo">Rodrigo</option>

                                </select>
                            </div>
                            <div class="inputsData">
                                <label for="dataInicio">Data Início:</label>
                                <input name="aniversario" id="dataInicio" type="date" required/>
                            </div>
                            <div class="inputsData">
                                <label for="dataTermino">Data Término:</label>
                                <input id="dataTermino" name="dataTermino" type="date" required>
                            </div>
                            <button type="button" class="btnSelectArquivo">Selecionar Arquivo</button>`
})


  
