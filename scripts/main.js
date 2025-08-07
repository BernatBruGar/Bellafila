document.addEventListener('DOMContentLoaded', function() {
    loadMenuItems();
    loadGalleryImages();
    setupReservationForm();
    setupSmoothScrolling();
    setupHamburgerMenu();
});

// Función para cargar platos del menú
function loadMenuItems() {
    const menuGrid = document.getElementById('menuGrid');
    const menuItems = [];
    
    // Generar items del menú con las imágenes disponibles
    for (let i = 1; i <= 41; i++) {
        menuItems.push({
            id: i,
            name: `Plato Especial ${i}`,
            description: 'Deliciosa preparación con ingredientes frescos y técnicas culinarias clásicas con un toque moderno.',
            image: `Img/Plat_${i}.jpg`
        });
    }
    
    // Mostrar solo los primeros 12 platos
    menuItems.slice(0, 12).forEach(item => {
        const menuItemElement = createMenuItemElement(item);
        menuGrid.appendChild(menuItemElement);
    });
}

function createMenuItemElement(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    
    menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
    `;
    
    return menuItem;
}

// Sistema de traducciones para 4 idiomas
const translations = {
    es: {
        nav: {
            inicio: 'Inicio',
            menu: 'Menú',
            galeria: 'Galería',
            reservas: 'Reservas',
            contacto: 'Contacto'
        },
        hero: {
            title: 'Bellafila',
            subtitle: 'Experiencia culinaria clásica con un toque moderno',
            reserve: 'Reservar Mesa',
            menu: 'Ver Menú'
        },
        gallery: {
            title: 'Galería'
        },
        reservations: {
            title: 'Realizar Reserva',
            name: 'Nombre completo',
            email: 'Email',
            phone: 'Teléfono',
            people: 'Personas',
            people1: '1 persona',
            people2: '2 personas',
            people3: '3 personas',
            people4: '4 personas',
            people5: '5 personas',
            people6: '6+ personas',
            comments: 'Comentarios especiales (opcional)',
            submit: 'Confirmar Reserva',
            success: '¡Reserva confirmada! Te contactaremos pronto.',
            error: 'Error al procesar la reserva. Inténtalo de nuevo.',
            networkError: 'Error de conexión. Inténtalo más tarde.'
        },
        footer: {
            contact: 'Contacto',
            address: '📍 Dirección del Restaurante',
            phone: '📞 +34 XXX XXX XXX',
            email: '✉️ info@bellafila.com',
            hours: 'Horarios',
            weekdays: 'Lunes - Viernes: 12:00 - 23:00',
            saturday: 'Sábados: 12:00 - 24:00',
            sunday: 'Domingos: 12:00 - 22:00'
        }
    },
    ca: {
        nav: {
            inicio: 'Inici',
            menu: 'Menú',
            galeria: 'Galeria',
            reservas: 'Reserves',
            contacto: 'Contacte'
        },
        hero: {
            title: 'Bellafila',
            subtitle: 'Experiència culinària clàssica amb un toc modern',
            reserve: 'Reservar Taula',
            menu: 'Veure Menú'
        },
        gallery: {
            title: 'Galeria'
        },
        reservations: {
            title: 'Fer Reserva',
            name: 'Nom complet',
            email: 'Email',
            phone: 'Telèfon',
            people: 'Persones',
            people1: '1 persona',
            people2: '2 persones',
            people3: '3 persones',
            people4: '4 persones',
            people5: '5 persones',
            people6: '6+ persones',
            comments: 'Comentaris especials (opcional)',
            submit: 'Confirmar Reserva',
            success: 'Reserva confirmada! Et contactarem aviat.',
            error: 'Error al processar la reserva. Torna-ho a intentar.',
            networkError: 'Error de connexió. Intenta-ho més tard.'
        },
        footer: {
            contact: 'Contacte',
            address: '📍 Adreça del Restaurant',
            phone: '📞 +34 XXX XXX XXX',
            email: '✉️ info@bellafila.com',
            hours: 'Horaris',
            weekdays: 'Dilluns - Divendres: 12:00 - 23:00',
            saturday: 'Dissabtes: 12:00 - 24:00',
            sunday: 'Diumenges: 12:00 - 22:00'
        }
    },
    en: {
        nav: {
            inicio: 'Home',
            menu: 'Menu',
            galeria: 'Gallery',
            reservas: 'Reservations',
            contacto: 'Contact'
        },
        hero: {
            title: 'Bellafila',
            subtitle: 'Classic culinary experience with a modern touch',
            reserve: 'Book Table',
            menu: 'View Menu'
        },
        gallery: {
            title: 'Gallery'
        },
        reservations: {
            title: 'Make Reservation',
            name: 'Full name',
            email: 'Email',
            phone: 'Phone',
            people: 'People',
            people1: '1 person',
            people2: '2 people',
            people3: '3 people',
            people4: '4 people',
            people5: '5 people',
            people6: '6+ people',
            comments: 'Special comments (optional)',
            submit: 'Confirm Reservation',
            success: 'Reservation confirmed! We will contact you soon.',
            error: 'Error processing reservation. Please try again.',
            networkError: 'Connection error. Please try again later.'
        },
        footer: {
            contact: 'Contact',
            address: '📍 Restaurant Address',
            phone: '📞 +34 XXX XXX XXX',
            email: '✉️ info@bellafila.com',
            hours: 'Hours',
            weekdays: 'Monday - Friday: 12:00 - 23:00',
            saturday: 'Saturday: 12:00 - 24:00',
            sunday: 'Sunday: 12:00 - 22:00'
        }
    },
    fr: {
        nav: {
            inicio: 'Accueil',
            menu: 'Menu',
            galeria: 'Galerie',
            reservas: 'Réservations',
            contacto: 'Contact'
        },
        hero: {
            title: 'Bellafila',
            subtitle: 'Expérience culinaire classique avec une touche moderne',
            reserve: 'Réserver Table',
            menu: 'Voir Menu'
        },
        gallery: {
            title: 'Galerie'
        },
        reservations: {
            title: 'Faire Réservation',
            name: 'Nom complet',
            email: 'Email',
            phone: 'Téléphone',
            people: 'Personnes',
            people1: '1 personne',
            people2: '2 personnes',
            people3: '3 personnes',
            people4: '4 personnes',
            people5: '5 personnes',
            people6: '6+ personnes',
            comments: 'Commentaires spéciaux (optionnel)',
            submit: 'Confirmer Réservation',
            success: 'Réservation confirmée! Nous vous contactons bientôt.',
            error: 'Erreur lors du traitement. Veuillez réessayer.',
            networkError: 'Erreur de connexion. Réessayez plus tard.'
        },
        footer: {
            contact: 'Contact',
            address: '📍 Adresse du Restaurant',
            phone: '📞 +34 XXX XXX XXX',
            email: '✉️ info@bellafila.com',
            hours: 'Horaires',
            weekdays: 'Lundi - Vendredi: 12:00 - 23:00',
            saturday: 'Samedi: 12:00 - 24:00',
            sunday: 'Dimanche: 12:00 - 22:00'
        }
    }
};

let currentLanguage = 'es';

document.addEventListener('DOMContentLoaded', function() {
    setupLanguageSelector();
    loadGalleryImages();
    setupReservationForm();
    setupSmoothScrolling();
    setupHamburgerMenu();
    updateLanguage();
});

// Configurar selector de idioma
function setupLanguageSelector() {
    // Solo agregar si no existe ya
    if (document.querySelector('.language-selector')) return;
    
    const navbar = document.querySelector('.nav-container');
    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    languageSelector.innerHTML = `
        <select id="languageSelect" onchange="changeLanguage(this.value)">
            <option value="es">🇪🇸 ES</option>
            <option value="ca">🏴 CA</option>
            <option value="en">🇬🇧 EN</option>
            <option value="fr">🇫🇷 FR</option>
        </select>
    `;
    navbar.appendChild(languageSelector);
}

// Cambiar idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    
    // Recargar galería si existe
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        loadGalleryImages();
    }
}

// Actualizar textos según idioma
function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Actualizar elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(t, key);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Actualizar placeholders
    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        const translation = getNestedTranslation(t, key);
        if (translation) {
            element.placeholder = translation;
        }
    });
    
    // Actualizar select de personas
    const personasSelect = document.getElementById('personas');
    if (personasSelect) {
        personasSelect.innerHTML = `
            <option value="">${t.reservations.people}</option>
            <option value="1">${t.reservations.people1}</option>
            <option value="2">${t.reservations.people2}</option>
            <option value="3">${t.reservations.people3}</option>
            <option value="4">${t.reservations.people4}</option>
            <option value="5">${t.reservations.people5}</option>
            <option value="6">${t.reservations.people6}</option>
        `;
    }
    
    // Actualizar selector de idioma
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
}

// Función auxiliar para obtener traducciones anidadas
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Función para cargar imágenes de la galería
function loadGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const t = translations[currentLanguage];
    
    for (let i = 1; i <= 21; i++) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <img src="Img/Rest_${i}.jpg" alt="${t.gallery.title} - ${i}" loading="lazy">
        `;
        
        galleryGrid.appendChild(galleryItem);
    }
}

