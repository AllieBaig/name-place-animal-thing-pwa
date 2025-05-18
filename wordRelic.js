

import { getRandomElement } from './utils.js'; // Assuming you have a utility function for this

const dailyRelics = [
    {
        word: "watch",
        category: "Thing",
        clue: "I’m something you wear, but I’m not clothing. I measure your moments.",
        lore: "This relic was used by the Timekeepers of Aralon.",
        pronunciation: "watch.mp3", // Placeholder for audio file
        definition: "A small timepiece worn typically on a strap on one's wrist.",
        rarity: "common"
    },
    {
        word: "maple",
        category: "Thing", // Could also be Place or Name depending on context
        clue: "I have leaves that change color in the fall, and my syrup is sweet.",
        lore: "The ancient scrolls speak of the Great Maple of Eldoria, a source of wisdom.",
        pronunciation: "maple.mp3",
        definition: "A deciduous tree with lobed leaves and winged fruits, known for its syrup.",
        rarity: "common"
    },
    {
        word: "chronometer",
        category: "Thing",
        clue: "A very precise instrument, often used at sea for navigation.",
        lore: "The Starfarers of Xylos relied on these to chart their courses through the cosmos.",
        pronunciation: "chronometer.mp3",
        definition: "An exceptionally precise timekeeping instrument, especially one used for determining longitude at sea.",
        rarity: "rare"
    },
    {
        word: "sphinx",
        category: "Animal", // Or Thing/Name depending on interpretation
        clue: "I have the head of a human and the body of a lion, and I often guard secrets.",
        lore: "The riddles of the Sphinx of Aegyptus are legendary, testing the wit of all who dare approach.",
        pronunciation: "sphinx.mp3",
        definition: "A mythical creature with a lion's body and a human or animal head.",
        rarity: "uncommon"
    },
    {
        word: "aurora",
        category: "Place", // Or Thing depending on interpretation
        clue: "A natural light display in the sky, often seen in polar regions.",
        lore: "The celestial dancers of Borealis were said to be spirits creating these vibrant curtains of light.",
        pronunciation: "aurora.mp3",
        definition: "A natural electrical phenomenon characterized by the appearance of streamers of reddish or greenish light in the sky, usually near the northern or southern magnetic pole.",
        rarity: "uncommon"
    },
    // Add more word relics here...
];

let currentRelic = null;
let hasGuessedCategory = false;

function getRandomRelic() {
    return getRandomElement(dailyRelics);
}

function displayRelicClue() {
    currentRelic = getRandomRelic();
    hasGuessedCategory = false;
    const relicClueElement = document.getElementById('relicClue');
    const categoryGuessArea = document.getElementById('categoryGuessArea');
    const wordGuessInput = document.getElementById('wordGuess');
    const restoreButton = document.getElementById('restoreRelicBtn');
    const relicInfoArea = document.getElementById('relicInfo');

    if (relicClueElement && currentRelic) {
        relicClueElement.textContent = currentRelic.clue;
    }
    if (categoryGuessArea) {
        categoryGuessArea.style.display = 'block';
    }
    if (wordGuessInput) {
        wordGuessInput.value = '';
    }
    if (restoreButton) {
        restoreButton.disabled = true;
    }
    if (relicInfoArea) {
        relicInfoArea.innerHTML = '';
        relicInfoArea.style.display = 'none';
    }
}

function selectCategory(category) {
    if (currentRelic && !hasGuessedCategory) {
        const selectedCategoryElement = document.getElementById('selectedCategory');
        if (selectedCategoryElement) {
            selectedCategoryElement.textContent = `Category Guess: ${category}`;
        }
        hasGuessedCategory = true;
        const restoreButton = document.getElementById('restoreRelicBtn');
        if (restoreButton) {
            restoreButton.disabled = false;
        }
    }
}

