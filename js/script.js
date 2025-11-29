// Navegación suave al hacer scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Cambiar estilo de la barra de navegación al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Menú hamburguesa para móviles
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace (móviles)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Animación de las barras de habilidades al hacer scroll
function animateSkills() {
    const skillsSection = document.getElementById('sobre-mi');
    const skillBars = document.querySelectorAll('.habilidad-progreso');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    animateSkills();
    
    // Efecto de aparición suave para las tarjetas de proyectos
    const projectCards = document.querySelectorAll('.proyecto-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// Manejo del formulario de contacto
const contactForm = document.querySelector('.contacto-formulario');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí iría la lógica para enviar el formulario
        // Por ahora, solo mostraremos un mensaje de éxito
        alert('¡Gracias por tu mensaje! Te contactaré pronto.');
        this.reset();
    });
}
// ========== FUNCIONALIDAD PARA PDFs ==========

// Función para ver PDF en modal
function verPDF(nombreArchivo) {
    const modal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    const pdfTitle = document.getElementById('pdfTitle');

    if (!modal) {
        crearModalPDF();
    }

    // Configurar el visor de PDF
    const rutaPDF = `pdf/${nombreArchivo}`;
    pdfViewer.src = rutaPDF;

    // Configurar título
    const titulo = nombreArchivo.replace('.pdf', '').replace(/-/g, ' ');
    pdfTitle.textContent = titulo.charAt(0).toUpperCase() + titulo.slice(1);

    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Crear modal dinámicamente si no existe
function crearModalPDF() {
    const modalHTML = `
        <div id="pdfModal" class="pdf-modal">
            <div class="pdf-modal-content">
                <div class="pdf-modal-header">
                    <h3 id="pdfTitle">Documentación</h3>
                    <span class="close-pdf-modal">&times;</span>
                </div>
                <div class="pdf-modal-body">
                    <iframe id="pdfViewer" src="" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Configurar eventos del modal
    configurarModalPDF();
}

// Configurar eventos del modal
function configurarModalPDF() {
    const modal = document.getElementById('pdfModal');
    const closeBtn = document.querySelector('.close-pdf-modal');

    closeBtn.addEventListener('click', cerrarModalPDF);

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            cerrarModalPDF();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            cerrarModalPDF();
        }
    });
}

// Función para cerrar modal
function cerrarModalPDF() {
    const modal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    pdfViewer.src = '';
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function () {
    // Crear modal al cargar la página
    crearModalPDF();

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

    /* Filtros de categorías */
.filtros - categorias {
    display: flex;
    justify - content: center;
    flex - wrap: wrap;
    gap: 10px;
    margin - bottom: 3rem;
}

.filtro - btn {
    padding: 10px 20px;
    background: var(--color - fondo);
    border: 2px solid var(--color - borde);
    border - radius: 30px;
    color: var(--color - texto);
    font - family: 'Poppins', sans - serif;
    font - weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filtro - btn.active,
.filtro - btn:hover {
    background: var(--gradiente - primario);
    color: white;
    border - color: var(--color - primario);
}

/* Responsive para filtros */
@media(max - width: 768px) {
    .filtros - categorias {
        gap: 8px;
    }
    
    .filtro - btn {
        padding: 8px 16px;
        font - size: 0.9rem;
    }
}