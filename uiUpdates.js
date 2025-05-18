// uiUpdates.js

import { attachSafeClickListener, logError } from './error-handler.js';

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

// --- Example of attaching a safe click listener to a UI button managed by uiUpdates ---
function attachUIListeners() {
    const showInstructionsButton = document.getElementById('showInstructionsBtn');
    if (showInstructionsButton) {
        attachSafeClickListener(showInstructionsButton, handleShowInstructionsClick, 'showInstructionsBtn');
    }

    // Add more button listener attachments here using attachSafeClickListener
}

function handleShowInstructionsClick() {
    try {
        const instructionsElement = document.getElementById('instructionsModal');
        if (instructionsElement) {
            instructionsElement.style.display = 'block';
        } else {
            console.warn("Warning: instructionsModal element not found.");
            logError("Warning: instructionsModal element not found when trying to show instructions.");
            displayMessage("Instructions not available.", 'warning');
        }
    } catch (error) {
        console.error("Error showing instructions:", error);
        logError(`Error showing instructions: ${error.message}`);
        displayMessage("Error displaying instructions.", 'error');
    }
}

// Call this function when the DOM is loaded or when UI listeners need to be set up
document.addEventListener('DOMContentLoaded', attachUIListeners);

export { displayEntries, displayScores, updateScoreDisplay, displayMessage, clearMessage };
