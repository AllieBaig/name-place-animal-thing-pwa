// wordSafari.js

import { getRandomElement } from './utils.js';
import { attachSafeClickListener, logError } from './error-handler.js'; // Import error handling
import * as uiUpdates from './uiUpdates.js'; // Potentially for displaying messages

const categories = ['Name', 'Place', 'Animal', 'Thing'];
let currentCategoryIndex = 0;
let currentWords = [];
let submittedWords = [];
const wordsPerCategory = 5; // Adjust as needed

function startGame() {
    currentCategoryIndex = 0;
    submittedWords = [];
    currentWords = generateWordsForCategory(categories[currentCategoryIndex]);
    updateCategoryDisplay();
    updateSubmittedWordsDisplay();
    document.getElementById('wordSafariInput').value = '';
    document.getElementById('submitSafariWordBtn').disabled = false;
}

function generateWordsForCategory(category) {
    // Replace this with your actual word list retrieval logic,
    // possibly from safari-content.js or an API
    const allWords = getWordsForCategory(category); // Assume this function exists
    if (allWords && allWords.length > wordsPerCategory) {
        const shuffled = [...allWords].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, wordsPerCategory);
    } else if (allWords) {
        return [...allWords];
    } else {
        return [];
    }
}

// Assume this function exists in safari-content.js or elsewhere
function getWordsForCategory(category) {
    // Example placeholder:
    if (category === 'Name') return ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fiona'];
    if (category === 'Place') return ['London', 'Paris', 'Tokyo', 'Sydney', 'Rome', 'Berlin'];
    if (category === 'Animal') return ['Cat', 'Dog', 'Elephant', 'Lion', 'Tiger', 'Zebra'];
    if (category === 'Thing') return ['Table', 'Chair', 'Book', 'Pen', 'Computer', 'Phone'];
    return [];
}

function submitWord() {
    const wordInput = document.getElementById('wordSafariInput');
    const word = wordInput.value.trim();

    if (word) {
        if (currentWords.map(w => w.toLowerCase()).includes(word.toLowerCase()) && !submittedWords.map(w => w.toLowerCase()).includes(word.toLowerCase())) {
            submittedWords.push(word);
            updateSubmittedWordsDisplay();
            wordInput.value = '';
            if (submittedWords.length === currentWords.length) {
                endCategory();
            }
        } else {
            // Consider providing feedback to the user about incorrect or duplicate words
            console.log("Incorrect or duplicate word:", word);
            // Optionally display a message to the user using uiUpdates
            if (uiUpdates && uiUpdates.displayMessage) {
                uiUpdates.displayMessage("Incorrect or duplicate word. Try again.", 'warning');
            }
        }
    }
}

function endCategory() {
    if (currentCategoryIndex < categories.length - 1) {
        currentCategoryIndex++;
        currentWords = generateWordsForCategory(categories[currentCategoryIndex]);
        submittedWords = [];
        updateCategoryDisplay();
        updateSubmittedWordsDisplay();
        document.getElementById('wordSafariInput').value = '';
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById('wordSafariArea').style.display = 'none';
    // Display final score or navigate to a results screen
    console.log("Word Safari Ended! Submitted words:", submittedWords);
    if (uiUpdates && uiUpdates.displayMessage) {
        uiUpdates.displayMessage("Word Safari Ended!", 'success');
    }
    // You might want to calculate a score based on submitted words
}

function updateCategoryDisplay() {
    const categoryDisplay = document.getElementById('currentSafariCategory');
    if (categoryDisplay) {
        categoryDisplay.textContent = `Category: ${categories[currentCategoryIndex]}`;
    }
}

function updateSubmittedWordsDisplay() {
    const submittedWordsList = document.getElementById('submittedSafariWords');
    if (submittedWordsList) {
        submittedWordsList.innerHTML = submittedWords.map(word => `<li>${word}</li>`).join('');
    }
}

function initializeWordSafari() {
    const submitSafariWordButton = document.getElementById('submitSafariWordBtn');
    if (submitSafariWordButton) {
        attachSafeClickListener(submitSafariWordButton, submitWord, 'submitSafariWordBtn');
    }
    // The startGame function can be called when navigating to the Word Safari area
}

export { startGame, initializeWordSafari, submitWord };
