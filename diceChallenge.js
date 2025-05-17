// diceChallenge.js

let currentLetter = '?';
let challengeTimerInterval;
let timeLeft = 60;
const challengeLetterDisplay = document.getElementById('challengeLetterDisplay');
const challengeTimerDisplay = document.getElementById('challengeTimer');
const challengeInputsDiv = document.getElementById('challengeInputs');
const diceRollStartArea = document.getElementById('diceRollStartArea');
const diceChallengeResultsDiv = document.getElementById('diceChallengeResults');

function rollDice() {
    if (diceRollStartArea) {
        diceRollStartArea.style.display = 'none';
    }
    if (challengeInputsDiv) {
        challengeInputsDiv.style.display = 'block';
    }
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    currentLetter = alphabet[randomIndex];
    if (challengeLetterDisplay) {
        challengeLetterDisplay.textContent = currentLetter;
    }
    startChallengeTimer();
}

function startChallengeTimer() {
    timeLeft = 60;
    if (challengeTimerDisplay) {
        challengeTimerDisplay.textContent = timeLeft;
    }
    challengeTimerInterval = setInterval(() => {
        timeLeft--;
        if (challengeTimerDisplay) {
            challengeTimerDisplay.textContent = timeLeft;
        }
        if (timeLeft <= 0) {
            clearInterval(challengeTimerInterval);
            if (challengeInputsDiv) {
                challengeInputsDiv.style.display = 'none';
            }
            // Optionally display results or move to the next phase
            displayDiceChallengeResults();
        }
    }, 1000);
}

function submitDiceChallengeEntries() {
    clearInterval(challengeTimerInterval);
    const name = document.getElementById('nameChallenge').value.trim();
    const place = document.getElementById('placeChallenge').value.trim();
    const animal = document.getElementById('animalChallenge').value.trim();
    const thing = document.getElementById('thingChallenge').value.trim();

    const results = {
        Name: { entry: name, score: name.startsWith(currentLetter) ? 10 : 0 },
        Place: { entry: place, score: place.startsWith(currentLetter) ? 10 : 0 },
        Animal: { entry: animal, score: animal.startsWith(currentLetter) ? 10 : 0 },
        Thing: { entry: thing, score: thing.startsWith(currentLetter) ? 10 : 0 },
    };

    displayDiceChallengeResults(results);
}

function displayDiceChallengeResults(results) {
    let resultsHTML = '<h3>Dice Challenge Results:</h3>';
    if (results) {
        let totalScore = 0;
        for (const category in results) {
            resultsHTML += `<p>${category}: ${results[category].entry} (${results[category].score} points)</p>`;
            totalScore += results[category].score;
        }
        resultsHTML += `<h4>Total Score: ${totalScore}</h4>`;
    } else {
        resultsHTML += '<p>Time ran out! No entries submitted.</p>';
    }

    if (diceChallengeResultsDiv) {
        diceChallengeResultsDiv.innerHTML = resultsHTML;
    }
    if (diceRollStartArea) {
        diceRollStartArea.style.display = 'block'; // Allow another round
    }
    if (challengeInputsDiv) {
        challengeInputsDiv.style.display = 'none'; // Hide inputs after results
    }
}

// Initialization (if needed)
if (challengeInputsDiv) {
    challengeInputsDiv.style.display = 'none'; // Initially hide input fields
}
if (challengeLetterDisplay) {
    challengeLetterDisplay.textContent = currentLetter; // Initial display
}
if (challengeTimerDisplay) {
    challengeTimerDisplay.textContent = timeLeft; // Initial time
}

export { rollDice, submitDiceChallengeEntries };
