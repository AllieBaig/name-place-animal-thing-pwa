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
import { loadEntries } from './game-logic.js';
import { displayScores } from './game-ui.js';
import './serviceWorkerRegistration.js';

document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    displayScores();
    // Potentially other initializations
});

function handleRegistration() {
    auth.registerUser();
}

function handleLogin() {
    auth.loginUser();
}

function handleGuestLogin() {
    auth.guestLogin();
}

function navigateToRegularGame() {
    gameNav.switchToRegularGame();
}

function navigateToDiceChallenge() {
    gameNav.switchToDiceChallenge();
}

function navigateToWordSafari() {
    gameNav.switchToWordSafari();
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
        itemInput.value = ''; // Clear input after adding
        // Optionally update category selection if needed
    }
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
