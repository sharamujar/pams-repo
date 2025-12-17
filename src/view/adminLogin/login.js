(function () {
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');

    function resetMessages() {
        errorMsg.textContent = '';
        successMsg.textContent = '';
        errorMsg.style.display = 'none';
        successMsg.style.display = 'none';
    }

    function showError(msg) {
        resetMessages();
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
    }

    function showSuccess(msg) {
        resetMessages();
        successMsg.textContent = msg;
        successMsg.style.display = 'block';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        resetMessages();

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        const data = Object.fromEntries(new FormData(form));

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                setTimeout(() => {
                    window.location.replace(
                        result.redirect || '/admindashboard/dashboard.html');
                }, 1000);
                

            } else {
                showError(result.message || 'Invalid credentials.');
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }

        } catch (err) {
            showError('Something went wrong. Please try again.');
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
})();
