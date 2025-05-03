// Add this to your existing JavaScript file or create a new one

document.addEventListener('DOMContentLoaded', function() {
    // Scroll Reveal for About Section Elements
    const aboutSection = document.querySelector('.about');
    const aboutElements = aboutSection.querySelectorAll('.section-header, .about-image-container, .about-info, .about-stats, .personal-info, .cv-button');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to reveal elements when scrolled into view
    function revealOnScroll() {
        aboutElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // Apply specific animation based on element type
                if (element.classList.contains('section-header')) {
                    element.style.animation = 'fadeInUp 0.8s forwards';
                } else if (element.classList.contains('about-image-container')) {
                    element.style.animation = 'fadeInLeft 0.8s forwards';
                } else if (element.classList.contains('about-info')) {
                    element.style.animation = 'fadeInRight 0.8s forwards';
                } else {
                    element.style.animation = 'fadeInUp 0.8s forwards';
                }
            }
        });
    }
    
    // Stats Counter Animation
    const statValues = document.querySelectorAll('.stat-value');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000; // 2 seconds
        const step = target / duration * 20; // Update every 20ms
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toString() + (element.textContent.includes('%') ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toString() + (element.textContent.includes('%') ? '%' : '+');
            }
        }, 20);
    }
    
    // Function to start counter animation when stats are in viewport
    function startCounterOnScroll() {
        const statsSection = document.querySelector('.about-stats');
        if (isInViewport(statsSection) && !statsSection.classList.contains('counted')) {
            statsSection.classList.add('counted');
            statValues.forEach(value => {
                // Store original text before starting animation
                const originalText = value.textContent;
                // Remove any non-digit characters for the animation
                value.textContent = originalText.replace(/\D/g, '');
                animateCounter(value);
            });
        }
    }
    
    // Parallax effect for background shapes
    function parallaxEffect() {
        const shapes = document.querySelectorAll('.about-shape');
        
        window.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            shapes.forEach(shape => {
                const shiftValue = parseFloat(window.getComputedStyle(shape).width) / 50;
                shape.style.transform = `translate(${mouseX * shiftValue}px, ${mouseY * shiftValue}px)`;
            });
        });
    }
    
    // Image hover effect
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        const imageFrame = document.querySelector('.about-image-frame');
        
        imageFrame.addEventListener('mouseenter', function() {
            profileImg.style.transform = 'scale(1.05)';
        });
        
        imageFrame.addEventListener('mouseleave', function() {
            profileImg.style.transform = 'scale(1)';
        });
    }
    
    // Add smooth scrolling for cv button if it links to another section
    const cvButton = document.querySelector('.cv-button');
    if (cvButton && cvButton.getAttribute('href').startsWith('#')) {
        cvButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Run functions on scroll
    window.addEventListener('scroll', function() {
        revealOnScroll();
        startCounterOnScroll();
    });
    
    // Initial check for elements in viewport on page load
    revealOnScroll();
    startCounterOnScroll();
    parallaxEffect();
});