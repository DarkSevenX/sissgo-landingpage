document.getElementById('year').textContent = new Date().getFullYear();

// EmailJS Initialization
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

    // Parámetros adicionales para EmailJS
     const templateParams = {
       name: this.name.value,
       email: this.email.value,
       ips: this.ips.value,
       message: this.message.value,
       time: timeString
     };

    // Reemplaza 'TU_SERVICE_ID' y 'TU_TEMPLATE_ID' con tus IDs de EmailJS
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

// Navbar Scroll Logic
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    header.classList.add('nav-hidden');
  } else {
    // Scrolling up
    header.classList.remove('nav-hidden');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}, { passive: true });

// Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      // Aumentamos la duración a 3500ms (3.5 segundos) para que sea más lento
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
      
      // Añadimos un pequeño delay de 500ms antes de empezar a contar
      // para asegurar que el elemento ya es visible
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
