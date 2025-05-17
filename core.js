/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 AllieBaig
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/AllieBaig/name-place-animal-thing-pwa/blob/main/LICENSE
 */

import * as auth from './auth.js';
import * as gameNav from './gameNavigation.js';
import * as regularGame from './regularGame.js';
import * as ui from './uiUpdates.js';
import * as diceChallenge from './diceChallenge.js'; // Import the diceChallenge module
import { loadEntries } from './game-logic.js';
import { displayScores } from './game-ui.js';
import './serviceWorkerRegistration.js';

document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    displayScores();

    const guestLoginButton = document.getElementById('guestLoginBtn');
    if (guestLoginButton) {
        guestLoginButton.addEventListener('click', handleGuestLogin);
    }

    const regularGameButton = document.getElementById('regularGameBtn');
    if (regularGameButton) {
        regularGameButton.addEventListener('click', navigateToRegularGame);
    }

    const diceChallengeButton = document.getElementById('diceChallengeBtn');
    if (diceChallengeButton) {
        diceChallengeButton.addEventListener('click', handleNavigateToDiceChallenge); // Use wrapper
    }

    const wordSafariButton = document.getElementById('wordSafariBtn');
    if (wordSafariButton) {
        wordSafariButton.addEventListener('click', navigateToWordSafari);
    }

    const rollDiceButton = document.getElementById('rollDiceBtn');
    if (rollDiceButton) {
        rollDiceButton.addEventListener('click', handleRollDice); // Use wrapper
    }
});

function handleGuestLogin() {
    auth.guestLogin();
}

function navigateToRegularGame() {
    gameNav.switchToRegularGame();
}

function handleNavigateToDiceChallenge() { // Wrapper for navigating to Dice
    gameNav.switchToDiceChallenge();
}

function navigateToWordSafari() {
    gameNav.switchToWordSafari();
}

function handleRollDice() { // Wrapper for calling rollDice
    diceChallenge.rollDice();
}

function startRegularGame() {
    regularGame.startRegularGameTimer();
}

function submitRegularEntries() {
    regularGame.submitRegularGameEntries();
}

function addRegularItem(category) {
    const itemInput = document.getElementById('item');
    if (itemInput) {
        regularGame.addItem('player', category, itemInput.value);
        itemInput.value = '';
    }
}

function displayJavaScriptBlockedMessage() {
    const appContent = document.getElementById('appContent');
    if (appContent) {
        appContent.innerHTML = '<p style="color: red;">JavaScript is disabled. Please enable it to play the game.</p>';
    }
}

if (typeof document.querySelector === 'undefined') {
    displayJavaScriptBlockedMessage();
}
