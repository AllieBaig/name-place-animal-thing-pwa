document.addEventListener('DOMContentLoaded', () => {
    const guestId = localStorage.getItem('guestId');
    const appContent = document.getElementById('appContent');
    const loginOptions = document.getElementById('loginOptions');
    const diceModeCheckbox = document.getElementById('diceMode');
    const diceRollArea = document.getElementById('diceRollArea');
    const categoryDropdown = document.getElementById('category');
    const itemInput = document.getElementById('item');
    const addItemButton = document.querySelector('#inputArea button');

    if (guestId) {
        loginOptions.style.display = 'none';
        appContent.style.display = 'block';
        loadEntries();
    }

    updateInputPlaceholder();
    displayScores();

    diceModeCheckbox.addEventListener('change', () => {
        if (diceModeCheckbox.checked) {
            diceRollArea.style.display = 'block';
            categoryDropdown.disabled = true;
            categoryDropdown.value = 'Name';
            itemInput.placeholder = 'Enter a Name starting with...';
            addItemButton.textContent = 'Add My Name';
        } else {
            diceRollArea.style.display = 'none';
            categoryDropdown.disabled = false;
            updateInputPlaceholder();
            addItemButton.textContent = 'Add My Item';
            currentDiceLetter = null;
        }
    });
});

let playerScore = 0;
let computerScore = 0;
let currentDiceLetter = null;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

const computerEntries = {
    Name: ["Alice", "Bob", "Charlie", "Diana", "Eve", "Aaron", "Bella", "Caleb", "Daisy", "Ethan", "Abigail", "Benjamin", "Chloe", "Daniel", "Eleanor", "Lewis", "Liam", "Luna", "Leo", "Lily"],
    Place: ["London", "Paris", "Tokyo", "New York", "Rome", "Berlin", "Cairo", "Delhi", "Edinburgh", "Florence", "Amsterdam", "Bangkok", "Copenhagen", "Dublin", "Geneva"],
    Animal: ["Cat", "Dog", "Elephant", "Lion", "Tiger", "Ant", "Bear", "Camel", "Deer", "Eagle", "Ape", "Badger", "Cheetah", "Dolphin", "Fox"],
    Thing: ["Book", "Table", "Chair", "Computer", "Phone", "Apple", "Ball", "Car", "Desk", "Earrings", "Axe", "Bag", "Clock", "Door", "Fan"],
    Film: ["Star Wars", "The Matrix", "Inception", "Pulp Fiction", "Avatar", "Alien", "Blade Runner", "Casablanca", "Dark Knight", "E.T.", "Amelie", "Braveheart", "Catch Me If You Can", "Die Hard", "Fight Club"],
    "TV Show": ["Friends", "Game of Thrones", "The Office", "Breaking Bad", "Stranger Things", "Alias", "Battlestar Galactica", "Curb Your Enthusiasm", "Doctor Who", "ER", "Arrested Development", "Buffy the Vampire Slayer", "Community", "Dexter", "Fargo"],
    Book: ["Harry Potter", "The Lord of the Rings", "Pride and Prejudice", "1984", "To Kill a Mockingbird", "Animal Farm", "Brave New World", "Crime and Punishment", "Don Quixote", "Frankenstein", "Adventures of Huckleberry Finn", "Beloved", "Catch-22", "Dracula", "Emma"],
    Song: ["Bohemian Rhapsody", "Imagine", "Hey Jude", "Like a Rolling Stone", "Smells Like Teen Spirit", "A Day in the Life", "Billie Jean", "Comfortably Numb", "Don't Stop Believin'", "Every Breath You Take", "Good Vibrations", "Hotel California", "I Will Always Love You", "Johnny B. Goode", "Knockin' on Heaven's Door"],
};

const diceFaces = [
    ` _____ `, `|     |`, `|  •  |`, `|_____|`,
    ` _____ `, `| •   |`, `|     |`, `|   • |`, `|_____|`,
    ` _____ `, `| •   |`, `|  •  |`, `|   • |`, `|_____|`,
    ` _____ `, `| • • |`, `|     |`, `| • • |`, `|_____|`,
    ` _____ `, `| • • |`, `|  •  |`, `| • • |`, `|_____|`,
    ` _____ `, `| • • |`, `| • • |`, `| • • |`, `|_____|`,
];

let currentDiceFaceIndex = 0;

function rollDice() {
    const diceLetterSpan = document.getElementById('diceLetter');
    const intervalId = setInterval(() => {
        diceLetterSpan.textContent = diceFaces[currentDiceFaceIndex % diceFaces.length];
        currentDiceFaceIndex++;
    }, 100);

    setTimeout(() => {
        clearInterval(intervalId);
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        currentDiceLetter = alphabet[randomIndex];
        diceLetterSpan.textContent = currentDiceLetter;
        const itemInput = document.getElementById('item');
        itemInput.placeholder = `Enter a Name starting with ${currentDiceLetter}`;
    }, 1500);
}

function calculateScore(playerEntry, computerEntry) {
    const playerLower = playerEntry.toLowerCase();
    const computerLower = computerEntry.toLowerCase();
    let score = 0;
    const matchedLetters = new Set();

    for (let i = 0; i < playerLower.length; i++) {
        const char = playerLower[i];
        if (computerLower.includes(char) && !matchedLetters.has(char)) {
            const playerOccurrences = playerLower.split(char).length - 1;
            const computerOccurrences = computerLower.split(char).length - 1;
            score += Math.min(playerOccurrences, computerOccurrences);
            matchedLetters.add(char);
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
                computerAddItem(selectedCategory, newItem);
            }, 1000);
        }
    }
}

function computerAddItem(category, playerEntry) {
    if (computerEntries[category] && computerEntries[category].length > 0) {
        let possibleEntries = computerEntries[category];
        if (document.getElementById('diceMode').checked && currentDiceLetter) {
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

        const score = calculateScore(playerEntry, computerItem);
        playerScore += score;
        computerScore += score;
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
                    listItem.textContent = `${entry.user === 'player' ? 'You' : 'Computer'}: ${entry.value}`;
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
    displayScores();
}
