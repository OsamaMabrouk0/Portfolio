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