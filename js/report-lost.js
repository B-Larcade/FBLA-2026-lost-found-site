Document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('lostItemForm');
    if (!form) {
        console.warn('Form #lostItemForm not found');
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) {
        console.warn('Submit button not found in form');
    }

    const requiredFields = ['itemName', 'itemDescription', 'category', 'dateLost', 'location'];

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const missing = requiredFields
            .filter(id => {
                const el = document.getElementById(id);
                return !el?.value?.trim();
            });

        if (missing.length > 0) {
            alert('Please fill in all required fields.');
            return;
        }

        if (!submitButton) return;

        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        try {
            const formData = new FormData();

            // ── Core fields ───────────────────────────────────────
            formData.append('title', getTrimmedValue('itemName'));
            formData.append('description', getTrimmedValue('itemDescription'));
            formData.append('category', getValue('category'));
            formData.append('dateLost', getValue('dateLost'));
            formData.append('location', getTrimmedValue('location'));

            // ── Reporter info ─────────────────────────────────────
            const user = pb?.authStore?.model;

            formData.append('studentName', user?.name?.trim() || '');
            formData.append('email', user?.email?.trim() || '');
            formData.append('phone', getTrimmedValue('phone'));

            // ── Image ──────────────────────────────────
            const fileInput = /** @type {HTMLInputElement} */ (document.getElementById('itemImage'));
            if (fileInput?.files?.[0]) {
                formData.append('image', fileInput.files[0]);
            }

            // ── Status ────────────────────────────────
            formData.append('status', 'pending');

            if (user?.id) {
            formData.append('reportedBy', user.id);
        }

            const response = await fetch(`${PB_URL}/api/collections/lost_items/records`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                let errorMessage = 'Failed to create record';
                try {
                    const errData = await response.json();
                    errorMessage = errData.message || errorMessage;
                    if (errData.data) {
                        const firstError = Object.values(errData.data)[0];
                        if (firstError?.message) {
                            errorMessage = firstError.message;
                        }
                    }
                } catch {
                }
                throw new Error(errorMessage);
            }

            const record = await response.json();
            console.log('Lost item reported:', record.id, record);

            alert('Thank you! Your lost item report has been submitted successfully.');
            form.reset();
            if (fileInput) fileInput.value = '';

        } catch (err) {
            console.error('Failed to submit lost item report:', err);
            alert(`Sorry, something went wrong:\n${err.message || 'Check console for details'}`);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    });
});

/** @param {string} id */
function getValue(id) {
    const el = /** @type {HTMLInputElement | HTMLSelectElement | null} */ (
        document.getElementById(id)
    );
    return el?.value ?? '';
}

/** @param {string} id */
function getTrimmedValue(id) {
    return getValue(id).trim();
}