/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 [Your GitHub Username]
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/[Your GitHub Username]/name-place-animal-thing-pwa/blob/main/LICENSE
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.javaScriptEnabled === 'undefined' || window.javaScriptEnabled !== true) {
        // JavaScript is likely blocked
        displayJavaScriptBlockedMessage();
    } else {
        // JavaScript is enabled, continue with your PWA logic
        const guestId = localStorage.getItem('guestId');
        const appContent = document.getElementById('appContent');
        const loginOptions = document.getElementById('loginOptions');

        if (guestId) {
            loginOptions.style.display = 'none';
            appContent.style.display = 'block';
            loadEntries();
            initializeWordSafari();
            generateWireframeImage(10);
        } else {
            generateWireframeImage(1);
  }

  // Event listeners for switching game modes
  const regularGameButton = document.querySelector('button[onclick="switchToRegularGame()"]');
  const diceChallengeButton = document.querySelector('button[onclick="switchToDiceChallenge()"]');
  const wordSafariButton = document.querySelector('button[onclick="switchToWordSafari()"]');

  if (regularGameButton) regularGameButton.addEventListener('click', switchToRegularGame);
  if (diceChallengeButton) diceChallengeButton.addEventListener('click', switchToDiceChallenge);
  if (wordSafariButton) wordSafariButton.addEventListener('click', switchToWordSafari);

  // Initial setup to hide game areas
  document.getElementById('regularGameArea').style.display = 'none';
  document.getElementById('diceChallengeArea').style.display = 'none';
  document.getElementById('wordSafariArea').style.display = 'none';
});

// New functions for registration and login start here
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
// New functions for registration and login end here

let playerScore = 0;
let computerScore = 0;
let currentDiceLetter = null;

        // Event listeners for switching game modes
        const regularGameButton = document.querySelector('button[onclick="switchToRegularGame()"]');
        const diceChallengeButton = document.querySelector('button[onclick="switchToDiceChallenge()"]');
        const wordSafariButton = document.querySelector('button[onclick="switchToWordSafari()"]');

        if (regularGameButton) regularGameButton.addEventListener('click', switchToRegularGame);
        if (diceChallengeButton) diceChallengeButton.addEventListener('click', switchToDiceChallenge);
        if (wordSafariButton) wordSafariButton.addEventListener('click', switchToWordSafari);

        // Initial setup to hide game areas
        document.getElementById('regularGameArea').style.display = 'none';
        document.getElementById('diceChallengeArea').style.display = 'none';
        document.getElementById('wordSafariArea').style.display = 'none';
    }
});

let playerScore = 0;
let computerScore = 0;
let currentDiceLetter = null;

function switchToRegularGame() {
    document.getElementById('wordSafariArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'none';
    document.getElementById('regularGameArea').style.display = 'block';
}

function switchToDiceChallenge() {
    document.getElementById('wordSafariArea').style.display = 'none';
    document.getElementById('regularGameArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'block';
    document.getElementById('diceRollStartArea').style.display = 'block';
    document.getElementById('challengeInputs').style.display = 'none';
}

function switchToWordSafari() {
    document.getElementById('regularGameArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'none';
    document.getElementById('wordSafariArea').style.display = 'block';
    startWordSafari();
}

function displayJavaScriptBlockedMessage() {
    const body = document.body;
    body.innerHTML = `
        <div style="text-align: center; padding: 20px; font-size: 1.2em;">
            <h2>JavaScript Blocked</h2>
            <p>It seems JavaScript is blocked in your browser. This PWA requires JavaScript to function correctly.</p>
            <p>Please enable JavaScript or disable your ad blocker for this site to continue.</p>
            <p>Instructions on how to enable JavaScript may vary depending on your browser and ad blocker.</p>
        </div>
    `;
    // Optionally, you can add a link to instructions for enabling JavaScript
}
