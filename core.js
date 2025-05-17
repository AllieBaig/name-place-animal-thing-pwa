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
import { loadEntries } from './game-logic.js'; // Assuming loadEntries is in game-logic.js
import { displayScores } from './game-ui.js';   // Assuming displayScores is in game-ui.js
import './serviceWorkerRegistration.js'; // Import for side effects (registration)

document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    displayScores(); // Use the imported displayScores
    // Potentially other initializations
});

// --- Authentication Functions (Moved to auth.js) ---
// Exported functions will be accessible via auth.functionName
// registerUser() {}
// loginUser() {}
// updateUIAfterLogin() {}
// guestLogin() {}

// --- Regular Game Functions (Moved to regularGame.js) ---
// Exported functions will be accessible via regularGame.functionName
// let regularGameTimerInterval;
// let regularGameTimeLeft = 30;
// startRegularGameTimer() {}
// updateRegularGameTimerDisplay() {}
// switchToRegularGame() {}
// submitRegularGameEntries() {}
// addItemRegularGame() {}
// computerTurnRegularGame() {}
// computerAddItemRegularGame() {}

// --- UI Update Functions (Moved to uiUpdates.js) ---
// Exported functions will be accessible via ui.functionName
// displayEntries() {}
// displayScores() {}
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

// --- Game Navigation Functions (Moved to gameNavigation.js) ---
// Exported functions will be accessible via gameNav.functionName
// switchToDiceChallenge() {}
// switchToWordSafari() {}
