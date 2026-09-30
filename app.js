document.addEventListener('DOMContentLoaded', () => {
    const startCarousel = (imageId, slides, interval = 3000, captionId = null) => {
        const image = document.getElementById(imageId);
        const caption = captionId ? document.getElementById(captionId) : null;

        if (!(image instanceof HTMLImageElement)) {
            return;
        }

        slides.forEach((slide) => {
            const preload = new Image();
            preload.src = slide.src;
        });

        let currentSlide = 0;
        const fadeDuration = 250;
        const cycle = () => {
            window.setTimeout(() => {
                image.classList.add('is-changing');
                window.setTimeout(() => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    image.src = slides[currentSlide].src;
                    image.alt = slides[currentSlide].alt;
                    if (caption && slides[currentSlide].caption) {
                        caption.textContent = slides[currentSlide].caption;
                    }
                    image.classList.remove('is-changing');
                    cycle();
                }, fadeDuration);
            }, Math.max(interval - fadeDuration, 0));
        };
        cycle();
    };

    startCarousel('hero-carousel-image', [
        {
            src: 'assets/inicio/01-construccion-cabina.jpeg',
            alt: 'Equipo construyendo la cabina del proyecto L.U.Z.'
        },
        {
            src: 'assets/inicio/02-trabajo-en-equipo.jpeg',
            alt: 'Integrantes del equipo trabajando juntos en el proyecto L.U.Z.'
        },
        {
            src: 'assets/inicio/03-cabina-acustica.jpg',
            alt: 'Cabina del proyecto L.U.Z. revestida con material para aislamiento acústico.'
        },
        {
            src: 'assets/inicio/04-pintando-la-cabina.jpg',
            alt: 'Integrante del equipo pintando la cabina.'
        },
        {
            src: 'assets/inicio/05-actividad-en-equipo.jpg',
            alt: 'Equipo participando en una actividad junto a la cabina.'
        },
        {
            src: 'assets/inicio/06-mural-de-la-cabina.jpg',
            alt: 'Mural pintado a mano para decorar la cabina.'
        },
        {
            src: 'assets/inicio/07-mural-de-peces.jpg',
            alt: 'Mural de peces coloridos creado para el proyecto.'
        },
        {
            src: 'assets/inicio/08-mural-emociones.jpg',
            alt: 'Mural ilustrado con mensajes sobre las emociones.'
        }
    ]);

    startCarousel('software-carousel-image', [
        {
            src: 'assets/luz-acompanamiento-comunidad.jpg',
            alt: 'Una persona encuentra un espacio de calma y acompañamiento dentro de la cabina L.U.Z.',
            caption: 'Un espacio de escucha y conexión, sin presión y a tu ritmo.'
        },
        {
            src: 'assets/luz-acompanamiento-orientacion.jpg',
            alt: 'Ilustración de una persona recibiendo orientación y una conversación cálida en la cabina L.U.Z.',
            caption: 'Una conversación cálida que ayuda a encontrar el siguiente paso.'
        }
    ], 4000, 'software-carousel-caption');

    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navbar && menuToggle) {
        const closeMenu = () => {
            navbar.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            navbar.classList.toggle('menu-open', !isOpen);
            menuToggle.setAttribute('aria-expanded', String(!isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
        });

        navbar.querySelectorAll('.nav-links a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    }

    const dashboard = document.querySelector('.kpi-dashboard');
    if (dashboard) {
        const cards = Array.from(dashboard.querySelectorAll('.kpi-card'));
        const setExpandedCard = (card) => {
            cards.forEach((item) => {
                const button = item.querySelector('.kpi-card__expand');
                const expanded = item === card;
                item.classList.toggle('is-expanded', expanded);
                if (button) {
                    button.setAttribute('aria-expanded', String(expanded));
                }
            });
            dashboard.classList.toggle('is-card-expanded', Boolean(card));
        };

        cards.forEach((card) => {
            let isHoveredByMouse = false;
            card.addEventListener('pointerenter', (event) => {
                if (event.pointerType === 'mouse') {
                    isHoveredByMouse = true;
                    setExpandedCard(card);
                }
            });
            card.addEventListener('pointerleave', (event) => {
                if (event.pointerType === 'mouse') {
                    isHoveredByMouse = false;
                }
                if (event.pointerType === 'mouse' && card.classList.contains('is-expanded')) {
                    setExpandedCard(null);
                }
            });
            const button = card.querySelector('.kpi-card__expand');
            if (button) {
                button.addEventListener('click', () => {
                    if (card.classList.contains('is-expanded') && !isHoveredByMouse) {
                        setExpandedCard(null);
                    } else {
                        setExpandedCard(card);
                    }
                });
            }
        });

        document.addEventListener('pointerdown', (event) => {
            if (dashboard.classList.contains('is-card-expanded') && !dashboard.contains(event.target)) {
                setExpandedCard(null);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && dashboard.classList.contains('is-card-expanded')) {
                setExpandedCard(null);
            }
        });
    }

    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    if (reviewForm instanceof HTMLFormElement && reviewsList) {
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nameField = document.getElementById('reviewer-name');
            const textField = document.getElementById('review-text');
            const ratingElement = document.querySelector('input[name="rating"]:checked');
            if (!(nameField instanceof HTMLInputElement) || !(textField instanceof HTMLTextAreaElement) || !(ratingElement instanceof HTMLInputElement)) {
                return;
            }

            const name = nameField.value.trim() || 'Anónimo';
            const text = textField.value.trim();
            const rating = Number(ratingElement.value);
            const reviewCard = document.createElement('article');
            reviewCard.classList.add('review-card');

            const header = document.createElement('div');
            header.classList.add('review-card-header');
            const reviewer = document.createElement('span');
            reviewer.textContent = name;
            const stars = document.createElement('span');
            stars.classList.add('stars-display');
            stars.setAttribute('aria-label', `${rating} de 5 estrellas`);
            stars.textContent = `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`;
            header.append(reviewer, stars);

            const reviewText = document.createElement('p');
            reviewText.textContent = text;
            reviewCard.append(header, reviewText);

            const noReviewsMessage = reviewsList.querySelector('.no-reviews-msg');
            if (noReviewsMessage) {
                noReviewsMessage.remove();
            }
            reviewsList.prepend(reviewCard);
            reviewForm.reset();
        });
    }
});
