document.addEventListener('DOMContentLoaded', function () {
    // ============ Form Input Animation ============
    const formInputs = document.querySelectorAll('.form-input');

    // Initialize form inputs with proper label position
    formInputs.forEach(input => {
        if (input.value) {
            input.nextElementSibling.classList.add('active');
        }

        // Add focus and blur event listeners
        input.addEventListener('focus', function () {
            this.nextElementSibling.classList.add('active');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.nextElementSibling.classList.remove('active');
            }
        });

        // Clear error state on input
        input.addEventListener('input', function () {
            this.classList.remove('error');
        });
    });

    // ============ Form Validation and Submission ============
    const contactForm = document.getElementById('contactForm');

    // Custom validation functions
    const validators = {
        email: (value) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(value);
        },
        phone: (value) => {
            return value.length >= 10;
        },
        default: (value) => {
            return value.trim().length > 0;
        }
    };

    // Show validation error
    const showError = (input, message) => {
        input.classList.add('error');

        // Create or update error message
        let errorMsg = input.parentElement.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            input.parentElement.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    };

    // Hide validation error
    const hideError = (input) => {
        input.classList.remove('error');
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }
    };


// ============ EmailJS Integration ============ 
const YOUR_PUBLIC_KEY = 'kJHiZmp2XhGMJr35_';
const YOUR_SERVICE_ID = 'service_vtp2pyu';
const YOUR_TEMPLATE_ID = 'template_e9qj6yj';

// تهيئة EmailJS
(function () {
    emailjs.init(YOUR_PUBLIC_KEY);
})();

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // الحصول على بيانات النموذج
        const formData = new FormData(this);
        const formEntries = Object.fromEntries(formData);

        // التحقق من النموذج
        let isValid = true;

        // مسح جميع الأخطاء السابقة
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.style.display = 'none';
        });

        // التحقق من كل حقل
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

        if (isValid) {
            // إظهار حالة التحميل
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = 'Sending...';

            // إرسال البريد الإلكتروني باستخدام EmailJS
            emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, {
                name: formEntries.name,
                email: formEntries.email,
                subject: formEntries.subject,
                message: formEntries.message
            })
                .then(function () {
                    // إظهار إشعار النجاح
                    showNotification('Thank you for your message! I will get back to you soon.', 'success');

                    // إعادة تعيين النموذج
                    contactForm.reset();
                    formInputs.forEach(input => {
                        input.nextElementSibling.classList.remove('active');
                    });

                    // إعادة تعيين الزر
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                })
                .catch(function () {
                    // إظهار إشعار الخطأ
                    showNotification('An error occurred while sending your message. Please try again.', 'error');

                    // إعادة تعيين الزر
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                });
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
}


    // ============ Notification System ============
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.form-notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        // Add to DOM
        document.querySelector('.contact-form-container').appendChild(notification);

        // Add close functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);

        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
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

                // Apply smooth transition with GSAP if available, fall back to regular CSS
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
                // Make sure elements stay visible after animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                }, 800); // Match the animation duration
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // MODIFIED: Exclude section-header from animation
    const elementsToAnimate = document.querySelectorAll(
        '.contact-card, .map-container, .contact-form-container'
    );

    // Apply separate animation for section header
    const sectionHeader = document.querySelector('.contact .section-header');
    if (sectionHeader) {
        sectionHeader.style.opacity = '1'; // Make sure header is always visible
        sectionHeader.classList.add('fade-in'); // Add a simple fade in animation
    }

    elementsToAnimate.forEach((el, index) => {
        // Add animation delay
        el.style.animationDelay = `${index * 0.15}s`;
        // Add initial class
        el.classList.add('animation-ready');
        // Observe element
        observer.observe(el);
    });

    // ============ Add CSS for new features ============
    // Add required CSS for new features
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Form validation */
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
        
        /* Notification */
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
        
        /* Animation classes */
        .animation-ready {
            opacity: 0;
        }
        
        .animate-in {
            animation: fadeInUp 0.8s forwards;
        }
        
        /* Section Header animation */
        .fade-in {
            animation: fadeIn 1s ease-out forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
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
        
        /* Form button loading state */
        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        /* Ensure section header is always visible */
        .contact .section-header {
            opacity: 1 !important;
            z-index: 5 !important;
        }
        
        .contact .section-title {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(styleElement);
});