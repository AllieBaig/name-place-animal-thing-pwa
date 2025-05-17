/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 AllieBaig
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/AllieBaig/name-place-animal-thing-pwa/blob/main/LICENSE
 */

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

export function displayScores() {
    const playerScoreDisplay = document.getElementById('playerScore');
    const computerScoreDisplay = document.getElementById('computerScore');
    if (playerScoreDisplay) playerScoreDisplay.textContent = playerScore;
    if (computerScoreDisplay) computerScoreDisplay.textContent = computerScore;
}
