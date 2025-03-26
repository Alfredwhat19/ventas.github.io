function scrollNav(value) {
    document.getElementById("navScroll").scrollLeft += value;
}

 // Función para desplazar el menú de navegación
 function scrollNav(offset) {
    const navScroll = document.getElementById('navScroll');
    navScroll.scrollBy({ left: offset, behavior: 'smooth' });
}

// Efecto hover para las tarjetas de producto
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Botón de llamado a la acción
    const ctaButton = document.querySelector('.btn-hero');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    }
});

// Mostrar/ocultar botones de navegación según la posición del scroll
window.addEventListener('scroll', function() {
    const navButtons = document.querySelectorAll('.scroll-btn');
    const navScroll = document.getElementById('navScroll');
    
    if (navScroll.scrollLeft === 0) {
        navButtons[0].style.opacity = '0.5';
        navButtons[0].style.cursor = 'default';
    } else {
        navButtons[0].style.opacity = '1';
        navButtons[0].style.cursor = 'pointer';
    }
    
    if (navScroll.scrollLeft + navScroll.clientWidth >= navScroll.scrollWidth - 1) {
        navButtons[1].style.opacity = '0.5';
        navButtons[1].style.cursor = 'default';
    } else {
        navButtons[1].style.opacity = '1';
        navButtons[1].style.cursor = 'pointer';
    }
});

// Inicializar para ocultar el botón izquierdo al cargar
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.scroll-btn');
    navButtons[0].style.opacity = '0.5';
    navButtons[0].style.cursor = 'default';
});