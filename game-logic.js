/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 AllieBaig
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/[Your GitHub Username]/name-place-animal-thing-pwa/blob/main/LICENSE
 */

// game-logic.js

export function calculateScore(item) {
    if (!item) {
        return 0;
    }
    const firstLetter = item.trim().toLowerCase().charAt(0);
    if (!firstLetter.match(/[a-z]/i)) {
        return 0; // No points for non-alphabetic entries
    }
    if (uniqueFirstLetters.has(firstLetter)) {
        return 5;
    } else {
        return 10;
    }
}

// ... other functions in game-logic.js ...

function addItem(player) {
    const categoryDropdown = document.getElementById('category');
    const itemInput = document.getElementById('item');
    const selectedCategory = categoryDropdown.value;
    const newItem = itemInput.value.trim();
    const playWithComputer = document.getElementById('playWithComputer').checked;
    const diceMode = document.getElementById('diceMode').checked;

    if (newItem !== "") {
        if (diceMode && currentDiceLetter && !newItem.toLowerCase().startsWith(currentDiceLetter.toLowerCase())) {
            alert(`Your entry must start with the letter "${currentDiceLetter}" in Dice Mode!`);
            return;
        }

        const guestId = localStorage.getItem('guestId');
        let savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};

        if (!savedEntries[guestId]) {
            savedEntries[guestId] = {};
        }
        if (!savedEntries[guestId][selectedCategory]) {
            savedEntries[guestId][selectedCategory] = [];
        }

        savedEntries[guestId][selectedCategory].push({ user: player, value: newItem });
        localStorage.setItem('pwaEntries', JSON.stringify(savedEntries));

        itemInput.value = "";
        displayEntries(); // Moved to game-ui.js

        if (playWithComputer && player === 'player') {
            setTimeout(() => {
                let computerCategory = selectedCategory;
                while (computerCategory === selectedCategory) {
                    const randomIndex = Math.floor(Math.random() * allCategories.length);
                    computerCategory = allCategories[randomIndex];
                }
                computerAddItem(computerCategory, newItem);
            }, 1000);
        }
    }
}

function computerAddItem(category, playerEntry) {
    if (computerEntries[category] && computerEntries[category].length > 0) {
        let possibleEntries = computerEntries[category];
        if (document.getElementById('diceMode').checked && currentDiceLetter && category === 'Name') {
            possibleEntries = computerEntries[category].filter(entry => entry.toLowerCase().startsWith(currentDiceLetter.toLowerCase()));
            if (possibleEntries.length === 0) {
                possibleEntries = ["No Entry"];
            }
        }
        const randomIndex = Math.floor(Math.random() * possibleEntries.length);
        const computerItem = possibleEntries[randomIndex];

        const guestId = localStorage.getItem('guestId');
        let savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};

        if (!savedEntries[guestId]) {
            savedEntries[guestId] = {};
        }
        if (!savedEntries[guestId][category]) {
            savedEntries[guestId][category] = [];
        }

        savedEntries[guestId][category].push({ user: 'computer', value: computerItem });
        localStorage.setItem('pwaEntries', JSON.stringify(savedEntries));
        displayEntries(); // Moved to game-ui.js

        const playerScoreIncrement = calculateScore(playerEntry);
        const computerScoreIncrement = calculateScore(computerItem);
        playerScore += playerScoreIncrement;
        computerScore += computerScoreIncrement;
        displayScores(); // Moved to game-ui.js
    }
}

function loadEntries() {
    displayEntries(); // Moved to game-ui.js
    playerScore = 0;
    computerScore = 0;
    const guestId = localStorage.getItem('guestId');
    const savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};
    if (savedEntries && savedEntries[guestId]) {
        for (const category in savedEntries[guestId]) {
            if (savedEntries[guestId].hasOwnProperty(category)) {
                savedEntries[guestId][category].forEach(entry => {
                    if (entry.user === 'player') {
                        playerScore += calculateScore(entry.value);
                    } else if (entry.user === 'computer') {
                        computerScore += calculateScore(entry.value);
                    }
                });
            }
        }
    }
    displayScores(); // Moved to game-ui.js
}
