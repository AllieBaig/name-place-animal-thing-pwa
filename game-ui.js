function updateInputPlaceholder() {
    const categoryDropdown = document.getElementById('category');
    const itemInput = document.getElementById('item');
    const selectedCategory = categoryDropdown.value;
    let placeholderText = 'Enter item';
    switch (selectedCategory) {
        case 'Name': placeholderText = 'Enter a Name'; break;
        case 'Place': placeholderText = 'Enter a Place'; break;
        case 'Animal': placeholderText = 'Enter an Animal'; break;
        case 'Thing': placeholderText = 'Enter a Thing'; break;
        case 'Film': placeholderText = 'Enter a Fiction Film Character'; break;
        case 'TV Show': placeholderText = 'Enter a TV Show Character'; break;
        case 'Book': placeholderText = 'Enter a Book Character'; break;
        case 'Song': placeholderText = 'Enter a Song Title'; break;
    }
    itemInput.placeholder = placeholderText;
    if (document.getElementById('diceMode').checked && currentDiceLetter) {
        itemInput.placeholder += ` starting with ${currentDiceLetter}`;
    }
}

function displayEntries() {
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';
    const guestId = localStorage.getItem('guestId');
    const savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};

    if (savedEntries[guestId]) {
        for (const category in savedEntries[guestId]) {
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
        }
    }
}

function displayScores() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}
