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
