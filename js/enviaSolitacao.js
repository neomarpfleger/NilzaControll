async function listaDeEpis() {
    const conexao = await fetch("http://localhost:3000/uniformeEPI");
    const conexaoConvertida = await conexao.json();

    console.log("Lista de EPIs:", conexaoConvertida);

    return conexaoConvertida;
}

listaDeEpis();

document.querySelector('.enviaSolitacao').addEventListener('click', async () => {
    document.querySelectorAll(".item").forEach(async (element) => {
        const uniformeEPI = element.querySelector(".nomeItem").textContent;
        const tamanho = element.querySelector(".tamanhoItem").textContent;

        try {
            const response = await fetch('http://localhost:3000/uniformeEPI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uniformeEPI, tamanho })
            });
    
            if (response.ok) {
                alert('Solicitação enviada com sucesso!');
            } else {
                throw new Error('Erro ao enviar solicitação');
            }
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
            alert('Erro ao enviar solicitação. Verifique o console para mais detalhes.');
        }
    });
});

