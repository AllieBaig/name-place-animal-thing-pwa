/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 AllieBaig
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/AllieBaig/name-place-animal-thing-pwa/blob/main/LICENSE
 */

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const appContent = document.getElementById('appContent');
    const loginOptions = document.getElementById('loginOptions');

    if (loggedInUser) {
        loginOptions.style.display = 'none';
        appContent.style.display = 'block';
        loadEntries();
        initializeWordSafari();
        generateWireframeImage(10);
    } else {
        // If not logged in, the login/register form will be visible
        generateWireframeImage(1); // Maybe a wireframe of the login area
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
