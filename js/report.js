document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('lostItemForm');
    if (!form) return;

    if (typeof pb === 'undefined') {
        console.error('PocketBase SDK not loaded – check script tags and pb-config.js');
        const msg = document.createElement('p');
        msg.style.color = 'red';
        msg.textContent = 'Error: Cannot connect to the database right now. Please refresh or contact support.';
        form.before(msg);
        form.style.display = 'none';
        return;
    }

    const user = pb.authStore.model || null; 

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const formData = new FormData();

        formData.append('title', document.getElementById('itemName').value.trim());
        formData.append('description', document.getElementById('itemDescription').value.trim());
        formData.append('category', document.getElementById('category').value);
        formData.append('dateLost', document.getElementById('dateLost').value);
        formData.append('location', document.getElementById('location').value.trim());

        if (user) {
            formData.append('studentName', user.name?.trim() || '');
            formData.append('email', user.email || '');
        }
        const fileInput = document.getElementById('itemImage');
        if (fileInput?.files?.[0]) {
            formData.append('image', fileInput.files[0]);
        }

        formData.append('status', 'pending');

        try {
            const response = await fetch(`${PB_URL}/api/collections/lost_items/records`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create record');
            }

            alert('Report submitted successfully!');
            form.reset();

        } catch (err) {
            console.error('Submission error:', err);
            alert('Could not submit report: ' + (err.message || 'Unknown error'));
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Report';
        }
    });
});