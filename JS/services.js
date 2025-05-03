// Add this to your existing JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Scroll Reveal for Services Section Elements
    const servicesSection = document.querySelector('.services');
    const serviceItems = servicesSection.querySelectorAll('.service-item');
    const serviceHeader = servicesSection.querySelector('.section-header');
    const servicesCta = servicesSection.querySelector('.services-cta');
    
    // Function to check if element is in viewport (reuse from your existing code)
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to reveal services elements when scrolled into view
    function revealServicesOnScroll() {
        // Animate section header
        if (serviceHeader && isInViewport(serviceHeader) && !serviceHeader.classList.contains('animated')) {
            serviceHeader.classList.add('animated');
            serviceHeader.style.animation = 'fadeInUp 0.8s forwards';
        }
        
        // Animate service items one by one with delay
        serviceItems.forEach((item, index) => {
            if (isInViewport(item) && !item.classList.contains('animated')) {
                item.classList.add('animated');
                item.style.animationDelay = `${index * 0.1}s`;
            }
        });
        
        // Animate CTA button
        if (servicesCta && isInViewport(servicesCta) && !servicesCta.classList.contains('animated')) {
            servicesCta.classList.add('animated');
            servicesCta.style.animation = 'fadeInUp 0.8s forwards';
            servicesCta.style.animationDelay = '0.3s';
        }
    }
    
    // Parallax effect for services background shapes
    function servicesParallaxEffect() {
        const shapes = document.querySelectorAll('.services-shape');
        
        window.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            shapes.forEach(shape => {
                const shiftValue = parseFloat(window.getComputedStyle(shape).width) / 50;
                shape.style.transform = `translate(${mouseX * shiftValue}px, ${mouseY * shiftValue}px)`;
            });
        });
    }
    
    // Service icon hover animation
    serviceItems.forEach(item => {
        const icon = item.querySelector('.service-icon');
        
        item.addEventListener('mouseenter', function() {
            icon.style.transform = 'rotateY(180deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            icon.style.transform = 'rotateY(0)';
        });
    });
    
    // Add smooth scrolling for service button if it links to another section
    const serviceButton = document.querySelector('.service-button');
    if (serviceButton && serviceButton.getAttribute('href').startsWith('#')) {
        serviceButton.addEventListener('click', function(e) {
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
        revealServicesOnScroll();
    });
    
    // Initial check for elements in viewport on page load
    revealServicesOnScroll();
    servicesParallaxEffect();
});