document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const errorEl = document.getElementById('loginError');
        errorEl.style.display = 'none';
        errorEl.textContent = '';

        try {
            const authData = await pb.collection('users').authWithPassword(email, password);
            const userName = authData.record.name || document.getElementById('loginName').value.trim() || 'User';

            alert(`Welcome back, ${userName}!`);
            window.location.href = 'profile.html';
        } catch (err) {
            let msg = 'Login failed – check your email and password';
            if (err?.data?.message) {
                msg = err.data.message;
            }
            errorEl.textContent = msg;
            errorEl.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Log In';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const errorEl = document.getElementById('loginError');
        errorEl.style.display = 'none';
        errorEl.textContent = '';

        try {
            const authData = await pb.collection('users').authWithPassword(email, password);

            const cookieOptions = 'path=/; SameSite=Strict; Max-Age=2592000'; 
            document.cookie = `pb_auth=${pb.authStore.exportToCookie()}; ${cookieOptions}`;

            const userName = authData.record.name || email.split('@')[0];
            alert(`Welcome back, ${userName}! You are now logged in.`);
            window.location.href = 'profile.html';

        } catch (err) {
            let msg = 'Login failed – check your email and password';
            if (err?.data?.message) msg = err.data.message;
            errorEl.textContent = msg;
            errorEl.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Log In';
        }
    });
});