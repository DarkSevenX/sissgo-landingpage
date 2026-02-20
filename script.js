document.getElementById('year').textContent = new Date().getFullYear();

(function() {
  emailjs.init("FDGyqbqYUXgGs5bhV");
})();

const contactForm = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    statusDiv.style.display = 'block';
    statusDiv.style.color = 'var(--text)';
    statusDiv.textContent = 'Procesando envío...';

    // Capturar la hora actual para el parámetro {{time}}
    const now = new Date();
    const timeString = now.toLocaleString('es-CO', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });

     const templateParams = {
       name: this.name.value,
       email: this.email.value,
       ips: this.ips.value,
       message: this.message.value,
       time: timeString
     };

     emailjs.send('service_tvux3v2', 'template_3o8dhkc', templateParams)
      .then(function() {
        statusDiv.style.color = 'var(--green)';
        statusDiv.textContent = '¡Mensaje enviado con éxito! Nos contactaremos pronto.';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Solicitud';
        setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
      }, function(error) {
        statusDiv.style.color = '#e74c3c';
        statusDiv.textContent = 'Error al enviar el mensaje. Por favor, intenta de nuevo.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Solicitud';
        console.log('FAILED...', error);
      });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const speed = 3500; 
      const increment = target / (speed / 16); 
      
      let current = 0;
      
      const updateCount = () => {
        current += increment;
        
        if (current < target) {
          counter.innerHTML = `${prefix}${Math.ceil(current)}${suffix}`;
          requestAnimationFrame(updateCount);
        } else {
          counter.innerHTML = `${prefix}${target}${suffix}`;
        }
      };
      
      setTimeout(() => {
        updateCount();
      }, 500);
      
      counterObserver.unobserve(counter);
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.counter').forEach(counter => {
  counterObserver.observe(counter);
});

// Header Hide on Scroll
let lastScrollTop = 0;
const header = document.querySelector('header');
const delta = 5;

if (header) {
  window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    
    // Ignorar scroll elástico negativo (iOS)
    if (currentScroll < 0) return;

    if (Math.abs(lastScrollTop - currentScroll) <= delta) return;

    if (currentScroll > lastScrollTop && currentScroll > header.offsetHeight) {
      // Scroll Down
      header.classList.add('hidden');
    } else {
      // Scroll Up
      header.classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll;
  });
}

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Cambiar icono de hamburguesa a X
    const icon = menuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('bi-list');
      icon.classList.add('bi-x-lg');
    } else {
      icon.classList.remove('bi-x-lg');
      icon.classList.add('bi-list');
    }
  });

  // Cerrar menú al hacer click en un enlace
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      icon.classList.remove('bi-x-lg');
      icon.classList.add('bi-list');
    });
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      icon.classList.remove('bi-x-lg');
      icon.classList.add('bi-list');
    }
  });
}
