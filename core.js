// core.js

import * as gameNav from './gameNavigation.js';
import * as regularGame from './regularGame.js';
import * as diceChallenge from './diceChallenge.js';
import * as wordSafari from './wordSafari.js';
import * as wordRelic from './wordRelic.js';
import * as auth from './auth.js';
import * as uiUpdates from './uiUpdates.js';
import { attachSafeClickListener, attachSafeTouchStartListener, logError } from './error-handler.js'; // Import error handling

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is fully loaded and parsed');

    // --- Navigation Buttons ---
    const regularGameButton = document.getElementById('regularGameBtn');
    if (regularGameButton) {
        attachSafeClickListener(regularGameButton, navigateToRegularGame, 'regularGameBtn');
    }

    const diceChallengeButton = document.getElementById('diceChallengeBtn');
    if (diceChallengeButton) {
        attachSafeClickListener(diceChallengeButton, navigateToDiceChallenge, 'diceChallengeBtn');
    }

    const wordSafariButton = document.getElementById('wordSafariBtn');
    if (wordSafariButton) {
        attachSafeClickListener(wordSafariButton, navigateToWordSafari, 'wordSafariBtn');
    }

    const wordRelicButton = document.getElementById('wordRelicBtn');
    if (wordRelicButton) {
        attachSafeClickListener(wordRelicButton, navigateToWordRelic, 'wordRelicBtn');
    }

    // --- Game Mode Initialization (Move initialization calls here) ---
    // Regular Game (Listeners within regularGame.js)
    const playWithComputerCheckbox = document.getElementById('playWithComputer');
    if (playWithComputerCheckbox) {
        // Example of attaching a listener using the safe function
        playWithComputerCheckbox.addEventListener('change', regularGame.handlePlayWithComputerChange);
    }
    const submitRegularButton = document.getElementById('submitRegularEntries');
    if (submitRegularButton) {
        attachSafeClickListener(submitRegularButton, regularGame.submitRegularGameEntries, 'submitRegularEntries');
    }

    // Dice Challenge (Listeners within diceChallenge.js)
    const rollDiceButton = document.getElementById('rollDiceBtn');
    if (rollDiceButton) {
        attachSafeClickListener(rollDiceButton, diceChallenge.rollDice, 'rollDiceBtn');
    }
    const submitDiceScoreButton = document.getElementById('submitDiceScoreBtn');
    if (submitDiceScoreButton) {
        attachSafeClickListener(submitDiceScoreButton, diceChallenge.submitDiceScore, 'submitDiceScoreBtn');
    }
    document.querySelectorAll('.dice-choice').forEach(dice => {
        dice.addEventListener('click', diceChallenge.toggleHold);
    });

    // Word Safari (Initialization within wordSafari.js)
    wordSafari.initializeWordSafari();
    const submitSafariWordButton = document.getElementById('submitSafariWordBtn');
    if (submitSafariWordButton) {
        attachSafeClickListener(submitSafariWordButton, wordSafari.submitWord, 'submitSafariWordBtn');
    }

    // Word Relic (Initialization within wordRelic.js)
    wordRelic.initializeWordRelic();
    const findRelicButton = document.getElementById('findRelicBtn');
    if (findRelicButton) {
        attachSafeClickListener(findRelicButton, wordRelic.displayRelicClue, 'findRelicBtn');
    }
    document.querySelectorAll('#categoryGuessArea button').forEach(button => {
        attachSafeClickListener(button, function() {
            wordRelic.selectCategory(this.textContent);
        }, `categoryButton-${this.textContent}`);
    });
    const restoreRelicButton = document.getElementById('restoreRelicBtn');
    if (restoreRelicButton) {
        attachSafeClickListener(restoreRelicButton, wordRelic.restoreRelic, 'restoreRelicBtn');
    }

    // --- Initial UI Setup ---
    gameNav.switchToRegularGame(); // Default view on load (can be changed)
    auth.handleGuestLogin();
    uiUpdates.displayEntries();
    uiUpdates.displayScores();
});

// --- Navigation Functions ---
function navigateToRegularGame() {
    gameNav.switchToRegularGame();
    regularGame.startRegularGameTimer(); // Start timer when navigating to regular game
}

function navigateToDiceChallenge() {
    gameNav.switchToDiceChallenge();
    diceChallenge.resetDiceGame();
}

function navigateToWordSafari() {
    gameNav.switchToWordSafari();
    wordSafari.startGame();
}

function navigateToWordRelic() {
    gameNav.switchToWordRelic();
    // Initialization of Word Relic is done in the DOMContentLoaded
}
