document.addEventListener('DOMContentLoaded', () => {
    const guestId = localStorage.getItem('guestId');
    const appContent = document.getElementById('appContent');
    const loginOptions = document.getElementById('loginOptions');

    if (guestId) {
        loginOptions.style.display = 'none';
        appContent.style.display = 'block';
        loadEntries();
        initializeWordSafari();
        generateWireframeImage(10); // Generate the Week 10 wireframe on load
    } else {
        generateWireframeImage(1); // Generate the Week 1 wireframe if not logged in
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
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const allCategories = ['Name', 'Place', 'Animal', 'Thing', 'Film', 'TV Show', 'Book', 'Song'];
const scrabbleLetterValues = { /* ... */ };

// --- Word Safari Specific Data ---
const wordSafariData = { /* ... */ };

let currentWeek = 1;
let passportStamps = localStorage.getItem('passportStamps') ? parseInt(localStorage.getItem('passportStamps')) : 0;

function initializeWordSafari() { /* ... */ }
function getActiveGameMode() { /* ... */ }
function startWordSafari() { /* ... */ }
function getCurrentWeekNumber() { /* ... */ }
function loadWeeklySafariContent() { /* ... */ }
function submitSafariEntries() { /* ... */ }
function displayPassportStamps() { /* ... */ }

// --- Regular Game Functions ---
function guestLogin() { /* ... */ }
function updateInputPlaceholder() { /* ... */ }
const computerEntries = { /* ... */ };
const diceFaces = [ /* ... */ ];
let currentDiceFaceIndex = 0;
function rollDice() { /* ... */ }
function calculateScore(word) { /* ... */ }
function addItem(player) { /* ... */ }
function computerAddItem(category, playerEntry) { /* ... */ }
function displayEntries() { /* ... */ }
function displayScores() { /* ... */ }
function loadEntries() { /* ... */ }

// --- Dice Challenge Functions ---
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

// --- Game Mode Switch Functions ---
function switchToRegularGame() { /* ... */ }
function switchToDiceChallenge() { /* ... */ }
function switchToWordSafari() { /* ... */ }

// --- Function to Generate Wireframe Image ---
function generateWireframeImage(week) { /* ... */ }
