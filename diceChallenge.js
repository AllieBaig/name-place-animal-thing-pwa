// diceChallenge.js

import { getRandomNumber } from './utils.js';
import { attachSafeClickListener, logError } from './error-handler.js';

let dice = [];
let heldDice = [false, false, false, false, false];
let rollsLeft = 3;
let currentScore = 0;

function resetDiceGame() {
    dice = [0, 0, 0, 0, 0];
    heldDice = [false, false, false, false, false];
    rollsLeft = 3;
    currentScore = 0;
    updateDiceDisplay();
    updateRollsLeftDisplay();
    updateScoreDisplay();
    enableRollButton();
    disableSubmitButton();
    resetHoldButtons();
}

function rollDice() {
    if (rollsLeft > 0) {
        for (let i = 0; i < dice.length; i++) {
            if (!heldDice[i]) {
                dice[i] = getRandomNumber(1, 6);
            }
        }
        rollsLeft--;
        updateDiceDisplay();
        updateRollsLeftDisplay();
        if (rollsLeft === 0) {
            disableRollButton();
            enableSubmitButton();
        }
    }
}

function toggleHold(event) {
    const index = event.target.dataset.index;
    if (index !== undefined) {
        heldDice[index] = !heldDice[index];
        updateDiceHoldDisplay(index);
    }
}

function submitDiceScore() {
    // Basic scoring logic: sum of all dice
    currentScore = dice.reduce((sum, die) => sum + die, 0);
    updateScoreDisplay();
    disableRollButton();
    enableSubmitButton(); // Keep submit enabled for now
    // In a real game, you'd have more complex scoring rules
}

function updateDiceDisplay() {
    const diceElements = document.querySelectorAll('.dice');
    diceElements.forEach((die, index) => {
        die.textContent = dice[index];
    });
}

function updateRollsLeftDisplay() {
    const rollsLeftDisplay = document.getElementById('rollsLeft');
    if (rollsLeftDisplay) {
        rollsLeftDisplay.textContent = rollsLeft;
    }
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('diceScore');
    if (scoreDisplay) {
        scoreDisplay.textContent = currentScore;
    }
}

function updateDiceHoldDisplay(index) {
    const diceElement = document.querySelector(`.dice[data-index="${index}"]`);
    if (diceElement) {
        diceElement.classList.toggle('held');
    }
}

function enableRollButton() {
    const rollButton = document.getElementById('rollDiceBtn');
    if (rollButton) {
        rollButton.disabled = false;
    }
}

function disableRollButton() {
    const rollButton = document.getElementById('rollDiceBtn');
    if (rollButton) {
        rollButton.disabled = true;
    }
}

function enableSubmitButton() {
    const submitButton = document.getElementById('submitDiceScoreBtn');
    if (submitButton) {
        submitButton.disabled = false;
    }
}

function disableSubmitButton() {
    const submitButton = document.getElementById('submitDiceScoreBtn');
    if (submitButton) {
        submitButton.disabled = true;
    }
}

function resetHoldButtons() {
    const diceElements = document.querySelectorAll('.dice');
    diceElements.forEach(die => {
        die.classList.remove('held');
    });
}

function initializeDiceChallenge() {
    const rollDiceButton = document.getElementById('rollDiceBtn');
    if (rollDiceButton) {
        attachSafeClickListener(rollDiceButton, rollDice, 'rollDiceBtn');
    }

    const submitDiceScoreButton = document.getElementById('submitDiceScoreBtn');
    if (submitDiceScoreButton) {
        attachSafeClickListener(submitDiceScoreButton, submitDiceScore, 'submitDiceScoreBtn');
    }

    const diceElements = document.querySelectorAll('.dice');
    diceElements.forEach(die => {
        attachSafeClickListener(die, toggleHold, `dice-${die.dataset.index}`);
    });

    resetDiceGame(); // Initialize the game state
}

export { resetDiceGame, rollDice, toggleHold, submitDiceScore, initializeDiceChallenge };
