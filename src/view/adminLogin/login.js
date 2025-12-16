
(function () {
    const el = document.getElementById('timestamp');

    function pad(n) { return n < 10 ? '0' + n : n; }

    function update() {
        const d = new Date();
        el.textContent =
            pad(d.getDate()) + '-' +
            pad(d.getMonth() + 1) + '-' +
            d.getFullYear() + ' ' +
            pad(d.getHours()) + ':' +
            pad(d.getMinutes()) + ':' +
            pad(d.getSeconds());
    }

    update();
    setInterval(update, 1000);
})();


(function () {
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');

    function hideMessages() {
        errorMsg.classList.remove('show');
        successMsg.classList.remove('show');
    }

    function showError(msg) {
        hideMessages();
        errorMsg.textContent = msg;
        errorMsg.classList.add('show');
    }

    function showSuccess(msg) {
        hideMessages();
        successMsg.textContent = msg;
        successMsg.classList.add('show');
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();
        hideMessages();

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        const data = Object.fromEntries(new FormData(form));

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                showSuccess(result.message || 'Login successful!');
                setTimeout(() => location.href = result.redirect || '/admindashboard/dashboard.html', 1000);
            } else {
                showError(result.message || 'Invalid credentials.');
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        } catch {
            showError('Invalid credentials. Please try again.');
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
})();
