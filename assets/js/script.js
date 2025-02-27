document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("modalForm");
    var btn = document.querySelector('a[href="https://api.whatsapp.com/send?phone=5534984401206"]');
    var span = document.getElementsByClassName("close")[0];

    btn.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = "block";
    });

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

document.getElementById('agendar-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const servico = document.getElementById('select').value;

    // Constrói a mensagem
    const mensagem = `Olá, meu nome é ${nome}.\nGostaria de agendar um serviço de ${servico}.\nQuais são os horários disponíveis ?`;

    // Constrói a URL do WhatsApp
    const url = `https://api.whatsapp.com/send?phone=5534984401206&text=${encodeURIComponent(mensagem)}`;

    // Redireciona o usuário para a URL do WhatsApp
    window.open(url, '_blank');
});