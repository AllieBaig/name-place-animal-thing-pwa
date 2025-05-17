// uiUpdates.js

import { calculateScore } from './game-logic.js'; // If calculateScore is needed here

function displayEntries() {
    const entriesDiv = document.getElementById('entries');
    if (entriesDiv) {
        entriesDiv.innerHTML = '';
        const guestId = localStorage.getItem('guestId');
        const savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};

        if (savedEntries[guestId]) {
            const categoriesToShow = ['Name', 'Place', 'Animal', 'Thing'];
            categoriesToShow.forEach(category => {
                if (savedEntries[guestId].hasOwnProperty(category) && savedEntries[guestId][category].length > 0) {
                    const categoryGroup = document.createElement('div');
                    categoryGroup.classList.add('category-group');
                    const categoryTitle = document.createElement('h3');
                    categoryTitle.textContent = category;
                    categoryGroup.appendChild(categoryTitle);
                    const itemsList = document.createElement('ul');
                    savedEntries[guestId][category].forEach(entry => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${entry.user === 'player' ? 'You' : 'Computer'}: ${entry.value} (${calculateScore(entry.value)} points)`;
                        itemsList.appendChild(listItem);
                    });
                    categoryGroup.appendChild(itemsList);
                    entriesDiv.appendChild(categoryGroup);
                }
            });
        }
    } else {
        console.error("Error: entries div not found.");
    }
}

function displayScores() {
    const playerScoreDisplay = document.getElementById('playerScore');
    const computerScoreDisplay = document.getElementById('computerScore');
    let playerScore = localStorage.getItem('playerScore') ? parseInt(localStorage.getItem('playerScore')) : 0;
    let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;

    if (playerScoreDisplay) playerScoreDisplay.textContent = playerScore;
    if (computerScoreDisplay) computerScoreDisplay.textContent = computerScore;
}

export { displayEntries, displayScores };
