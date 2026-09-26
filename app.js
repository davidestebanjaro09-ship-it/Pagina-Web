document.addEventListener('DOMContentLoaded', () => {
    const startCarousel = (imageId, slides) => {
        const image = document.getElementById(imageId);

        if (!image) {
            return;
        }

        slides.forEach((slide) => {
            const preload = new Image();
            preload.src = slide.src;
        });

        let currentSlide = 0;

        window.setInterval(() => {
            image.classList.add('is-changing');

            window.setTimeout(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                image.src = slides[currentSlide].src;
                image.alt = slides[currentSlide].alt;
                image.classList.remove('is-changing');
            }, 250);
        }, 3000);
    };

    startCarousel('hero-carousel-image', [
        {
            src: 'assets/inicio/01-construccion-cabina.jpeg',
            alt: 'Equipo construyendo la cabina del proyecto Luz.'
        },
        {
            src: 'assets/inicio/02-trabajo-en-equipo.jpeg',
            alt: 'Integrantes del equipo trabajando juntos en el proyecto.'
        },
        {
            src: 'assets/inicio/03-cabina-acustica.jpg',
            alt: 'Cabina del proyecto Luz revestida con material para aislamiento acústico.'
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

    startCarousel('meetings-carousel-image', [
        {
            src: 'assets/reuniones/01-reunion-virtual.jpg',
            alt: 'El equipo de L.U.Z. reunido virtualmente para revisar el proyecto.'
        },
        {
            src: 'assets/reuniones/02-reunion-presencial.jpg',
            alt: 'El equipo de L.U.Z. conversa durante una reunión presencial.'
        },
        {
            src: 'assets/reuniones/03-encuentro-equipo.jpg',
            alt: 'Integrantes del equipo de L.U.Z. reunidos.'
        },
        {
            src: 'assets/reuniones/04-revision-software-equipo.jpeg',
            alt: 'El equipo revisa los avances del software en una reunión.'
        },
        {
            src: 'assets/reuniones/05-revision-software.jpeg',
            alt: 'Una integrante del equipo revisa el software en un computador.'
        }
    ]);

    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(evento) {
            // Prevenimos que la página se recargue al enviar el formulario
            evento.preventDefault();
            
            // 1. Capturar los datos
            let name = document.getElementById('reviewer-name').value.trim();
            const text = document.getElementById('review-text').value.trim();
            const ratingElement = document.querySelector('input[name="rating"]:checked');
            
            // Validar si el usuario dejó el nombre en blanco
            if (name === '') {
                name = 'Anónimo';
            }

            const rating = ratingElement ? ratingElement.value : 5;

            // 2. Crear las estrellas doradas para mostrar
            let starsHtml = '';
            for(let i = 0; i < 5; i++) {
                if(i < rating) {
                    starsHtml += '★';
                } else {
                    starsHtml += '☆';
                }
            }

            // 3. Crear la tarjeta HTML de la nueva reseña
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            reviewCard.innerHTML = `
                <div class="review-card-header">
                    <span>${name}</span>
                    <span class="stars-display">${starsHtml}</span>
                </div>
                <p>${text}</p>
            `;

            // 4. Quitar el mensaje de "Aún no hay opiniones" si existe
            const noReviewsMsg = document.querySelector('.no-reviews-msg');
            if (noReviewsMsg) {
                noReviewsMsg.remove();
            }

            // 5. Agregar la reseña al principio de la lista
            reviewsList.prepend(reviewCard);

            // 6. Limpiar el formulario para la siguiente persona
            reviewForm.reset();
        });
    }
})