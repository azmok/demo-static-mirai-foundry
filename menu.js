document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('mobile-menu-open');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');

    if (openBtn && menu) {
        openBtn.addEventListener('click', () => {
            menu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        });
    }

    if (closeBtn && menu) {
        closeBtn.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });
    }

    // Close menu on link click
    const menuLinks = menu ? menu.querySelectorAll('a') : [];
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });
    });
});
