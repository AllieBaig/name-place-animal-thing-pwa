// wordRelic.js

import { getRandomElement } from './utils.js';
import { attachSafeClickListener, logError } from './error-handler.js'; // Import error handling

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
    // Add more word relics here...
];

let currentRelic = null;
let hasGuessedCategory = false;

function getRandomRelic() {
    return getRandomElement(dailyRelics);
}

function displayRelicClue() {
    try {
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
    } catch (error) {
        console.error("Error displaying relic clue:", error);
        logError(`Error displaying relic clue: ${error.message}`);
    }
}

function selectCategory(category) {
    try {
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
    } catch (error) {
        console.error(`Error selecting category "${category}":`, error);
        logError(`Error selecting category "${category}": ${error.message}`);
    }
}

function restoreRelic() {
    try {
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
                infoHTML += `<button onclick="playPronunciation('${currentRelic.pronunciation}')">Pronounce</button>`; // Keeping onclick as per previous implementation
                infoHTML += `<p><strong>Rarity:</strong> ${currentRelic.rarity}</p>`;
                let bonusPoints = 0;
                if (currentRelic.rarity === 'rare') bonusPoints = 20;
                if (currentRelic.rarity === 'uncommon') bonusPoints = 10;
                infoHTML += `<p><strong>Bonus Points:</strong> +${bonusPoints}</p>`;

                if (relicInfoArea) {
                    relicInfoArea.innerHTML = infoHTML;
                    relicInfoArea.style.display = 'block';
                }
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
    } catch (error) {
        console.error("Error restoring relic:", error);
        logError(`Error restoring relic: ${error.message}`);
    }
}

// Placeholder for audio playback function (keeping onclick for now)
function playPronunciation(audioFile) {
    console.log(`Playing pronunciation: ${audioFile}`);
    // You'll need to implement actual audio playback here
}

function initializeWordRelic() {
    const findRelicButton = document.getElementById('findRelicBtn');
    if (findRelicButton) {
        attachSafeClickListener(findRelicButton, displayRelicClue, 'findRelicBtn');
    }

    const categoryButtons = document.querySelectorAll('#categoryGuessArea button');
    categoryButtons.forEach(button => {
        attachSafeClickListener(button, function() {
            selectCategory(this.textContent);
        }, `categoryButton-${this.textContent}`);
    });

    const restoreButton = document.getElementById('restoreRelicBtn');
    if (restoreButton) {
        attachSafeClickListener(restoreButton, restoreRelic, 'restoreRelicBtn');
    }
}

export { initializeWordRelic, displayRelicClue, selectCategory, restoreRelic };
