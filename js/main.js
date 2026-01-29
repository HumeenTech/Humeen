// Main JS for Humeen Website

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Toggle (Mobile) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animate hamburger icon
            const bars = menuToggle.querySelectorAll('.bar');
            // Basic toggle logic for generic hamburger animation if CSS supports it
            // or just rely on the class 'active' to style it in CSS (not fully implemented in CSS yet but hook is there)
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Stats Counter Animation ---
    const statsSection = document.getElementById('stats');
    const stats = document.querySelectorAll('.stat-number');
    let counted = false;

    function startCount(el) {
        let target = parseInt(el.getAttribute('data-count'));
        let count = 0;
        let speed = 2000 / target; // Adjust duration
        
        let counter = setInterval(() => {
            count++;
            el.innerText = count;
            if (count >= target) {
                clearInterval(counter);
            }
        }, speed);
    }

    // Intersection Observer for Stats
    if (statsSection) {
        let statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    stats.forEach(stat => startCount(stat));
                    counted = true;
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }


    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.service-card, .about-content, .period, .portfolio-item');
    
    // Add 'reveal' class to these elements initially via JS or HTML
    // For now, let's manually observe them to add an arbitrary class or 
    // rely on a specific class if added to HTML. 
    // Let's use a generic observer for elements we want to fade in.
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // active triggers CSS transition
                // entry.target.classList.add('reveal'); // Ensure reveal base class is present if not
            }
        });
    }, { threshold: 0.1 });

    // Identify elements to animate that might not have the class yet, 
    // or just rely on CSS transitions for hover effects.
    // For scroll reveal (fade-in-up), let's target sections or cards.
    const scrollRevealElements = document.querySelectorAll('.service-card, .portfolio-item, .info-item, .section-title');
    
    scrollRevealElements.forEach((el) => {
        el.classList.add('reveal');
        observer.observe(el);
    });

});
