// Example: إضافة مشروع جديد إلى مصفوفة المشاريع الإضافية
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
];