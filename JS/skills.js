// skills.js - Animation and Interaction for Skills Section
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    // Function to animate skill bars
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const percentage = bar.style.getPropertyValue('--percentage') || '0%';
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = percentage;
            }, 100);
        });
    };
    
    // Animation Observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateSkillBars();
                }, 300);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe the Skills section
    const skillsSection = document.querySelector('.technical-skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    // Animation for tool items and soft skills
    const elementsToAnimate = document.querySelectorAll('.tool-item, .soft-skill-item');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation class with staggered delay
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each element to animate
    elementsToAnimate.forEach(element => {
        staggerObserver.observe(element);
    });
    
    // Animate skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    
    const tagObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation class with staggered delay
                setTimeout(() => {
                    entry.target.classList.add('tag-animate');
                }, index * 50);
                tagObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each skill tag
    skillTags.forEach(tag => {
        tagObserver.observe(tag);
    });
    
    // Add hover effect for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('skill-hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('skill-hover');
        });
    });
    
    // Add filter functionality for skills tags if needed
    const allTags = document.querySelectorAll('.skill-tag');
    allTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active-tag');
            // Additional filtering logic can be added here
        });
    });
    
    // Optional: Add scroll to section functionality
    const scrollToSkills = () => {
        const skillsElement = document.getElementById('skills');
        if (skillsElement) {
            skillsElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    // Find any link that should scroll to skills section and add event listener
    const skillsLinks = document.querySelectorAll('a[href="#skills"]');
    skillsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSkills();
        });
    });
});