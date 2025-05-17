/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 AllieBaig
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/AllieBaig/name-place-animal-thing-pwa/blob/main/LICENSE
 */

document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    displayScores();
    // Potentially other initializations
});

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

let regularGameTimerInterval;
let regularGameTimeLeft = 30; // Time limit in seconds

function startRegularGameTimer() {
    regularGameTimeLeft = 30;
    updateRegularGameTimerDisplay();
    regularGameTimerInterval = setInterval(() => {
        regularGameTimeLeft--;
        updateRegularGameTimerDisplay();
        if (regularGameTimeLeft <= 0) {
            clearInterval(regularGameTimerInterval);
            submitRegularGameEntries(); // Auto-submit when time runs out
        }
    }, 1000);
}

function updateRegularGameTimerDisplay() {
    const timerDisplay = document.getElementById('regularGameTimer');
    if (timerDisplay) {
        timerDisplay.textContent = regularGameTimeLeft + " seconds";
    }
}

function switchToRegularGame() {
    document.getElementById('wordSafariArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'none';
    document.getElementById('regularGameArea').style.display = 'block';
    const playWithComputerCheckbox = document.getElementById('playWithComputer');
    if (playWithComputerCheckbox.checked) {
        startRegularGameTimer();
    }
    displayEntries(); // Ensure entries are displayed when switching back
}

function submitRegularGameEntries() {
    clearInterval(regularGameTimerInterval);
    const playWithComputer = document.getElementById('playWithComputer').checked;
    const name = document.getElementById('nameEntryPlayer').value.trim();
    const place = document.getElementById('placeEntryPlayer').value.trim();
    const animal = document.getElementById('animalEntryPlayer').value.trim();
    const thing = document.getElementById('thingEntryPlayer').value.trim();

    if (name && place && animal && thing) {
        addItemRegularGame('player', 'Name', name);
        addItemRegularGame('player', 'Place', place);
        addItemRegularGame('player', 'Animal', animal);
        addItemRegularGame('player', 'Thing', thing);

        // Clear input fields
        document.getElementById('nameEntryPlayer').value = '';
        document.getElementById('placeEntryPlayer').value = '';
        document.getElementById('animalEntryPlayer').value = '';
        document.getElementById('thingEntryPlayer').value = '';

        if (playWithComputer) {
            setTimeout(() => {
                computerTurnRegularGame();
            }, 1500);
        }
    } else {
        alert("Please enter something for Name, Place, Animal, and Thing!");
        startRegularGameTimer(); // Restart timer if not all fields are filled
    }
}

function addItemRegularGame(player, category, item) {
    const guestId = localStorage.getItem('guestId');
    let savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};

    if (!savedEntries[guestId]) {
        savedEntries[guestId] = {};
    }
    if (!savedEntries[guestId][category]) {
        savedEntries[guestId][category] = [];
    }

    savedEntries[guestId][category].push({ user: player, value: item });
    localStorage.setItem('pwaEntries', JSON.stringify(savedEntries));

    displayEntries(); // Ensure entries are displayed
}

function computerTurnRegularGame() {
    const categories = ['Name', 'Place', 'Animal', 'Thing'];
    const playerEntries = {};
    const guestId = localStorage.getItem('guestId');
    const savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};
    if (savedEntries[guestId]) {
        categories.forEach(cat => {
            const playerItems = savedEntries[guestId][cat] ? savedEntries[guestId][cat].filter(entry => entry.user === 'player').map(e => e.value.toLowerCase()) : [];
            playerEntries[cat] = playerItems[playerItems.length - 1] || ''; // Get the last player entry
        });
    }

    categories.forEach(category => {
        setTimeout(() => {
            computerAddItemRegularGame(category, playerEntries[category]);
        }, 1500 * (categories.indexOf(category) + 1)); // Stagger computer entries
    });
}

function computerAddItemRegularGame(category, playerEntry) {
    if (computerEntries[category] && computerEntries[category].length > 0) {
        const possibleEntries = computerEntries[category].filter(entry => !playerEntry || entry.toLowerCase().charAt(0) === playerEntry.charAt(0));
        const randomIndex = Math.floor(Math.random() * possibleEntries.length);
        const computerItem = possibleEntries[randomIndex];

        const guestId = localStorage.getItem('guestId');
        let savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};

        if (!savedEntries[guestId]) {
            savedEntries[guestId] = {};
        }
        if (!savedEntries[guestId][category]) {
            savedEntries[guestId][category] = [];
        }

        savedEntries[guestId][category].push({ user: 'computer', value: computerItem });
        localStorage.setItem('pwaEntries', JSON.stringify(savedEntries));
        displayEntries();

        const playerScoreIncrement = calculateScore(playerEntry);
        const computerScoreIncrement = calculateScore(computerItem);
        playerScore += playerScoreIncrement;
        computerScore += computerScoreIncrement;
        displayScores();
    }
}

function displayEntries() {
    const entriesDiv = document.getElementById('entries');
    if (entriesDiv) {
        entriesDiv.innerHTML = '';
        const guestId = localStorage.getItem('guestId');
        const savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};

        if (savedEntries[guestId]) {
            const categoriesToShow = ['Name', 'Place', 'Animal', 'Thing'];
            categoriesToShow.forEach(category => {
                if (savedEntries[guestId].hasOwnProperty(category) && savedEntries[guestId][category].length > 0) {
                    const categoryGroup = document.createElement('div');
                    categoryGroup.classList.add('category-group');
                    const categoryTitle = document.createElement('h3');
                    categoryTitle.textContent = category;
                    categoryGroup.appendChild(categoryTitle);
                    const itemsList = document.createElement('ul');
                    savedEntries[guestId][category].forEach(entry => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${entry.user === 'player' ? 'You' : 'Computer'}: ${entry.value} (${calculateScore(entry.value)} points)`;
                        itemsList.appendChild(listItem);
                    });
                    categoryGroup.appendChild(itemsList);
                    entriesDiv.appendChild(categoryGroup);
                }
            });
        }
    } else {
        console.error("Error: entries div not found.");
    }
}

function displayScores() {
    const playerScoreDisplay = document.getElementById('playerScore');
    const computerScoreDisplay = document.getElementById('computerScore');
    if (playerScoreDisplay) playerScoreDisplay.textContent = playerScore;
    if (computerScoreDisplay) computerScoreDisplay.textContent = computerScore;
}

let playerScore = 0;
let computerScore = 0;
let currentDiceLetter = null;

function switchToDiceChallenge() {
    document.getElementById('wordSafariArea').style.display = 'none';
    document.getElementById('regularGameArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'block';
    document.getElementById('diceRollStartArea').style.display = 'block';
    document.getElementById('challengeInputs').style.display = 'none';
    document.getElementById('challengeLetterDisplay').textContent = '?';
    clearInterval(challengeTimerInterval);
    challengeTimeLeft = 60;
    updateChallengeTimerDisplay();
    clearChallengeInputs();
}

function switchToWordSafari() {
    document.getElementById('wordSafariArea').style.display = 'block';
    document.getElementById('diceChallengeArea').style.display = 'none';
    document.getElementById('regularGameArea').style.display = 'none';
    startWordSafari(); // This calls loadDailySafariContent and displayPassportStamps
}

function displayJavaScriptBlockedMessage() {
    const appContent = document.getElementById('appContent');
    if (appContent) {
        appContent.innerHTML = '<p style="color: red;">JavaScript is disabled. Please enable it to play the game.</p>';
    }
}

// Check if JavaScript is enabled
if (typeof document.querySelector === 'undefined') {
    displayJavaScriptBlockedMessage();
}
