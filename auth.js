// auth.js

function guestLogin() {
    const guestNameInput = document.getElementById('guestName');
    const guestName = guestNameInput.value.trim();
    const loginMessageDiv = document.getElementById('loginMessage');

    if (guestName) {
        const guestId = 'guest_' + Date.now(); // Simple unique guest ID
        localStorage.setItem('guestId', guestId);
        localStorage.setItem('loggedInUser', guestName); // Treat guest name as logged in user for UI
        updateUIAfterLogin();
    } else {
        loginMessageDiv.textContent = 'Please enter a temporary name.';
    }
}

function updateUIAfterLogin() {
    document.getElementById('loginOptions').style.display = 'none';
    document.getElementById('appContent').style.display = 'block';
    const guestNameInput = document.getElementById('guestName');
    if (guestNameInput) guestNameInput.value = ''; // Clear guest name after login
}

export { guestLogin, updateUIAfterLogin };
