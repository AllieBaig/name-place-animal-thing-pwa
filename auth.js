// auth.js

function registerUser() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessageDiv = document.getElementById('loginMessage');
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username && password) {
        localStorage.setItem('user_' + username, password);
        loginMessageDiv.textContent = 'Registration successful. You can now log in.';
        usernameInput.value = '';
        passwordInput.value = '';
    } else {
        loginMessageDiv.textContent = 'Please enter both username and password.';
    }
}

function loginUser() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessageDiv = document.getElementById('loginMessage');
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const storedPassword = localStorage.getItem('user_' + username);

    if (storedPassword === password) {
        localStorage.setItem('loggedInUser', username);
        updateUIAfterLogin();
    } else {
        loginMessageDiv.textContent = 'Invalid username or password.';
    }
}

function updateUIAfterLogin() {
    document.getElementById('loginOptions').style.display = 'none';
    document.getElementById('appContent').style.display = 'block';
    const guestNameInput = document.getElementById('guestName');
    if (guestNameInput) guestNameInput.value = ''; // Clear guest name if logged in
}

function guestLogin() {
    const guestNameInput = document.getElementById('guestName');
    const guestName = guestNameInput.value.trim();
    if (guestName) {
        const guestId = 'guest_' + Date.now(); // Simple unique guest ID
        localStorage.setItem('guestId', guestId);
        localStorage.setItem('loggedInUser', guestName); // Treat guest name as logged in user for UI
        updateUIAfterLogin();
    } else {
        document.getElementById('loginMessage').textContent = 'Please enter a temporary name.';
    }
}

export { registerUser, loginUser, updateUIAfterLogin, guestLogin };
