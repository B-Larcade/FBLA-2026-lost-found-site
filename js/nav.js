document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = pb?.authStore?.isValid ?? false;

    console.log('Nav loaded - Logged in?', isLoggedIn);

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

    const subTabs = document.querySelectorAll('.sub-tab');
    if (subTabs.length > 0) {
        console.log('Sub-tabs found on this page:', subTabs.length);
        subTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                const parentSection = btn.closest('.section')?.id || '';
                document.querySelectorAll(`#${parentSection} .sub-tab`)?.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                console.log('Sub-tab clicked:', btn.dataset.sub);
            });
        });
    } else {
        console.log('No sub-tabs on this page - skipping');
    }

    document.addEventListener('click', e => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
        }
    });
});