// Configurar formulario de reservas
function setupReservationForm() {
    const form = document.getElementById('reservationForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const t = translations[currentLanguage];
        
        const formData = new FormData(form);
        const reservationData = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            fecha: formData.get('fecha'),
            hora: formData.get('hora'),
            personas: formData.get('personas'),
            comentarios: formData.get('comentarios')
        };
        
        try {
            const response = await fetch('/api/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData)
            });
            
            if (response.ok) {
                alert(t.reservations.success);
                form.reset();
            } else {
                alert(t.reservations.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(t.reservations.networkError);
        }
    });
    
    // Establecer fecha mínima como hoy
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const today = new Date().toISOString().split('T')[0];
        fechaInput.min = today;
    }
}

// Configurar menú hamburguesa
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) {
        console.log('Hamburger o navMenu no encontrados');
        return;
    }
    
    // Limpiar event listeners previos
    hamburger.replaceWith(hamburger.cloneNode(true));
    const newHamburger = document.getElementById('hamburger');
    
    newHamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked');
        
        newHamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            newHamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (!newHamburger.contains(e.target) && !navMenu.contains(e.target)) {
            newHamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Función para scroll suave
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si es un enlace a otra página, no prevenir el comportamiento por defecto
            if (href.includes('.html')) {
                return;
            }
            
            // Solo para enlaces de ancla en la misma página
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Función auxiliar para scroll a sección específica
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
