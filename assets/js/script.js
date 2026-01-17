document.addEventListener("DOMContentLoaded", function () {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("modalForm");
    const btn = document.getElementById('btn-agendar'); // Alterado para usar o ID
    const closeButton = document.querySelector('.close');
    const agendarBtn = document.getElementById('agendar-btn');

    // Garante que o modal esteja oculto ao carregar a página
    if (modal) modal.style.display = "none";

    if (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            
            // Envia o evento para o Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                  'event_category': 'engagement',
                  'event_label': 'abrir_modal_agendamento'
                });
            }

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

        // Calcula os limites corretamente de forma dinâmica
        const carouselContainer = document.querySelector('.carousel-container');
        const slideChildren = slides[0].children;
        const slideWidth = slideChildren[0].clientWidth;
        const gap = 10; // Valor do gap definido no CSS

        const contentWidth = (slideChildren.length * slideWidth) + ((slideChildren.length - 1) * gap);
        const containerWidth = carouselContainer.clientWidth;
        
        const maxTranslate = 0; // Posição inicial
        // O ponto final é a diferença entre a largura total do conteúdo e a largura visível do contêiner
        const minTranslate = -(contentWidth - containerWidth);

        // Eventos
        carousel.addEventListener('mousedown', startDrag);
        carousel.addEventListener('touchstart', startDrag, { passive: false });
        carousel.addEventListener('mouseup', endDrag);
        carousel.addEventListener('mouseleave', endDrag);
        carousel.addEventListener('touchend', endDrag);

        function startDrag(event) {
            isDragging = true;
            startPos = getPositionX(event);

            carousel.style.transition = 'none'; // Remove transição durante o arrasto
            carousel.classList.add('grabbing');

            window.addEventListener('mousemove', drag);
            window.addEventListener('touchmove', drag, { passive: false });

            animationID = requestAnimationFrame(animation);
        }

        function drag(event) {
            if (isDragging) {
                if (event.type === 'touchmove') {
                    event.preventDefault();
                }
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
            }
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

    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Toggle between heart and heart-fill
            if (button.classList.contains('bi-heart')) {
                button.classList.remove('bi-heart');
                button.classList.add('bi-heart-fill');
            } else {
                button.classList.remove('bi-heart-fill');
                button.classList.add('bi-heart');
            }
        });
    });

    // --- Início do Rastreamento de Cliques ---

    // Função auxiliar para rastrear cliques em elementos por ID
    function trackClick(elementId, eventName) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('click', () => {
                if (typeof gtag === 'function') {
                    gtag('event', 'click', {
                        'event_category': 'engagement',
                        'event_label': eventName
                    });
                }
            });
        }
    }

    // Rastreia cliques nos links principais
    trackClick('btn-feedback', 'click_feedback');
    trackClick('btn-instagram', 'click_instagram_principal');
    trackClick('btn-whatsapp', 'click_whatsapp');
    trackClick('btn-localizacao', 'click_localizacao');

    // Rastreia cliques nos links do modal
    trackClick('btn-modal-corte', 'click_calendly_corte');
    trackClick('btn-modal-mechas', 'click_calendly_mechas');

    // Rastreia cliques nos links do rodapé
    trackClick('btn-footer-instagram', 'click_instagram_rodape');
    trackClick('btn-footer-tiktok', 'click_tiktok_rodape');

    // --- Fim do Rastreamento de Cliques ---
});
