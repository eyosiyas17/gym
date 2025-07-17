document.addEventListener('DOMContentLoaded', function() {
  // ==================== HERO SECTION ANIMATIONS ====================
  const heroImage = document.querySelector('.hero-bg-image');
  if (heroImage) {
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      heroImage.style.transform = `scale(${1 + scrollPosition * 0.0005})`;
    });

    // Click-to-pause animation
    heroImage.addEventListener('click', function() {
      this.style.animationPlayState = 
        this.style.animationPlayState === 'paused' ? 'running' : 'paused';
    });
  }

  // ==================== SMOOTH SCROLLING ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // ==================== TESTIMONIALS CAROUSEL ====================
  const testimonials = document.querySelectorAll('.testimonial-card');
  if (testimonials.length > 0) {
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
      testimonials.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
      });
    }

    // Auto-rotate testimonials on mobile
    if (window.innerWidth <= 400) {
      showTestimonial(0);
      setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      }, 5000);
    }
  }

  // ==================== MOBILE MENU TOGGLE ====================
  const menuToggle = document.createElement('button');
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  menuToggle.className = 'mobile-menu-toggle';
  document.body.appendChild(menuToggle);

  menuToggle.addEventListener('click', function() {
    const nav = document.querySelector('nav') || document.querySelector('.nav');
    if (nav) {
      nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    }
  });

  // ==================== SERVICE SECTION INTERACTIONS ====================
  const features = document.querySelectorAll('.feature');
  features.forEach(feature => {
    feature.addEventListener('mouseenter', function() {
      if (window.innerWidth > 768) {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 15px rgba(255,56,62,0.3)';
      }
    });
    
    feature.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  // ==================== BUTTON INTERACTIONS ====================
  const buttons = document.querySelectorAll('.about-button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      this.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ==================== RESPONSIVE ADJUSTMENTS ====================
  function handleResponsiveChanges() {
    // Adjust trainers section for mobile
    const trainersImage = document.querySelector('.trainers-image');
    if (trainersImage && window.innerWidth <= 400) {
      trainersImage.style.clipPath = 'none';
      trainersImage.style.height = '280px';
    }

    // Adjust font sizes for ultra-mobile
    if (window.innerWidth <= 350) {
      document.querySelectorAll('.section-title').forEach(title => {
        title.style.fontSize = '1.8rem';
      });
    }
  }

  // Initial call and window resize listener
  handleResponsiveChanges();
  window.addEventListener('resize', handleResponsiveChanges);

  // ==================== ANIMATION HELPERS ====================
  // Add CSS for dynamic elements
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.7);
      transform: scale(0);
      animation: ripple 600ms linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .mobile-menu-toggle {
      display: none;
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      background: var(--primary-red);
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      font-size: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: block;
      }
    }
  `;
  document.head.appendChild(style);
});