function restoreRelic() {
    if (currentRelic && hasGuessedCategory) {
        const wordGuessInput = document.getElementById('wordGuess');
        const guessedWord = wordGuessInput.value.trim().toLowerCase();
        const selectedCategoryElement = document.getElementById('selectedCategory');
        const guessedCategory = selectedCategoryElement.textContent.split(': ')[1];
        const relicInfoArea = document.getElementById('relicInfo');

        if (guessedWord === currentRelic.word.toLowerCase() && guessedCategory === currentRelic.category) {
            let infoHTML = `<h3>Relic Restored!</h3>`;
            infoHTML += `<p><strong>Word:</strong> ${currentRelic.word}</p>`;
            infoHTML += `<p><strong>Category:</strong> ${currentRelic.category}</p>`;
            infoHTML += `<p><strong>Definition:</strong> ${currentRelic.definition}</p>`;
            infoHTML += `<p><strong>Lore:</strong> ${currentRelic.lore}</p>`;
            // Add audio pronunciation playback here if you have the audio files
            infoHTML += `<button onclick="playPronunciation('${currentRelic.pronunciation}')">Pronounce</button>`;
            infoHTML += `<p><strong>Rarity:</strong> ${currentRelic.rarity}</p>`;
            // Award bonus points based on rarity (you'll need to integrate this with your scoring system)
            let bonusPoints = 0;
            if (currentRelic.rarity === 'rare') bonusPoints = 20;
            if (currentRelic.rarity === 'uncommon') bonusPoints = 10;
            infoHTML += `<p><strong>Bonus Points:</strong> +${bonusPoints}</p>`;

            if (relicInfoArea) {
                relicInfoArea.innerHTML = infoHTML;
                relicInfoArea.style.display = 'block';
            }
            // Optionally disable further interaction with this relic for the day
            const categoryGuessArea = document.getElementById('categoryGuessArea');
            const wordGuessInput = document.getElementById('wordGuess');
            const restoreButton = document.getElementById('restoreRelicBtn');
            if (categoryGuessArea) categoryGuessArea.style.display = 'none';
            if (wordGuessInput) wordGuessInput.disabled = true;
            if (restoreButton) restoreButton.disabled = true;

        } else {
            if (relicInfoArea) {
                relicInfoArea.innerHTML = `<p style="color: red;">Incorrect guess! Try again tomorrow for a new relic.</p>`;
                relicInfoArea.style.display = 'block';
            }
        }
    } else if (!hasGuessedCategory) {
        alert("Please select a category before trying to restore the relic.");
    }
}

// Placeholder for audio playback function
function playPronunciation(audioFile) {
    console.log(`Playing pronunciation: ${audioFile}`);
    // You'll need to implement actual audio playback here using an <audio> element or Web Audio API
}

// Initialization (call this when the Word Relic mode is loaded)
function initializeWordRelic() {
    const relicButton = document.getElementById('findRelicBtn');
    if (relicButton) {
        relicButton.addEventListener('click', displayRelicClue);
    }

    const categoryButtons = document.querySelectorAll('#categoryGuessArea button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectCategory(this.textContent);
        });
    });

    const restoreButton = document.getElementById('restoreRelicBtn');
    if (restoreButton) {
        restoreButton.addEventListener('click', restoreRelic);
    }

    // Optionally, you could check if a relic was already attempted today and show a message
}

export { initializeWordRelic };

2. Update index.html:
Open your index.html file and paste the following HTML code within the <div id="appContent" style="display: none;"> section, ideally after the "Word Safari" area or wherever you want the "Mystery Word Relic" section to appear:
        <div id="wordRelicArea" style="display: none;">
            <h2>Mystery Word Relic</h2>
            <p id="relicClue"></p>

            <div id="categoryGuessArea" style="display: none;">
                <p>Guess the Category:</p>
                <button>Name</button>
                <button>Place</button>
                <button>Animal</button>
                <button>Thing</button>
                <p id="selectedCategory"></p>
            </div>

            <div id="wordGuessArea">
                <label for="wordGuess">Your Word Guess:</label>
                <input type="text" id="wordGuess">
                <button id="restoreRelicBtn" disabled>Restore Relic</button>
            </div>

            <div id="relicInfo" style="display: none;">
                </div>

            <button id="findRelicBtn">Find Today's Relic</button>
        </div>

3. Update core.js:
Open your core.js file and make the following changes:
 * Import wordRelic.js: Add the following import statement at the top of the file:
   import * as wordRelic from './wordRelic.js';

 * Add a button to navigate to the Word Relic mode: In your index.html (within the appContent div), add a button like this:
   <button id="wordRelicBtn">Play Word Relic</button>

 * Add an event listener for the new button in core.js: In the DOMContentLoaded listener in core.js, add:
   const wordRelicButton = document.getElementById('wordRelicBtn');
if (wordRelicButton) {
    wordRelicButton.addEventListener('click', navigateToWordRelic);
}

 * Add a function to handle navigation to the Word Relic mode in gameNavigation.js: Open gameNavigation.js and add:
   function switchToWordRelic() {
    document.getElementById('regularGameArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'none';
    document.getElementById('wordSafariArea').style.display = 'none';
    document.getElementById('wordRelicArea').style.display = 'block'; // Show Word Relic
}

export { switchToRegularGame, switchToDiceChallenge, switchToWordSafari, switchToWordRelic };

 * Call initializeWordRelic() when the Word Relic area is shown: Update the navigateToWordRelic function in core.js:
   function navigateToWordRelic() {
    gameNav.switchToWordRelic();
    wordRelic.initializeWordRelic(); // Initialize Word Relic functionality
}

Important Considerations:
 * utils.js: Make sure you have a utils.js file with a getRandomElement function that looks something like this:
   // utils.js
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export { getRandomElement };

