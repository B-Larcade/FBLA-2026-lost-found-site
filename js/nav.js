document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = pb?.authStore?.isValid ?? false;

    const loginNavItem = document.getElementById('loginNavItem');
    const profileDropdown = document.getElementById('profileDropdown');

    if (loginNavItem) {
        loginNavItem.style.display = isLoggedIn ? 'none' : 'block';
    }

    if (profileDropdown) {
        profileDropdown.style.display = isLoggedIn ? 'block' : 'none';
    }

    const reportLink = document.getElementById('report');
    const lostItemsLink = document.getElementById('lostItems');

    if (reportLink) {
        reportLink.style.display = isLoggedIn ? 'block' : 'none';
    }

    if (lostItemsLink) {
        lostItemsLink.style.display = isLoggedIn ? 'block' : 'none';
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    document.addEventListener('click', e => {
        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        }
    });

    const profileImage = profileDropdown?.querySelector('img');
    const previewPopup = document.getElementById('imagePreviewPopup');

    if (profileImage && previewPopup) {
        const previewImg = previewPopup.querySelector('img');
        const loading = previewPopup.querySelector('.preview-loading');

        profileImage.addEventListener('mouseenter', e => {
            previewImg.src = profileImage.src;
            previewImg.style.display = 'none';
            loading.style.display = 'block';

            previewPopup.style.left = (e.pageX + 20) + 'px';
            previewPopup.style.top = (e.pageY + 20) + 'px';
            previewPopup.style.display = 'block';

            previewImg.onload = () => {
                loading.style.display = 'none';
                previewImg.style.display = 'block';
            };
        });

        profileImage.addEventListener('mouseleave', () => {
            previewPopup.style.display = 'none';
        });
    }
});