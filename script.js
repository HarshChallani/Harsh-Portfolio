document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const profileUsernameSpan = document.getElementById('profileUsername');

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;

            // Check if user already exists
            if (localStorage.getItem(username)) {
                alert('Username already exists. Please choose another.');
                return;
            }

            // Save user to local storage
            localStorage.setItem(username, password);
            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html';
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const storedPassword = localStorage.getItem(username);

            if (storedPassword && storedPassword === password) {
                // Successful login
                localStorage.setItem('loggedInUser', username);
                alert('Login successful!');
                window.location.href = 'profile.html'; // Redirect to the profile page
            } else {
                alert('Invalid username or password.');
            }
        });
    }

    // Check login status for profile.html
    if (profileUsernameSpan) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            profileUsernameSpan.textContent = loggedInUser;
        } else {
            // No user logged in, redirect to login page
            window.location.href = 'login.html';
        }
    }
});

// Logout function
function logout() {
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    window.location.href = 'login.html';
}
