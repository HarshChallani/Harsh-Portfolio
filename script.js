let users = JSON.parse(localStorage.getItem("users")) || {};

function registerUser() {
  let username = document.getElementById("newUsername").value;
  let password = document.getElementById("newPassword").value;

  if (username && password) {
    localStorage.setItem(username, password); // save in localStorage
    document.getElementById("message").style.color = "green";
    document.getElementById("message").innerText = "Registration successful! You can now login.";
  } else {
    document.getElementById("message").innerText = "Please fill in all fields.";
  }
}

function validateLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let storedPassword = localStorage.getItem(username);

  if (password === storedPassword) {
    window.location.href = "Profile.html"; // redirect to profile
  } else {
    document.getElementById("message").innerText = "Invalid username or password.";
  }
}

function logout() {
  window.location.href = "login.html";
}


window.onload = function() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const profileUsername = document.getElementById("profileUsername");
    if (profileUsername) {
      profileUsername.innerText = loggedInUser;
    }
  } else if (window.location.pathname.includes("profile.html")) {
    window.location.href = "login.html";
  }

};
