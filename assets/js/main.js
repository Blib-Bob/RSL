document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active');
      
      // Transform hamburger into an X
      const spans = menuToggle.querySelectorAll('span');
      if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Header Scroll State
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Set Active Navigation Link
  const currentPath = window.location.pathname;
  const navAnchors = document.querySelectorAll('.nav-links a');
  navAnchors.forEach(anchor => {
    const anchorPath = anchor.getAttribute('href');
    if (currentPath.endsWith(anchorPath) || (currentPath === '/' && anchorPath === 'index.html')) {
      anchor.classList.add('active');
    }
  });

  // Intersection Observer for Reveal Scroll Animations
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once it animates in, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Page Transition Controller (Notebook sliding sheet)
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  overlay.style.transform = 'translateX(0)';
  document.body.appendChild(overlay);

  // Trigger slide-away on load
  setTimeout(() => {
    overlay.style.transform = 'translateX(100%)';
  }, 100);

  // Intercept internal page navigations for slide-in animation
  document.body.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      // If it is a local page link and not a same-page hash or mailto/tel link
      if (href && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
        const isSamePageHash = href.startsWith('#');
        if (isSamePageHash) return;
        if (anchor.getAttribute('target') === '_blank') return;

        e.preventDefault();
        
        // Align covering sheet to the left of view, then slide across to cover screen
        overlay.style.transition = 'none';
        overlay.style.transform = 'translateX(-100%)';
        
        // Trigger reflow to apply instant translation reset
        overlay.offsetHeight;
        
        overlay.style.transition = 'transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)';
        overlay.style.transform = 'translateX(0)';
        
        setTimeout(() => {
          window.location.href = href;
        }, 650);
      }
    }
  });
});
