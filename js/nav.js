

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle (hamburger)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Dropdown toggle for mobile / click fallback
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropbtn');
        if (!btn) return;

        btn.addEventListener('click', e => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('open');

                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) other.classList.remove('open');
                });
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', e => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(d => d.classList.remove('open'));
        }
    });
});