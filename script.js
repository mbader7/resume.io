// Main JavaScript for CV Website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', function() {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });

    // Scroll animations
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in-left, .slide-in-right');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Initially set width to 0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Create observer for skill bars
    const skillOptions = {
        threshold: 0.5
    };
    
    const skillObserver = new IntersectionObserver(function(entries, skillObserver) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width') || entry.target.style.width;
                entry.target.style.width = '0';
                
                // Trigger reflow
                void entry.target.offsetWidth;
                
                // Set the actual width with transition
                entry.target.style.width = targetWidth;
                skillObserver.unobserve(entry.target);
            }
        });
    }, skillOptions);
    
    // Store original widths and set to 0
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
        skillObserver.observe(bar);
    });

    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name && name.value.trim() === '') {
                valid = false;
                name.classList.add('error');
            } else if (name) {
                name.classList.remove('error');
            }
            
            if (email && (email.value.trim() === '' || !isValidEmail(email.value))) {
                valid = false;
                email.classList.add('error');
            } else if (email) {
                email.classList.remove('error');
            }
            
            if (message && message.value.trim() === '') {
                valid = false;
                message.classList.add('error');
            } else if (message) {
                message.classList.remove('error');
            }
            
            if (valid) {
                // In a real application, you would send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Fix for section visibility - ensure all sections are properly displayed
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'block';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
        section.style.overflow = 'visible';
        section.style.height = 'auto';
        section.style.minHeight = 'auto';
    });

    // Force redraw of all elements
    document.body.style.display = 'none';
    void document.body.offsetHeight; // Trigger reflow
    document.body.style.display = 'block';
});
