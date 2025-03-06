document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("modalForm");
    var btn = document.querySelector('a[href="https://api.whatsapp.com/send?phone=5534984401206"]');
    var closeButton = document.querySelector('.close'); 

    // Garante que o modal esteja oculto ao carregar a página
    modal.style.display = "none";

    // Verifica se o botão de abrir modal existe antes de adicionar o evento
    if (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            modal.style.display = "flex";
        });
    }

    // Evento para fechar o modal usando a classe close
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            modal.style.display = "none";
        });
    }

    // Fecha o modal ao clicar fora do conteúdo
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});


document.getElementById('agendar-btn').addEventListener('click', function (event) {
    event.preventDefault();

    const nomeInput = document.getElementById('nome');
    const servicoInput = document.getElementById('select');

    const nome = nomeInput.value;
    const servico = servicoInput.value;

    const mensagem = `Olá, meu nome é ${nome}.\nGostaria de agendar um serviço de ${servico}.\nQuais são os horários disponíveis ?`;

    const url = `https://api.whatsapp.com/send?phone=5534984401206&text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');

    nomeInput.value = "";
    servicoInput.value = "";

    document.getElementById("modalForm").style.display = "none";
});