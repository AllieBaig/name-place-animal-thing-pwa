// game-ui.js

import { attachSafeClickListener, logError } from './error-handler.js';

// --- Functions to update the UI ---

function displayMessage(message, type = 'info') {
    const messageArea = document.getElementById('gameMessageArea');
    if (messageArea) {
        messageArea.textContent = message;
        messageArea.className = `message ${type}`; // e.g., message info, message warning, message error
    } else {
        console.warn("Warning: gameMessageArea element not found.");
        logError("Warning: gameMessageArea element not found when trying to display message.");
    }
}

function clearMessage() {
    const messageArea = document.getElementById('gameMessageArea');
    if (messageArea) {
        messageArea.textContent = '';
        messageArea.className = 'message';
    }
}

function updateScoreDisplay(playerScore, computerScore) {
    const playerScoreDisplay = document.getElementById('playerScore');
    const computerScoreDisplay = document.getElementById('computerScore');
    if (playerScoreDisplay) {
        playerScoreDisplay.textContent = playerScore;
    }
    if (computerScoreDisplay) {
        computerScoreDisplay.textContent = computerScore;
    }
}

function displayEntries() {
    const entriesDisplay = document.getElementById('gameEntries');
    if (entriesDisplay) {
        const guestId = localStorage.getItem('guestId');
        const savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};
        let entriesHTML = '';
        if (savedEntries[guestId]) {
            for (const category in savedEntries[guestId]) {
                entriesHTML += `<h3>${category}</h3><ul>`;
                savedEntries[guestId][category].forEach(entry => {
                    entriesHTML += `<li>${entry.user}: ${entry.value}</li>`;
                });
                entriesHTML += `</ul>`;
            }
        }
        entriesDisplay.innerHTML = entriesHTML;
    } else {
        console.warn("Warning: gameEntries element not found.");
        logError("Warning: gameEntries element not found when trying to display entries.");
    }
}

function displayScores() {
    const playerScoreDisplay = document.getElementById('playerScore');
    const computerScoreDisplay = document.getElementById('computerScore');
    const storedPlayerScore = localStorage.getItem('playerScore');
    const storedComputerScore = localStorage.getItem('computerScore');

    if (playerScoreDisplay) {
        playerScoreDisplay.textContent = storedPlayerScore !== null ? storedPlayerScore : 0;
    } else {
        console.warn("Warning: playerScore element not found.");
        logError("Warning: playerScore element not found when trying to display player score.");
    }

    if (computerScoreDisplay) {
        computerScoreDisplay.textContent = storedComputerScore !== null ? storedComputerScore : 0;
    } else {
        console.warn("Warning: computerScore element not found.");
        logError("Warning: computerScore element not found when trying to display computer score.");
    }
}

// --- Example of attaching a safe click listener to a UI button ---
function attachUIListeners() {
    const clearEntriesButton = document.getElementById('clearEntriesBtn');
    if (clearEntriesButton) {
        attachSafeClickListener(clearEntriesButton, handleClearEntriesClick, 'clearEntriesBtn');
    }

    // Add more button listener attachments here using attachSafeClickListener
}

function handleClearEntriesClick() {
    try {
        const guestId = localStorage.getItem('guestId');
        if (guestId && localStorage.getItem('pwaEntries')) {
            const savedEntries = JSON.parse(localStorage.getItem('pwaEntries'));
            delete savedEntries[guestId];
            localStorage.setItem('pwaEntries', JSON.stringify(savedEntries));
            displayEntries();
            displayMessage("Entries cleared.", 'info');
        } else {
            displayMessage("No entries to clear.", 'warning');
        }
    } catch (error) {
        console.error("Error clearing entries:", error);
        logError(`Error clearing entries: ${error.message}`);
        displayMessage("Error clearing entries.", 'error');
    }
}

// Call this function when the DOM is loaded or when the UI needs to be initialized
document.addEventListener('DOMContentLoaded', attachUIListeners);

export { displayMessage, clearMessage, updateScoreDisplay, displayEntries, displayScores };
