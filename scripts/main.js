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
        },
        menu: {
            title: 'Nuestro Menú',
            viewComplete: 'Ver Menú Completo',
            appetizers: {
                title: 'Para Picar',
                item1: { name: 'Croqueta de gamba' },
                item2: { name: 'Snack de oreja de cerdo' },
                item3: { name: 'Anchoa del Cantábrico con aceite de oliva' },
                item4: { name: 'Ostra con cereza' },
                item5: { name: 'Anguila ahumada con manzana escalivada y col' },
                item6: { name: 'Sobrasada de Xesc Reina' },
                item7: { name: 'Jamón ibérico 100% de bellota cortado a mano' }
            },
            starters: {
                title: 'Entrantes',
                item1: { name: 'Ensalada Bellafila' },
                item2: { name: 'Lengua de ternera en escabeche' },
                item3: { name: 'Steak tartare' },
                item4: { name: 'Cazuelita de garbanzos con almejas' },
                item5: { name: 'Tortilla de setas de temporada' }
            },
            specials: {
                title: 'Lo que no te puedes perder',
                item1: { name: 'Sardinas marinadas con uvas' },
                item2: { name: 'Costillitas de conejo al ron' },
                item3: { name: 'Canalón trufado de pato' }
            },
            fish: {
                title: 'Pescado',
                item1: { name: 'Morro de bacalao confitado de invierno' },
                item2: { name: 'Calamares rellenos' }
            }
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
        },
        menu: {
            title: 'El Nostre Menú',
            viewComplete: 'Veure Menú Complet',
            appetizers: {
                title: 'Per Picar',
                item1: { name: 'Croqueta de gamba' },
                item2: { name: 'Snack d\'orella de porc' },
                item3: { name: 'Anxova del Cantàbric amb oli d\'oliva' },
                item4: { name: 'Ostra amb cirera' },
                item5: { name: 'Anguila fumada amb poma escalibada i col' },
                item6: { name: 'Sobrassada d\'en Xesc Reina' },
                item7: { name: 'Pernil ibèric 100% de aglà tallat a mà' }
            },
            starters: {
                title: 'Entrants',
                item1: { name: 'Amanida Bellafila' },
                item2: { name: 'Llengua de vedella en escabetx' },
                item3: { name: 'Steak tartare' },
                item4: { name: 'Olleta de cigrons amb cloïsses' },
                item5: { name: 'Truita de bolets de temporada' }
            },
            specials: {
                title: 'El que no et pots perdre',
                item1: { name: 'Sardines marinades amb raïm' },
                item2: { name: 'Costelletes de conill al rom' },
                item3: { name: 'Canaló trufat d\'ànec' }
            },
            fish: {
                title: 'Peix',
                item1: { name: 'Morro de bacallà confitat d\'hivern' },
                item2: { name: 'Calamars farcits' }
            }
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
        },
        menu: {
            title: 'Our Menu',
            viewComplete: 'View Complete Menu',
            appetizers: {
                title: 'To Share',
                item1: { name: 'Shrimp croquette' },
                item2: { name: 'Pork ear snack' },
                item3: { name: 'Cantabrian anchovy with olive oil' },
                item4: { name: 'Oyster with cherry' },
                item5: { name: 'Smoked eel with roasted apple and cabbage' },
                item6: { name: 'Xesc Reina sobrasada' },
                item7: { name: '100% acorn-fed Iberian ham hand-cut' }
            },
            starters: {
                title: 'Starters',
                item1: { name: 'Bellafila salad' },
                item2: { name: 'Beef tongue in marinade' },
                item3: { name: 'Steak tartare' },
                item4: { name: 'Small pot of chickpeas with clams' },
                item5: { name: 'Seasonal mushroom omelet' }
            },
            specials: {
                title: 'Must Try',
                item1: { name: 'Marinated sardines with grapes' },
                item2: { name: 'Rabbit ribs with rum' },
                item3: { name: 'Truffle duck cannelloni' }
            },
            fish: {
                title: 'Fish',
                item1: { name: 'Winter confit cod cheek' },
                item2: { name: 'Stuffed squid' }
            }
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
        },
        menu: {
            title: 'Notre Menu',
            viewComplete: 'Voir Menu Complet',
            appetizers: {
                title: 'À Partager',
                item1: { name: 'Croquette de crevette' },
                item2: { name: 'Snack d\'oreille de porc' },
                item3: { name: 'Anchois du Cantabrique à l\'huile d\'olive' },
                item4: { name: 'Huître à la cerise' },
                item5: { name: 'Anguille fumée aux pommes rôties et chou' },
                item6: { name: 'Sobrasada de Xesc Reina' },
                item7: { name: 'Jambon ibérique 100% bellota coupé à la main' }
            },
            starters: {
                title: 'Entrées',
                item1: { name: 'Salade Bellafila' },
                item2: { name: 'Langue de veau en escabèche' },
                item3: { name: 'Steak tartare' },
                item4: { name: 'Petite casserole de pois chiches aux palourdes' },
                item5: { name: 'Omelette aux champignons de saison' }
            },
            specials: {
                title: 'À Ne Pas Manquer',
                item1: { name: 'Sardines marinées aux raisins' },
                item2: { name: 'Côtelettes de lapin au rhum' },
                item3: { name: 'Cannelloni de canard truffé' }
            },
            fish: {
                title: 'Poisson',
                item1: { name: 'Joue de morue confite d\'hiver' },
                item2: { name: 'Calamars farcis' }
            }
        }
    }
};

let currentLanguage = 'ca'; // Cambiar el idioma por defecto a Catalán

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
    if (document.querySelector('.language-dropdown')) return;
    
    const navbar = document.querySelector('.nav-container');
    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    languageSelector.innerHTML = `
        <div class="language-dropdown" id="languageDropdown">
            <div class="language-current" id="languageCurrent">CA</div>
            <div class="language-options" id="languageOptions">
                <button class="language-option selected" data-lang="ca">CA</button>
                <button class="language-option" data-lang="es">ES</button>
                <button class="language-option" data-lang="en">EN</button>
                <button class="language-option" data-lang="fr">FR</button>
            </div>
        </div>
    `;
    navbar.appendChild(languageSelector);
    
    setupCustomDropdown();
}

// Configurar dropdown personalizado
function setupCustomDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const current = document.getElementById('languageCurrent');
    const options = document.getElementById('languageOptions');
    
    if (!dropdown || !current || !options) return;
    
    // Toggle dropdown
    current.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    
    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Manejar selección de idioma
    options.addEventListener('click', function(e) {
        if (e.target.classList.contains('language-option')) {
            const selectedLang = e.target.getAttribute('data-lang');
            const selectedText = e.target.textContent;
            
            // Actualizar texto del botón actual
            current.textContent = selectedText;
            
            // Actualizar clases selected
            options.querySelectorAll('.language-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            e.target.classList.add('selected');
            
            // Cerrar dropdown
            dropdown.classList.remove('active');
            
            // Cambiar idioma
            changeLanguage(selectedLang);
        }
    });
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
