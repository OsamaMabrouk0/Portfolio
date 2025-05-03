window.addEventListener('load', function () {
    const loaderContainer = document.querySelector('.loading-screen');

    loaderContainer.style.opacity = '0';

    loaderContainer.addEventListener('transitionend', () => {
        loaderContainer.style.display = 'none';

        document.body.classList.remove('loading');

        document.body.classList.add('loaded');
    });
});

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const mainHeader = document.getElementById('mainHeader');

const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('active');
    overlay.classList.toggle('active');

    if (mainNav.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

overlay.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

const menuItems = document.querySelectorAll('.main-nav a');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

window.addEventListener('scroll', () => {
    const hiddenContent = document.querySelector('.hidden-content');
    if (!hiddenContent) return;

    if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled');
        hiddenContent.style.opacity = '1';
        hiddenContent.style.pointerEvents = 'auto';
    } else {
        mainHeader.classList.remove('scrolled');
        hiddenContent.style.opacity = '0';
        hiddenContent.style.pointerEvents = 'none';
    }
});



const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 90) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



// -------------------------------| home |-------------------------------

// hero-animation.js
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = this.getRandomColor();
        }

        getRandomColor() {
            const colors = [
                'rgba(44, 110, 73, 0.7)',
                'rgba(221, 229, 182, 0.7)',
                'rgba(214, 220, 229, 0.7)'
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        const numberOfParticles = Math.min(window.innerWidth / 10, 100);
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = 'rgba(214, 220, 229,' + (1 - distance / 100) * 0.2 + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => { p.update(); p.draw(); });
        connect();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    document.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        particlesArray.forEach(p => {
            p.x += mouseX * 0.5;
            p.y += mouseY * 0.5;
        });

        document.querySelectorAll('.shape').forEach(shape => {
            const factor = parseFloat(window.getComputedStyle(shape).width) / 500;
            shape.style.transform = `translate(${mouseX * 20 * factor}px, ${mouseY * 20 * factor}px)`;
        });
    });

    const dynamicTextElement = document.querySelector('.dynamic-text');
    const professions = ['Developer', 'Designer', 'Creator', 'Innovator', 'Learner', 'Explorer', 'Problem Solver'];
    let professionIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

    function typeText() {
        const current = professions[professionIndex];
        if (isDeleting) {
            dynamicTextElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            dynamicTextElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            typingSpeed = 1500;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
            }
        });
    });

    init();
    animate();
    setTimeout(typeText, 1000);
});





// -------------------------------| about |-------------------------------

// Add this to your existing JavaScript file or create a new one

