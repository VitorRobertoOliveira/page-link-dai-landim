document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("modalForm");
    const btn = document.querySelector('a[href="https://api.whatsapp.com/send?phone=5534984401206"]');
    const closeButton = document.querySelector('.close');
    const agendarBtn = document.getElementById('agendar-btn');

    // Garante que o modal esteja oculto ao carregar a página
    if (modal) modal.style.display = "none";

    if (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            modal.style.display = "flex";
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function () {
            modal.style.display = "none";
        });
    }

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    if (agendarBtn) {
        agendarBtn.addEventListener('click', function (event) {
            event.preventDefault();

            const nomeInput = document.getElementById('nome');
            const servicoInput = document.getElementById('select');

            if (!nomeInput || !servicoInput) return;

            const nome = nomeInput.value.trim();
            const servico = servicoInput.value.trim();

            if (nome === "" || servico === "") {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const mensagem = `Olá, meu nome é ${nome}.\nGostaria de agendar um serviço de ${servico}.\nQuais são os horários disponíveis?`;

            const url = `https://api.whatsapp.com/send?phone=5534984401206&text=${encodeURIComponent(mensagem)}`;

            window.open(url, '_blank');

            nomeInput.value = "";
            servicoInput.value = "";

            modal.style.display = "none";
        });
    }
});

// Carrossel Melhorado
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');

if (carousel && slides.length > 0) {
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;
    let animationID;

    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('touchstart', startDrag, { passive: true });

    carousel.addEventListener('mouseup', endDrag);
    carousel.addEventListener('mouseleave', endDrag);
    carousel.addEventListener('touchend', endDrag);

    function startDrag(event) {
        isDragging = true;
        startPos = getPositionX(event);
        carousel.classList.add('grabbing'); // Adiciona uma classe para indicar que está sendo arrastado

        // Adicionar eventos de movimento apenas enquanto estiver arrastando
        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag, { passive: true });

        animationID = requestAnimationFrame(animation);
    }

    function drag(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }

    function endDrag() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        carousel.classList.remove('grabbing');

        // Remove os eventos de movimento após soltar o clique
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('touchmove', drag);

        const slideWidth = carousel.clientWidth;
        currentIndex = Math.round(-currentTranslate / slideWidth);
        currentIndex = Math.max(0, Math.min(currentIndex, slides.length - 1));

        currentTranslate = -currentIndex * slideWidth;
        prevTranslate = currentTranslate;
        setSlidePosition(true);
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSlidePosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSlidePosition(animate = false) {
        if (animate) {
            carousel.style.transition = "transform 0.3s ease-out";
        } else {
            carousel.style.transition = "none";
        }
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }
}
