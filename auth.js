/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 AllieBaig
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/AllieBaig/name-place-animal-thing-pwa/blob/main/LICENSE
 */

function registerUser() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessageDiv = document.getElementById('loginMessage');
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        loginMessageDiv.textContent = "Please enter both username and password.";
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('pwaUsers')) || {};
    if (storedUsers[username]) {
        loginMessageDiv.textContent = "Username already exists.";
        return;
    }

    storedUsers[username] = password; // Store password in plain text (VERY INSECURE)
    localStorage.setItem('pwaUsers', JSON.stringify(storedUsers));
    loginMessageDiv.textContent = "Registration successful. You can now log in.";
    usernameInput.value = "";
    passwordInput.value = "";
}

function loginUser() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessageDiv = document.getElementById('loginMessage');
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        loginMessageDiv.textContent = "Please enter both username and password.";
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('pwaUsers')) || {};
    if (storedUsers[username] === password) {
        localStorage.setItem('loggedInUser', username);
        updateUIAfterLogin();
    } else {
        loginMessageDiv.textContent = "Invalid username or password.";
    }
}

function updateUIAfterLogin() {
    const loginOptions = document.getElementById('loginOptions');
    const appContent = document.getElementById('appContent');
    if (loginOptions) loginOptions.style.display = 'none';
    if (appContent) {
        appContent.style.display = 'block';
        loadEntries();
        initializeWordSafari();
        generateWireframeImage(10);
    }
}
