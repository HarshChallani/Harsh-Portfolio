let users = JSON.parse(localStorage.getItem("users")) || {};

// script.js
document.addEventListener('DOMContentLoaded', () => {
  // attach handlers only if those elements exist on the page
  const registerBtn = document.getElementById('registerBtn');
  if (registerBtn) registerBtn.addEventListener('click', registerUser);

  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.addEventListener('click', validateLogin);

  // populate profile username if on profile page
  const profileUsername = document.getElementById('profileUsername');
  if (profileUsername) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      // not logged in — send to login page
      window.location.href = 'login.html';
    } else {
      profileUsername.textContent = currentUser;
    }
  }
});

// Register function
function registerUser() {
  const username = (document.getElementById('newUsername')?.value || '').trim();
  const password = document.getElementById('newPassword')?.value || '';
  const messageEl = document.getElementById('message');

  if (!username || !password) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Please fill in all fields.';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username]) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Username already exists. Choose another.';
    return;
  }

  users[username] = password; // NOTE: for learning only. Don't store plaintext passwords in production.
  localStorage.setItem('users', JSON.stringify(users));
  messageEl.style.color = 'green';
  messageEl.textContent = 'Registration successful. Redirecting to login...';
  setTimeout(() => { window.location.href = 'login.html'; }, 900);
}
window.registerUser = registerUser; // expose globally (compat with inline onclick if present)

// Login function (works with login.html below)
function validateLogin() {
  const username = (document.getElementById('username')?.value || '').trim();
  const password = document.getElementById('password')?.value || '';
  const messageEl = document.getElementById('message');

  if (!username || !password) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Please fill in all fields.';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username] && users[username] === password) {
    localStorage.setItem('currentUser', username);
    window.location.href = 'Profile.html';
  } else {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Invalid username or password.';
  }
}
window.validateLogin = validateLogin;

// Logout function used by Profile.html
window.logout = function() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
};



