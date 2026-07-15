document.addEventListener('DOMContentLoaded', () => {
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

  // --- Gallery Expand Toggle ---
  const categoryTitles = document.querySelectorAll('.category-title');
  categoryTitles.forEach(title => {
    title.addEventListener('click', () => {
      // Toggle class on the title itself (for icon rotation)
      title.classList.toggle('expanded');
      
      // Find the sibling gallery
      const gallery = title.nextElementSibling;
      if (gallery && gallery.classList.contains('scroll-gallery')) {
        gallery.classList.toggle('expanded');
      }
    });
  });

  // --- Form Submission Handling ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // Hide messages
      const successMsg = document.querySelector('[data-fs-success]');
      const errorMsg = document.querySelector('.form-error');
      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';
      
      try {
        const response = await fetch('https://formspree.io/f/xkodgyyk', {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          if (successMsg) successMsg.style.display = 'block';
          contactForm.reset();
        } else {
          const data = await response.json();
          if (data && data.errors && errorMsg) {
            errorMsg.textContent = data.errors.map(error => error.message).join(', ');
            errorMsg.style.display = 'block';
          } else if (errorMsg) {
            errorMsg.textContent = 'Oops! There was a problem submitting your form';
            errorMsg.style.display = 'block';
          }
        }
      } catch (error) {
        if (errorMsg) {
          errorMsg.textContent = 'Oops! There was a problem submitting your form';
          errorMsg.style.display = 'block';
        }
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    });
  }
});
