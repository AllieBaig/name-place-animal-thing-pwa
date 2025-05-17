function guestLogin() {
    const guestId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('guestId', guestId);
    const appContent = document.getElementById('appContent');
    const loginOptions = document.getElementById('loginOptions');
    loginOptions.style.display = 'none';
    appContent.style.display = 'block';
    loadEntries();
    displayScores();
}

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

function calculateScore(word) {
    let score = 0;
    const upperCaseWord = word.toUpperCase();
    for (let i = 0; i < upperCaseWord.length; i++) {
        const letter = upperCaseWord[i];
        if (scrabbleLetterValues[letter]) {
            score += scrabbleLetterValues[letter];
        }
    }
    return score;
}

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
        displayEntries();

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
        displayEntries();

        const playerScoreIncrement = calculateScore(playerEntry);
        const computerScoreIncrement = calculateScore(computerItem);
        playerScore += playerScoreIncrement;
        computerScore += computerScoreIncrement;
        displayScores();
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

function loadEntries() {
    displayEntries();
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
    displayScores();
}
