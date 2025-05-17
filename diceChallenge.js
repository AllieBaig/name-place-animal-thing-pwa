/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 [Your GitHub Username]
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/[Your GitHub Username]/name-place-animal-thing-pwa/blob/main/LICENSE
 */

let challengeLetter = null;
let timerInterval;
let timeLeft = 60;

function rollDiceStart() {
    document.getElementById('diceRollStartArea').style.display = 'none';
    document.getElementById('challengeInputs').style.display = 'block';
    challengeLetter = getRandomLetter();
    document.getElementById('diceStartLetter').textContent = challengeLetter.toUpperCase();
    startTimer();
}

function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function startTimer() {
    timeLeft = 60;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            // Optionally disable inputs or show results
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`;
}

function submitChallenge() {
    clearInterval(timerInterval);
    const nameEntry = document.getElementById('nameEntry').value.trim();
    const placeEntry = document.getElementById('placeEntry').value.trim();
    const animalEntry = document.getElementById('animalEntry').value.trim();
    const thingEntry = document.getElementById('thingEntry').value.trim();

    console.log("Dice Challenge Submitted:");
    console.log("Letter:", challengeLetter);
    console.log("Name:", nameEntry);
    console.log("Place:", placeEntry);
    console.log("Animal:", animalEntry);
    console.log("Thing:", thingEntry);

    alert("Challenge submitted! Scoring will be added later.");
    // Add logic to check if entries start with the correct letter and award points
}
