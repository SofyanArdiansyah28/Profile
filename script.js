// Enhanced Navigation JavaScript

document.addEventListener("DOMContentLoaded", function () {

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== MOBILE MENU FUNCTIONALITY =====
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            const isActive = mobileMenu.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');

            // Change button icon
            mobileMenuButton.textContent = isActive ? '✖' : '☰';

            // Add/remove body scroll lock (optional)
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });

        // Close menu when nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.textContent = '☰';
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileMenuButton.contains(e.target) &&
                !mobileMenu.contains(e.target) &&
                mobileMenu.classList.contains('active')) {

                mobileMenu.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.textContent = '☰';
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on window resize if screen becomes large
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.textContent = '☰';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ===== ACTIVE SECTION HIGHLIGHTING =====
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150; // Offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to corresponding nav link
                const activeNavLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }
            }
        });
    }

    // ===== SCROLL PROGRESS INDICATOR =====
    function updateScrollProgress() {
        const scrollIndicator = document.querySelector('.scroll-progress');

        if (scrollIndicator) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            scrollIndicator.style.width = scrollPercent + '%';
        }
    }

    // ===== NAVBAR BACKGROUND ON SCROLL =====
    function updateNavbarBackground() {
        const navbar = document.querySelector('header') || document.querySelector('nav');

        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    // ===== SCROLL EVENT LISTENERS =====
    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(function () {
                updateActiveSection();
                updateScrollProgress();
                updateNavbarBackground();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);

    // ===== INITIALIZE ON PAGE LOAD =====
    updateActiveSection();
    updateScrollProgress();
    updateNavbarBackground();

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function (e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.textContent = '☰';
            document.body.style.overflow = 'auto';
        }
    });

    // ===== INTERSECTION OBSERVER (Alternative method for section detection) =====
    // Uncomment this if you prefer using Intersection Observer API
    /*
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to corresponding nav link
                const activeNavLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
    */

    // ===== UTILITY FUNCTIONS =====

    // Function to manually set active section
    function setActiveSection(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const targetLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }

    // Function to scroll to section programmatically
    function scrollToSection(sectionId) {
        const target = document.querySelector(`#${sectionId}`);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Make functions globally available if needed
    window.navigationUtils = {
        setActiveSection,
        scrollToSection,
        updateActiveSection,
        updateScrollProgress
    };

    console.log('Navigation JavaScript loaded successfully!');
});

// ===== PAGE LOAD ANIMATION (Optional) =====
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Add a subtle fade-in effect
    const elements = document.querySelectorAll('.fade-in-on-load');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 100);
    });
});