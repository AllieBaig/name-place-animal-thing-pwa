// regularGame.js

import { calculateScore } from './game-logic.js';
import { displayEntries, displayScores } from './uiUpdates.js';
import { attachSafeClickListener, logError } from './error-handler.js'; // Import error handling

let regularGameTimerInterval;
let regularGameTimeLeft = 30; // Time limit in seconds
let playerScore = localStorage.getItem('playerScore') ? parseInt(localStorage.getItem('playerScore')) : 0;
let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;

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
    if (playWithComputerCheckbox && !playWithComputerCheckbox.__safeClickListenerAttached) {
        playWithComputerCheckbox.addEventListener('change', handlePlayWithComputerChange);
        playWithComputerCheckbox.__safeClickListenerAttached = true; // Prevent duplicate attachment
    }
    displayEntries(); // Ensure entries are displayed when switching back
    displayScores(); // Ensure scores are displayed
    startRegularGameTimer(); // Start timer when navigating to regular game
}

function handlePlayWithComputerChange(event) {
    console.log("Play with computer:", event.target.checked);
    // Add any logic you need to handle the checkbox change
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

        // Clear input fields (assuming these IDs exist in your HTML)
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
        localStorage.setItem('playerScore', playerScore.toString());
        localStorage.setItem('computerScore', computerScore.toString());
        displayScores();
    }
}

export {
    startRegularGameTimer,
    updateRegularGameTimerDisplay,
    switchToRegularGame,
    submitRegularGameEntries,
    addItemRegularGame,
    handlePlayWithComputerChange // Export the handler if needed elsewhere
};
