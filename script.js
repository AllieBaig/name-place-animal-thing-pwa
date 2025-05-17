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
const wordSafariData = {
    week1: {
        destination: "Africa",
        categories: ["Animal from Africa", "Place in Africa", "African Food", "African Landmark"]
    },
    week2: {
        destination: "Italy",
        categories: ["Animal native to Italy", "City in Italy", "Italian Dish", "Italian Historical Site"]
    },
    // Add more weekly data here...
};

let currentWeek = 1;
let passportStamps = localStorage.getItem('passportStamps') ? parseInt(localStorage.getItem('passportStamps')) : 0;

function initializeWordSafari() {
    const wordSafariArea = document.getElementById('wordSafariArea');
    if (wordSafariArea && getActiveGameMode() === 'wordSafari') {
        loadWeeklySafariContent();
        displayPassportStamps();
    }
}

function getActiveGameMode() {
    if (document.getElementById('wordSafariArea').style.display === 'block') {
        return 'wordSafari';
    } else if (document.getElementById('diceChallengeArea').style.display === 'block') {
        return 'diceChallenge';
    } else {
        return 'regular';
    }
}

function startWordSafari() {
    currentWeek = getCurrentWeekNumber();
    loadWeeklySafariContent();
    displayPassportStamps();
}

function getCurrentWeekNumber() {
    const startDate = new Date('2025-05-17T00:00:00Z');
    const today = new Date();
    const timeDifference = today.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return Math.ceil(daysDifference / 7);
}

function loadWeeklySafariContent() {
    const currentWeekData = wordSafariData[`week${currentWeek}`] || wordSafariData.week1;
    document.getElementById('currentDestination').textContent = currentWeekData.destination;
    const categories = currentWeekData.categories;
    document.getElementById('category1Label').textContent = categories[0] + ":";
    document.getElementById('category2Label').textContent = categories[1] + ":";
    document.getElementById('category3Label').textContent = categories[2] + ":";
    document.getElementById('category4Label').textContent = categories[3] + ":";
}

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
function rollDiceStart() { /* ... */ }
function submitChallenge() { /* ... */ }

// --- Game Mode Switch Functions ---
function switchToRegularGame() { /* ... */ }
function switchToDiceChallenge() { /* ... */ }
function switchToWordSafari() { /* ... */ }

// --- Function to Generate Wireframe Image ---
function generateWireframeImage(week) {
    const appContent = document.getElementById('appContent');
    if (appContent) {
        // Temporarily show the Word Safari area and hide others for Week 10
        if (week === 10) {
            switchToWordSafari();
            startWordSafari(); // Ensure content is loaded
            document.getElementById('regularGameArea').style.display = 'none';
            document.getElementById('diceChallengeArea').style.display = 'none';
        } else if (week === 1) {
            document.getElementById('wordSafariArea').style.display = 'none';
            document.getElementById('diceChallengeArea').style.display = 'none';
            document.getElementById('regularGameArea').style.display = 'block'; // Show regular for Week 1
        }

        // Basic styling to make the wireframe more visible
        const originalStyles = appContent.style.border;
        appContent.style.border = '2px solid black';
        appContent.style.padding = '10px';
        appContent.style.backgroundColor = '#f0f0f0';

        html2canvas(appContent).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            console.log(`Wireframe Image (Week ${week}):`, imgData);

            // Revert styles
            appContent.style.border = originalStyles;
            appContent.style.padding = '';
            appContent.style.backgroundColor = '';

            // You can optionally display the image in the DOM for testing:
            // const img = document.createElement('img');
            // img.src = imgData;
            // document.body.appendChild(img);
        });
    } else {
        console.error("App content element not found.");
    }
}