document.addEventListener('DOMContentLoaded', function () {
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

        window.addEventListener('mousemove', function (e) {
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

        imageFrame.addEventListener('mouseenter', function () {
            profileImg.style.transform = 'scale(1.05)';
        });

        imageFrame.addEventListener('mouseleave', function () {
            profileImg.style.transform = 'scale(1)';
        });
    }

    // Add smooth scrolling for cv button if it links to another section
    const cvButton = document.querySelector('.cv-button');
    if (cvButton && cvButton.getAttribute('href').startsWith('#')) {
        cvButton.addEventListener('click', function (e) {
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
    window.addEventListener('scroll', function () {
        revealOnScroll();
        startCounterOnScroll();
    });

    // Initial check for elements in viewport on page load
    revealOnScroll();
    startCounterOnScroll();
    parallaxEffect();
});

// -------------------------------| services |-------------------------------

// Add this to your existing JavaScript file

document.addEventListener('DOMContentLoaded', function () {
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

        window.addEventListener('mousemove', function (e) {
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

        item.addEventListener('mouseenter', function () {
            icon.style.transform = 'rotateY(180deg)';
        });

        item.addEventListener('mouseleave', function () {
            icon.style.transform = 'rotateY(0)';
        });
    });

    // Add smooth scrolling for service button if it links to another section
    const serviceButton = document.querySelector('.service-button');
    if (serviceButton && serviceButton.getAttribute('href').startsWith('#')) {
        serviceButton.addEventListener('click', function (e) {
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
    window.addEventListener('scroll', function () {
        revealServicesOnScroll();
    });

    // Initial check for elements in viewport on page load
    revealServicesOnScroll();
    servicesParallaxEffect();
});

// -------------------------------| projects |-------------------------------

// Projects Section JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const projects = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectModal = document.getElementById('projectModal');
    const modalBody = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');
    const viewMoreBtn = document.querySelector('.view-more-btn');

    // Additional projects data for "View More" button
    const additionalProjects = [
        // {
        //     img: '../assets/Images/DORAK-App.webp',
        //     title: 'Random Goal Keeper App',
        //     description: 'A productivity tool for organizing tasks and tracking progress with team collaboration features.',
        //     category: 'app',
        //     tech: ['Flutter', 'Dart'],
        //     github: 'https://github.com',
        //     demo: '#',
        //     isApp: true,
        //     downloadLink: 'https://example.com/download/app.apk'
        // },
        // -------------------------------| Example start |-------------------------------


        /*    // Example: إضافة مشروع جديد إلى مصفوفة المشاريع الإضافية
        // يمكنك نسخ هذا المثال وتخصيصه لإضافة المزيد من المشاريع
        
        // 1. أضف مشروع جديد إلى مصفوفة additionalProjects في ملف JavaScript
        const newProjectExample = {
            img: 'assets/Images/your-project-image.webp', // مسار الصورة
            title: 'عنوان المشروع الجديد',
            description: 'وصف مفصل للمشروع الجديد الخاص بك.',
            category: 'web', // الفئة: 'web' أو 'app' أو 'ui'
            tech: ['HTML5', 'CSS3', 'JavaScript'], // التقنيات المستخدمة كمصفوفة
            github: 'https://github.com/your-username/your-repo', // رابط GitHub للمشروع
            demo: 'https://example.com/your-demo', // رابط العرض التجريبي للمشروع
            isApp: false // اضبط على true إذا كان هذا تطبيقًا للجوال يحتاج زر تنزيل
        };
        
        // إذا كان المشروع تطبيقًا، يمكنك إضافة رابط التنزيل
        const newAppProjectExample = {
            img: 'assets/Images/your-app-image.webp',
            title: 'عنوان تطبيق الجوال الجديد',
            description: 'وصف مفصل لتطبيق الجوال الخاص بك.',
            category: 'app',
            tech: ['Flutter', 'Firebase', 'Dart'],
            github: 'https://github.com/your-username/your-app',
            isApp: true, // هذا مهم لتمييز أنه تطبيق
            downloadLink: 'https://example.com/download/your-app.apk' // رابط تنزيل التطبيق
        };
        
        
        // 2. ثم أضف هذا المشروع إلى مصفوفة additionalProjects الموجودة في ملف JavaScript
        // additionalProjects.push(newProjectExample);
        
        
        
        const additionalProjects = [
            {
                img: 'assets/Images/project-7.webp',
                title: 'Task Management App',
                description: 'A productivity tool for organizing tasks and tracking progress with team collaboration features.',
                category: 'app',
                tech: ['Vue.js', 'Express', 'PostgreSQL'],
                github: 'https://github.com',
                demo: '#',
                isApp: true, 
                downloadLink: 'https://example.com/download/app.apk'
            },
            {
                img: 'assets/Images/project-8.webp',
                title: 'Portfolio Template',
                description: 'Customizable portfolio template for creatives featuring smooth animations and responsive design.',
                category: 'web',
                tech: ['HTML5', 'CSS3', 'JavaScript'],
                github: 'https://github.com',
                demo: 'https://example.com/portfolio-demo',
                isApp: false
            },
            {
                img: 'assets/Images/project-9.webp',
                title: 'Social Media UI Kit',
                description: 'Comprehensive UI kit for social media applications with over 200 components and screen templates.',
                category: 'ui',
                tech: ['Figma', 'Illustrator', 'Photoshop'],
                github: 'https://github.com',
                demo: 'https://example.com/ui-kit-demo',
                isApp: false
            }
        ];    */



        // -------------------------------| Example end |-------------------------------


        {
            img: 'assets/Images/DORAK.webp',
            title: 'Random Goal Keeper Web',
            description: "A simple tool for five-a-side football groups that randomly assigns goalkeeper turns — just enter the number of players, and let the app do the rest.",
            category: 'web',
            tech: ['Flutter', 'Dart'],
            github: 'https://github.com/OsamaMabrouk0/DORAK',
            demo: 'https://osamamabrouk0.github.io/DORAK/',
            isApp: false
        }
    ];

    // Helper Functions
    function createModalContent(projectCard) {
        const projectTitle = projectCard.querySelector('.project-title').innerText;
        const projectDesc = projectCard.querySelector('.project-description').innerText;
        const projectImg = projectCard.querySelector('.project-img').getAttribute('src');
        const projectTech = projectCard.querySelector('.project-tech').innerHTML;
        const isApp = projectCard.classList.contains('is-app') || projectCard.getAttribute('data-category') === 'app';

        let demoLinkText, demoLinkIcon;
        if (isApp) {
            demoLinkText = 'Download APK';
            demoLinkIcon = 'fas fa-download';
        } else {
            demoLinkText = 'Live Demo';
            demoLinkIcon = 'fas fa-external-link-alt';
        }

        // استخراج روابط المشروع
        let demoLink = '#';
        let githubLink = 'https://github.com';

        const originalDemoLink = projectCard.querySelector('.project-link[title="Live Demo"], .project-link[title="Download APK"]');
        const originalGithubLink = projectCard.querySelector('.project-link[title="View Code"]');

        if (originalDemoLink && originalDemoLink.getAttribute('href') !== '#') {
            demoLink = originalDemoLink.getAttribute('href');
        }

        if (originalGithubLink) {
            githubLink = originalGithubLink.getAttribute('href');
        }

        return `
            <div class="modal-project-img">
                <img src="${projectImg}" alt="${projectTitle}">
            </div>
            <h2 class="modal-project-title">${projectTitle}</h2>
            <div class="modal-project-desc">
                <h3>Project Description</h3>
                <p>${projectDesc}</p>
            </div>
            <div class="modal-project-tech">
                <h3>Technologies Used</h3>
                <div class="tech-tags">
                    ${projectTech}
                </div>
            </div>
            <div class="modal-project-links">
                <a href="${githubLink}" target="_blank" class="modal-link github-link">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
                <a href="${demoLink}" target="_blank" class="modal-link demo-link">
                    <i class="${demoLinkIcon}"></i> ${demoLinkText}
                </a>
            </div>
        `;
    }

    function showProjectModal(projectCard) {
        modalBody.innerHTML = createModalContent(projectCard);
        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        projectModal.classList.remove('show');
        setTimeout(() => {
            modalBody.innerHTML = '';
            document.body.style.overflow = '';
        }, 300);
    }

    function createProjectCard(project, index) {
        // Create tech tags HTML
        const techTagsHtml = project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

        // تحديد نص وأيقونة الزر بناءً على نوع المشروع
        let demoLinkText = project.isApp ? 'Download APK' : 'Live Demo';
        let demoLinkIcon = project.isApp ? 'fas fa-download' : 'fas fa-external-link-alt';

        // Create new project element
        const newProject = document.createElement('div');
        newProject.className = 'project-card';
        if (project.isApp) {
            newProject.classList.add('is-app');
        }
        newProject.setAttribute('data-category', project.category);
        newProject.style.opacity = '0';
        newProject.style.transform = 'translateY(30px)';

        // Set project HTML content
        newProject.innerHTML = `
            <div class="project-img-container">
                <img src="${project.img}" alt="${project.title}" class="project-img">
                <div class="project-overlay">
                    <div class="project-actions">
                        <a href="#" class="project-link" title="View Details">
                            <i class="fas fa-eye"></i>
                        </a>
                        <a href="${project.github}" target="_blank" class="project-link" title="View Code">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="${project.isApp ? project.downloadLink : project.demo}" target="_blank" class="project-link" title="${demoLinkText}">
                            <i class="${demoLinkIcon}"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${techTagsHtml}
                </div>
            </div>
        `;

        // Add event listeners
        const detailsBtn = newProject.querySelector('.project-link[title="View Details"]');
        detailsBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showProjectModal(newProject);
        });

        // Add hover effects
        newProject.addEventListener('mouseenter', function () {
            this.querySelector('.project-overlay').style.opacity = '1';
        });

        newProject.addEventListener('mouseleave', function () {
            this.querySelector('.project-overlay').style.opacity = '0';
        });

        return newProject;
    }

    function applyCurrentFilter() {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const allProjects = document.querySelectorAll('.project-card');

        allProjects.forEach(project => {
            if (activeFilter === 'all') {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 100);
            } else if (project.getAttribute('data-category') === activeFilter) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 100);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }

    // Event Listeners

    // 1. Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Apply filtering
            applyCurrentFilter();
        });
    });

    // 2. تحديث أزرار الديمو للتطبيقات الموجودة
    document.querySelectorAll('.project-card[data-category="app"] .project-link[title="Live Demo"]').forEach(link => {
        link.setAttribute('title', 'Download APK');
        const icon = link.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-download';
        }
    });

    // 3. Project Detail Modal for existing projects - تحديث للتعامل مع كل روابط المشاريع
    document.querySelectorAll('.project-link').forEach(link => {
        if (link.title === 'View Details') {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const projectCard = this.closest('.project-card');
                showProjectModal(projectCard);
            });
        } else if (link.title === 'Live Demo' || link.title === 'Download APK') {
            // تصحيح سلوك الروابط للتأكد من أنها تفتح في نافذة جديدة
            link.addEventListener('click', function (e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault(); // منع الانتقال إذا كان الرابط فارغًا
                }
            });
        }
    });

    // 4. Close modal button
    if (closeModal) {
        closeModal.addEventListener('click', closeProjectModal);
    }

    // 5. Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });

    // 6. Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && projectModal.classList.contains('show')) {
            closeProjectModal();
        }
    });

    // 7. View More Projects button - تبسيط إضافة مشاريع جديدة
    if (viewMoreBtn) {
        let showingAllProjects = false;

        viewMoreBtn.addEventListener('click', function () {
            const projectsGrid = document.querySelector('.projects-grid');
            const btnText = this.querySelector('.btn-text');

            if (!showingAllProjects) {
                // Add additional projects
                additionalProjects.forEach((project, index) => {
                    const newProject = createProjectCard(project, index);
                    projectsGrid.appendChild(newProject);

                    // Animate appearance
                    setTimeout(() => {
                        newProject.style.opacity = '1';
                        newProject.style.transform = 'translateY(0)';
                    }, 100 * (index + 1));
                });

                // Apply current filter
                applyCurrentFilter();

                // Update button text
                btnText.innerText = 'Show Less';
                showingAllProjects = true;
            } else {
                // Remove additional projects
                const allProjects = document.querySelectorAll('.project-card');

                // Remove projects beyond the original 6
                for (let i = 6; i < allProjects.length; i++) {
                    allProjects[i].style.opacity = '0';
                    allProjects[i].style.transform = 'translateY(20px)';

                    // Remove after animation
                    setTimeout(() => {
                        if (allProjects[i].parentNode === projectsGrid) {
                            projectsGrid.removeChild(allProjects[i]);
                        }
                    }, 300);
                }

                // Update button text
                btnText.innerText = 'View More Projects';
                showingAllProjects = false;
            }
        });
    }

    // Intersection Observer for animation on scroll
    if ('IntersectionObserver' in window) {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    projectObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        projects.forEach(card => {
            projectObserver.observe(card);
        });
    } else {
        // Fallback for browsers without Intersection Observer
        projects.forEach(card => {
            card.classList.add('animate-in');
        });
    }

    // Add hover effects for existing project cards
    projects.forEach(card => {
        // تعديل لمشاريع التطبيقات الموجودة ليتم التعرف عليها
        if (card.getAttribute('data-category') === 'app') {
            card.classList.add('is-app');
        }

        card.addEventListener('mouseenter', function () {
            this.querySelector('.project-overlay').style.opacity = '1';
        });

        card.addEventListener('mouseleave', function () {
            this.querySelector('.project-overlay').style.opacity = '0';
        });
    });
});

