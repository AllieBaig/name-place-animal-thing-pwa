function rollDiceStart() {
    const diceLetterSpan = document.getElementById('diceStartLetter');
    const challengeInputs = document.getElementById('challengeInputs');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    currentDiceLetter = alphabet[randomIndex];
    diceLetterSpan.textContent = currentDiceLetter;
    document.getElementById('challengeLetterDisplay').textContent = currentDiceLetter;
    document.getElementById('diceRollStartArea').style.display = 'none';
    challengeInputs.style.display = 'block';
    startTimer();
}

let timerInterval;
let timeLeft = 60; // 1 minute default

function startTimer() {
    timeLeft = 60;
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.textContent = formatTime(timeLeft);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Submit your entries.");
            submitChallenge(); // Optionally auto-submit
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function submitChallenge() {
    clearInterval(timerInterval);
    const nameEntry = document.getElementById('nameEntry').value.trim();
    const placeEntry = document.getElementById('placeEntry').value.trim();
    const animalEntry = document.getElementById('animalEntry').value.trim();
    const thingEntry = document.getElementById('thingEntry').value.trim();

    console.log("Dice Challenge Entries:", nameEntry, placeEntry, animalEntry, thingEntry, "Starting Letter:", currentDiceLetter);
    alert("Dice Challenge entries submitted! Scoring will be implemented later.");
    // In future: Score based on starting letter and validity
}

const diceFaces = [
    ` _____ `, `|     |`, `|  •  |`, `|_____|`,
    ` _____ `, `| •   |`, `|     |`, `|   • |`, `|_____|`,
    ` _____ `, `| •   |`, `|  •  |`, `|   • |`, `|_____|`,
    ` _____ `, `| • • |`, `|     |`, `| • • |`, `|_____|`,
    ` _____ `, `| • • |`, `|  •  |`, `| • • |`, `|_____|`,
    ` _____ `, `| • • |`, `| • • |`, `| • • |`, `|_____|`,
];

let currentDiceFaceIndex = 0;

function rollDice() {
    const diceLetterSpan = document.getElementById('diceLetter');
    const intervalId = setInterval(() => {
        diceLetterSpan.textContent = diceFaces[currentDiceFaceIndex % diceFaces.length];
        currentDiceFaceIndex++;
    }, 100);

    setTimeout(() => {
        clearInterval(intervalId);
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        currentDiceLetter = alphabet[randomIndex];
        diceLetterSpan.textContent = currentDiceLetter;
        const itemInput = document.getElementById('item');
        itemInput.placeholder = `Enter a Name starting with ${currentDiceLetter}`;
    }, 1500);
}
