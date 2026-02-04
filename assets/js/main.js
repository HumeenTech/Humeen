// Main JS for Humeen Website

// Function to reset cookies and storage for fresh session every time
function resetSessionState() {
    console.log("Resetting session state...");
    sessionStorage.clear();
    localStorage.clear();
    document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

// Reset immediately
resetSessionState();

document.addEventListener('DOMContentLoaded', () => {

    // --- FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            console.log('FAQ clicked');
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            // Close other items (optional - accordion style)
            const otherItems = document.querySelectorAll('.faq-item');
            otherItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                    other.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                const height = answer.scrollHeight;
                console.log('Opening item. ScrollHeight:', height);
                answer.style.maxHeight = height + "px";
            } else {
                console.log('Closing item');
                answer.style.maxHeight = null;
            }
        });
    });

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

    // --- Mobile Mega Menu Toggle ---
    const megaMenuLink = document.querySelector('.has-mega-menu > a');
    if (megaMenuLink) {
        megaMenuLink.addEventListener('click', (e) => {
            // Only toggle on mobile or if we want click behavior everywhere
            // Checking window width matches CSS breakpoint
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parentLi = megaMenuLink.parentElement;
                parentLi.classList.toggle('mega-active');
            }
        });
    }

    // --- Active Navigation Link ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#navbar a');

    // --- Page Transitions (Nav Slide Down) ---
    setTimeout(() => {
        const header = document.querySelector('header');
        if (header) header.classList.add('nav-loaded');
    }, 100);

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Handle explicit paths or relative paths by checking if the filename matches
        if (linkPage.endsWith(currentPage) || (currentPage === 'index.html' && (linkPage === '#' || linkPage === './'))) {
            link.classList.add('active');
        } else if (currentPage === '' && linkPage.endsWith('index.html')) {
            link.classList.add('active');
        }
    });

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

    // --- Service Page Filtering ---
    function filterServices() {
        // Only run on services page
        if (!window.location.pathname.includes('services.html')) return;

        const hash = window.location.hash.substring(1); // Remove '#'
        const sections = document.querySelectorAll('.service-detail-section');

        if (hash) {
            // If hash exists, show matching section, hide others
            sections.forEach(section => {
                if (section.id === hash) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });

            // Scroll to top to ensure visibility if the page was already scrolled down
            window.scrollTo(0, 0);

        } else {
            // If no hash, show all
            sections.forEach(section => {
                section.classList.remove('hidden');
            });
        }
    }

    // Run on load
    filterServices();

    // --- Sticky Horizontal Scroll Logic ---
    const horizontalContainer = document.querySelector('.horizontal-scroll-container');
    const stickySection = document.getElementById('growth-marketing');
    const grid = document.querySelector('.growth-grid');

    if (horizontalContainer && stickySection && grid) {
        window.addEventListener('scroll', () => {
            const containerTop = horizontalContainer.offsetTop;
            const containerHeight = horizontalContainer.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollPos = window.scrollY;

            // Calculate progress (0 to 1) of the scroll within the container
            // The scroll starts when the container reaches the top of the viewport
            // and ends and when the container is scrolled past.
            const start = containerTop;
            const end = containerTop + containerHeight - viewportHeight;

            if (scrollPos >= start && scrollPos <= end) {
                const progress = (scrollPos - start) / (containerHeight - viewportHeight);
                const maxTranslate = grid.scrollWidth - grid.offsetWidth;
                const translateX = progress * maxTranslate;
                grid.style.transform = `translateX(-${translateX}px)`;
            } else if (scrollPos < start) {
                grid.style.transform = `translateX(0px)`;
            } else if (scrollPos > end) {
                const maxTranslate = grid.scrollWidth - grid.offsetWidth;
                grid.style.transform = `translateX(-${maxTranslate}px)`;
            }
        });

        // Handle Resize to ensure math stays correct
        window.addEventListener('resize', () => {
            // Force a scroll event to update position
            window.dispatchEvent(new Event('scroll'));
        });

        // --- Card Toggle Logic ---
        const toggleIcons = document.querySelectorAll('.toggle-card');
        const cards = document.querySelectorAll('.growth-card');

        toggleIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                const card = icon.closest('.growth-card');
                const isAlreadyExpanded = card.classList.contains('expanded');

                // Close other cards
                cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                    }
                });

                // Toggle current card
                card.classList.toggle('expanded');

                // Refresh scroll math if card dimensions change (though height is now fixed)
                window.dispatchEvent(new Event('scroll'));
            });
        });
    }
});

// --- Lead Generation Modal Logic ---
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('leadGenModal');
    const closeBtn = document.querySelector('.close-modal');
    // Target the "Who We Are" section (ID: about)
    const targetSection = document.getElementById('about');

    if (modal && targetSection) {
        // Intersection Observer to detect when "Who We Are" comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Check if modal has already been shown this session
                    if (!sessionStorage.getItem('humeen_modal_shown')) {
                        modal.style.display = 'flex';
                        sessionStorage.setItem('humeen_modal_shown', 'true');
                    }
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of the section is visible
        });

        observer.observe(targetSection);

        // Close Modal Logic
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

/* --- Business Solutions Tabs --- */
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.biz-tab');
    const panels = document.querySelectorAll('.biz-panel');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-tab');

                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Hide all panels
                panels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.style.display = 'none'; // Force hide for animation reset
                });

                // Show target panel
                const targetPanel = document.getElementById(`${targetId}-panel`);
                if (targetPanel) {
                    targetPanel.style.display = 'block';
                    // Small delay to allow display:block to apply before opacity transition
                    setTimeout(() => {
                        targetPanel.classList.add('active');
                    }, 10);
                }
            });
        });
    }
});

