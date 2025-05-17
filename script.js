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
const scrabbleLetterValues = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8,
    'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1,
    'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
};

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

function submitSafariEntries() {
    // For now, just log the submitted entries (actual checking will be in a later week)
    const entry1 = document.getElementById('safariCategory1').value.trim();
    const entry2 = document.getElementById('safariCategory2').value.trim();
    const entry3 = document.getElementById('safariCategory3').value.trim();
    const entry4 = document.getElementById('safariCategory4').value.trim();
    console.log("Submitted Safari Entries:", entry1, entry2, entry3, entry4);
    alert("Answers submitted! Checking functionality will be added soon.");
    // In the future, we'll check if all are correct and award a stamp
    // For this week, we'll just increment the stamp count for testing
    passportStamps++;
    localStorage.setItem('passportStamps', passportStamps);
    displayPassportStamps();
    // Optionally, move to the next week for testing purposes
    // currentWeek++;
    // loadWeeklySafariContent();
}

function displayPassportStamps() {
    const stampsDisplay = document.getElementById('stampsDisplay');
    stampsDisplay.innerHTML = '';
    for (let i = 0; i < passportStamps; i++) {
        const stamp = document.createElement('span');
        stamp.textContent = '🛂'; // Passport stamp emoji
        stamp.classList.add('passport-stamp');
        stampsDisplay.appendChild(stamp);
    }
}

// --- Regular Game Functions ---
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
    Name: ["Alice", "Bob", "Charlie", "Diana", "Eve", "Aaron", "Bella", "Caleb", "Daisy", "Ethan", "Abigail", "Benjamin", "Chloe", "Daniel", "Eleanor", "Lewis", "Liam", "Luna", "Leo", "Lily", "Xavier", "Zara", "Quinn"],
    Place: ["London", "Paris", "Tokyo", "New York", "Rome", "Berlin", "Cairo", "Delhi", "Edinburgh", "Florence", "Amsterdam", "Bangkok", "Copenhagen", "Dublin", "Geneva", "Zurich", "Vienna", "Oslo", "Quebec", "Jakarta"],
    Animal: ["Cat", "Dog", "Elephant", "Lion", "Tiger", "Ant", "Bear", "Camel", "Deer", "Eagle", "Ape", "Badger", "Cheetah", "Dolphin", "Fox", "Yak", "Zebra", "Quail", "Viper", "Walrus"],
    Thing: ["Book", "Table", "Chair", "Computer", "Phone", "Apple", "Ball", "Car", "Desk", "Earrings", "Axe", "Bag", "Clock", "Door", "Fan", "Jigsaw", "Kite", "Lamp", "Magnet", "Notebook"],
    Film: ["Star Wars", "The Matrix", "Inception", "Pulp Fiction", "Avatar", "Alien", "Blade Runner", "Casablanca", "Dark Knight", "E.T.", "Amelie", "Braveheart", "Catch Me If You Can", "Die Hard", "Fight Club", "Quiz Show", "Rear Window", "Seven Samurai", "The Usual Suspects", "Vertigo"],
    "TV Show": ["Friends", "Game of Thrones", "The Office", "Breaking Bad", "Stranger Things", "Alias", "Battlestar Galactica", "Curb Your Enthusiasm", "Doctor Who", "ER", "Arrested Development", "Buffy the Vampire Slayer", "Community", "Dexter", "Fargo", "Ozark", "Parks and Recreation", "Queen's Gambit", "Seinfeld", "Twin Peaks"],
    Book: ["Harry Potter", "The Lord of the Rings", "Pride and Prejudice", "1984", "To Kill a Mockingbird", "Animal Farm", "Brave New World", "Crime and Punishment", "Don Quixote", "Frankenstein", "Adventures of Huckleberry Finn", "Beloved", "Catch-22", "Dracula", "Emma", "Jane Eyre", "Moby Dick", "One Hundred Years of Solitude", "The Scarlet Letter", "Ulysses"],
    Song: ["Bohemian Rhapsody", "Imagine", "Hey Jude", "Like a Rolling Stone", "Smells Like Teen Spirit", "A Day in the Life", "Billie Jean", "Comfortably Numb", "Don't Stop Believin'", "Every Breath You Take", "Good Vibrations", "Hotel California", "I Will Always Love You", "Johnny B. Goode", "Knockin' on Heaven's Door", "Stairway to Heaven", "Thriller", "Yesterday", "Zombie", "Waterloo"],
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
                    listItem.textContent = `${entry.user === 'player' ? 'You' : 'Computer'}: <span class="math-inline">\{entry\.value\} \(</span>{calculateScore(entry.value)} points)`;
                    itemsList.appendChild(listItem);
