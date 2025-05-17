// auth.js

function guestLogin() {
    const defaultGuestName = 'Guest_' + Date.now();
    const loginMessageDiv = document.getElementById('loginMessage'); // Still get this element

    const guestId = 'guest_' + Date.now(); // Simple unique guest ID
    localStorage.setItem('guestId', guestId);
    localStorage.setItem('loggedInUser', defaultGuestName); // Use a default guest name
    updateUIAfterLogin();

    // Optionally, you could clear any previous message if it was displayed
    if (loginMessageDiv) {
        loginMessageDiv.textContent = '';
    }
}

function updateUIAfterLogin() {
    document.getElementById('loginOptions').style.display = 'none';
    document.getElementById('appContent').style.display = 'block';
}

export { guestLogin, updateUIAfterLogin };
