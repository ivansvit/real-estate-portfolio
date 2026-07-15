import { initForm } from '@formspree/ajax';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Formspree
  initForm({ formElement: '#contactForm', formId: 'xkodgyyk' });
  // --- Mobile Menu Toggle ---
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  // --- Lightbox Functionality ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightboxBtn = document.getElementById('closeLightbox');
  const galleryItems = document.querySelectorAll('.grid-item');

  if (lightbox && lightboxImg && closeLightboxBtn && galleryItems) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightbox.style.display = 'flex';
          // Use a tiny timeout to allow display:flex to apply before setting opacity for transition
          setTimeout(() => {
            lightbox.classList.add('show');
          }, 10);
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('show');
      setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
      }, 300);
    };

    closeLightboxBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Escape key to close lightbox
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });
  }

});