// -------------------------------| skills |-------------------------------


// skills.js - Animation and Interaction for Skills Section
document.addEventListener('DOMContentLoaded', function () {
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
        item.addEventListener('mouseenter', function () {
            this.classList.add('skill-hover');
        });

        item.addEventListener('mouseleave', function () {
            this.classList.remove('skill-hover');
        });
    });

    // Add filter functionality for skills tags if needed
    const allTags = document.querySelectorAll('.skill-tag');
    allTags.forEach(tag => {
        tag.addEventListener('click', function () {
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
        link.addEventListener('click', function (e) {
            e.preventDefault();
            scrollToSkills();
        });
    });
});


// -------------------------------| contact |-------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // ============ Lazy Load EmailJS Library ============
    const YOUR_PUBLIC_KEY = 'kJHiZmp2XhGMJr35_';
    const YOUR_SERVICE_ID = 'service_vtp2pyu';
    const YOUR_TEMPLATE_ID = 'template_e9qj6yj';

    let emailjsLoaded = false;

    const contactSection = document.getElementById('contact');

    const loadEmailJS = () => {
        if (emailjsLoaded) return;

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
        script.defer = true;
        script.onload = () => {
            emailjs.init(YOUR_PUBLIC_KEY);
            emailjsLoaded = true;
        };
        document.body.appendChild(script);
    };

    if (contactSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                loadEmailJS();
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        observer.observe(contactSection);
    }

    // ============ Form Input Animation ============
    const formInputs = document.querySelectorAll('.form-input');

    formInputs.forEach(input => {
        if (input.value) {
            input.nextElementSibling.classList.add('active');
        }

        input.addEventListener('focus', function () {
            this.nextElementSibling.classList.add('active');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.nextElementSibling.classList.remove('active');
            }
        });

        input.addEventListener('input', function () {
            this.classList.remove('error');
        });
    });

    // ============ Form Validation and Submission ============
    const contactForm = document.getElementById('contactForm');

    const validators = {
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => value.length >= 10,
        default: (value) => value.trim().length > 0
    };

    const showError = (input, message) => {
        input.classList.add('error');
        let errorMsg = input.parentElement.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            input.parentElement.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    };

    const hideError = (input) => {
        input.classList.remove('error');
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }
    };

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const formEntries = Object.fromEntries(formData);

            let isValid = true;

            document.querySelectorAll('.error-message').forEach(msg => {
                msg.style.display = 'none';
            });

            for (const [key, value] of Object.entries(formEntries)) {
                const input = document.getElementById(key);
                const validator = validators[key] || validators.default;

                if (!validator(value)) {
                    isValid = false;
                    showError(input, `Please enter a valid ${key}`);
                } else {
                    hideError(input);
                }
            }

            if (isValid && emailjsLoaded) {
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.querySelector('.btn-text').textContent;
                submitBtn.disabled = true;
                submitBtn.querySelector('.btn-text').textContent = 'Sending...';

                emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, {
                    name: formEntries.name,
                    email: formEntries.email,
                    subject: formEntries.subject,
                    message: formEntries.message
                })
                .then(function () {
                    showNotification('Thank you for your message! I will get back to you soon.', 'success');
                    contactForm.reset();
                    formInputs.forEach(input => {
                        input.nextElementSibling.classList.remove('active');
                    });
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                })
                .catch(function () {
                    showNotification('An error occurred while sending your message. Please try again.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                });
            } else if (!emailjsLoaded) {
                showNotification('Email service is still loading, please try again in a moment.', 'error');
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }

    // ============ Notification System ============
    function showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.form-notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        document.querySelector('.contact-form-container').appendChild(notification);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        setTimeout(() => notification.classList.add('show'), 10);
    }

    // ============ Interactive Background Elements ============
    const bgElements = document.querySelector('.contact-bg-elements');

    if (bgElements) {
        document.addEventListener('mousemove', function (e) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            document.querySelectorAll('.contact-shape').forEach(shape => {
                const factor = parseFloat(window.getComputedStyle(shape).width) / 500;
                const translateX = mouseX * 20 * factor;
                const translateY = mouseY * 20 * factor;

                if (window.gsap) {
                    gsap.to(shape, {
                        x: translateX,
                        y: translateY,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                } else {
                    shape.style.transform = `translate(${translateX}px, ${translateY}px)`;
                }
            });
        });
    }

    // ============ Scroll Animation with Intersection Observer ============
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                }, 800);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.contact-card, .map-container, .contact-form-container'
    );

    const sectionHeader = document.querySelector('.contact .section-header');
    if (sectionHeader) {
        sectionHeader.style.opacity = '1';
        sectionHeader.classList.add('fade-in');
    }

    elementsToAnimate.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.15}s`;
        el.classList.add('animation-ready');
        observer.observe(el);
    });

    // ============ Add CSS for new features ============
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .form-input.error {
            border-color: #ff4d4d !important;
        }

        .error-message {
            display: none;
            color: #ff4d4d;
            font-size: var(--font-sm);
            margin-top: 5px;
            animation: fadeIn 0.3s ease;
        }

        .form-notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(30, 41, 59, 0.9);
            border-radius: var(--border-radius-md);
            padding: 15px;
            box-shadow: var(--shadow-lg);
            color: var(--white-color);
            max-width: 350px;
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            backdrop-filter: blur(5px);
            z-index: 100;
            border-left: 4px solid var(--primary-color);
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }

        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }

        .notification-content i {
            margin-top: 2px;
        }

        .form-notification.success {
            border-left-color: #46d369;
        }

        .form-notification.success i {
            color: #46d369;
        }

        .form-notification.error {
            border-left-color: #ff4d4d;
        }

        .form-notification.error i {
            color: #ff4d4d;
        }

        .form-notification.show {
            transform: translateY(0);
            opacity: 1;
        }

        .form-notification.fade-out {
            transform: translateY(20px);
            opacity: 0;
        }

        .notification-close {
            background: none;
            border: none;
            color: var(--gray-color);
            cursor: pointer;
            padding: 5px;
            margin-left: 10px;
            font-size: var(--font-sm);
        }

        .notification-close:hover {
            color: var(--white-color);
        }

        .animation-ready {
            opacity: 0;
        }

        .animate-in {
            animation: fadeInUp 0.8s forwards;
        }

        .fade-in {
            animation: fadeIn 1s ease-out forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .contact .section-header,
        .contact .section-title {
            opacity: 1 !important;
            z-index: 5 !important;
        }
    `;
    document.head.appendChild(styleElement);
});


// -------------------------------| footer |-------------------------------


document.getElementById('current-year').textContent = new Date().getFullYear();