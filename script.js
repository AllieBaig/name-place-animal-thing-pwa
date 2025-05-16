document.addEventListener('DOMContentLoaded', () => {
    const guestId = localStorage.getItem('guestId');
    const appContent = document.getElementById('appContent');
    const loginOptions = document.getElementById('loginOptions');

    if (guestId) {
        loginOptions.style.display = 'none';
        appContent.style.display = 'block';
        loadEntries();
    }

    // Initial call to set the default placeholder
    updateInputPlaceholder();
});

function guestLogin() {
    const guestId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('guestId', guestId);
    const appContent = document.getElementById('appContent');
    const loginOptions = document.getElementById('loginOptions');
    loginOptions.style.display = 'none';
    appContent.style.display = 'block';
    loadEntries();
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
}

const computerEntries = {
    Name: ["Alice", "Bob", "Charlie", "Diana", "Eve"],
    Place: ["London", "Paris", "Tokyo", "New York", "Rome"],
    Animal: ["Cat", "Dog", "Elephant", "Lion", "Tiger"],
    Thing: ["Book", "Table", "Chair", "Computer", "Phone"],
    Film: ["Star Wars", "The Matrix", "Inception", "Pulp Fiction", "Avatar"],
    "TV Show": ["Friends", "Game of Thrones", "The Office", "Breaking Bad", "Stranger Things"],
    Book: ["Harry Potter", "The Lord of the Rings", "Pride and Prejudice", "1984", "To Kill a Mockingbird"],
    Song: ["Bohemian Rhapsody", "Imagine", "Hey Jude", "Like a Rolling Stone", "Smells Like Teen Spirit"],
};

function addItem(player) {
    const categoryDropdown = document.getElementById('category');
    const itemInput = document.getElementById('item');
    const selectedCategory = categoryDropdown.value;
    const newItem = itemInput.value.trim();
    const playWithComputer = document.getElementById('playWithComputer').checked;

    if (newItem !== "") {
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
                computerAddItem(selectedCategory);
            }, 1000); // Add a slight delay for the computer's turn
        }
    }
}

function computerAddItem(category) {
    if (computerEntries[category] && computerEntries[category].length > 0) {
        const randomIndex = Math.floor(Math.random() * computerEntries[category].length);
        const computerItem = computerEntries[category][randomIndex];

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

function loadEntries() {
    displayEntries();
}
