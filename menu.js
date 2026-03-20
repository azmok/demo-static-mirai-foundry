document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('mobile-menu-open');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');

    function openMenu() {
        menu.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
    }

    if (openBtn && menu) {
        openBtn.addEventListener('click', openMenu);
    }

    if (closeBtn && menu) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // Close menu on nav link click
    const menuLinks = menu ? menu.querySelectorAll('a') : [];
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
