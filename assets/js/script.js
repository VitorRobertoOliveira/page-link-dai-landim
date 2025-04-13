document.addEventListener("DOMContentLoaded", function () {
    window.scrollTo(0, 0);
});

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
    };

    // Carrossel
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');

    if (carousel && slides.length > 0) {
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        // Calcula os limites corretamente
        const slideWidth = slides[0].children[0].clientWidth;
        const maxTranslate = 0; // Primeiro slide
        const minTranslate = -(slideWidth * (slides[0].children.length - 3)); // Último slide
        console.log("slideWidth:", slideWidth);

        // Eventos
        carousel.addEventListener('mousedown', startDrag);
        carousel.addEventListener('touchstart', startDrag, { passive: true });
        carousel.addEventListener('mouseup', endDrag);
        carousel.addEventListener('mouseleave', endDrag);
        carousel.addEventListener('touchend', endDrag);

        function startDrag(event) {
            isDragging = true;
            startPos = getPositionX(event);
            console.log("startPos inicial:", startPos);

            carousel.style.transition = 'none'; // Remove transição durante o arrasto
            carousel.classList.add('grabbing');

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
            if (!isDragging) return;

            isDragging = false;
            cancelAnimationFrame(animationID);
            carousel.classList.remove('grabbing');

            window.removeEventListener('mousemove', drag);
            window.removeEventListener('touchmove', drag);

            // Limita o movimento para não ultrapassar os limites do carrossel
            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate;
            } else if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate;
            }

            prevTranslate = currentTranslate;
            setSlidePosition();

            // Aplica transição suave para onde o usuário soltou
            carousel.style.transition = 'transform 0.3s ease-out';
            setSlidePosition();
        }

        function setSlidePosition() {
            carousel.style.transform = `translateX(${currentTranslate}px)`;
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0]?.clientX;
        }

        function animation() {
            setSlidePosition();
            if (isDragging) requestAnimationFrame(animation);
        }
    }
});