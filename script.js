const cards = document.querySelectorAll('.video-card');
const overlay = document.getElementById('modal-overlay');
const vimeoContainer = document.getElementById('vimeo-container');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeBtn = document.querySelector('.close-btn');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const vimeoId = card.getAttribute('data-vimeo-id');
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');

        // Dentro del click de la card, justo antes de mostrar el modal:
        if (card.classList.contains('vertical')) {
            vimeoContainer.style.aspectRatio = "9 / 16";
            vimeoContainer.style.maxWidth = "400px";
            vimeoContainer.style.margin = "0 auto";
        } else {
            vimeoContainer.style.aspectRatio = "16 / 9";
            vimeoContainer.style.maxWidth = "100%";
        }

        // Insertar el video de Vimeo
        vimeoContainer.innerHTML = `<iframe src="https://player.vimeo.com/video/${vimeoId}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;

        // Insertar textos
        modalTitle.innerText = title;
        modalDesc.innerText = desc;

        // Mostrar modal
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Evita scroll de fondo
    });
});

// Cerrar modal
function closeModal() {
    overlay.style.display = 'none';
    vimeoContainer.innerHTML = ''; // Detiene el video al cerrar
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. OBSERVADOR DE SECCIONES
    const sections = document.querySelectorAll('.reveal-section');

    sections.forEach(section => {
        // Si la sección contiene la cuadrícula de videos, usamos un umbral más sensible (0.05)
        const isGrid = section.querySelector('.video-grid');
        const sectionThreshold = isGrid ? 0.05 : 0.25;

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, { threshold: sectionThreshold });

        sectionObserver.observe(section);
    });

    // 2. OBSERVADOR DE CARDS (Focus)
    const cards = document.querySelectorAll('.video-card');

    cards.forEach(card => {
        // Si la card es vertical (Redes Sociales), bajamos el threshold para evitar parpadeos
        const isVertical = card.classList.contains('vertical');
        const cardThreshold = isVertical ? 0.1 : 0.5;

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('focused');
                } else {
                    entry.target.classList.remove('focused');
                }
            });
        }, {
            rootMargin: "-30% 0px -30% 0px",
            threshold: cardThreshold
        });

        cardObserver.observe(card);
    });
});

const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang') || 'es'; // 'es' por defecto

console.log("El idioma es: ", lang)