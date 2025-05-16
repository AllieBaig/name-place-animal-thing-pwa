document.addEventListener('DOMContentLoaded', () => {
    // Check if a guest user ID exists in localStorage
    const guestId = localStorage.getItem('guestId');
    const appContent = document.getElementById('appContent');
    const loginOptions = document.getElementById('loginOptions');

    if (guestId) {
        // If a guest ID exists, show the app content
        loginOptions.style.display = 'none';
        appContent.style.display = 'block';
        loadEntries(); // We'll define this later
    }
});

function guestLogin() {
    // Generate a unique ID for the guest user
    const guestId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('guestId', guestId);

    // Hide the login options and show the main app content
    const appContent = document.getElementById('appContent');
    const loginOptions = document.getElementById('loginOptions');
    loginOptions.style.display = 'none';
    appContent.style.display = 'block';
    loadEntries(); // We'll define this later
}

function updateInputPlaceholder() {
    const categoryDropdown = document.getElementById('category');
    const itemInput = document.getElementById('item');
    const selectedCategory = categoryDropdown.value;

    switch (selectedCategory) {
        case 'Name':
            itemInput.placeholder = 'Enter a Name';
            break;
        case 'Place':
            itemInput.placeholder = 'Enter a Place';
            break;
        case 'Animal':
            itemInput.placeholder = 'Enter an Animal';
            break;
        case 'Thing':
            itemInput.placeholder = 'Enter a Thing';
            break;
        case 'Film':
            itemInput.placeholder = 'Enter a Fiction Film Character';
            break;
        case 'TV Show':
            itemInput.placeholder = 'Enter a TV Show Character';
            break;
        case 'Book':
            itemInput.placeholder = 'Enter a Book Character';
            break;
        case 'Song':
            itemInput.placeholder = 'Enter a Song Title';
            break;
        default:
            itemInput.placeholder = 'Enter item';
            break;
    }
}

function addItem() {
    const categoryDropdown = document.getElementById('category');
    const itemInput = document.getElementById('item');
    const entriesDiv = document.getElementById('entries');
    const selectedCategory = categoryDropdown.value;
    const newItem = itemInput.value.trim();

    if (newItem !== "") {
        const guestId = localStorage.getItem('guestId');
        let savedEntries = JSON.parse(localStorage.getItem('pwaEntries')) || {};

        if (!savedEntries[guestId]) {
            savedEntries[guestId] = {};
        }
        if (!savedEntries[guestId][selectedCategory]) {
            savedEntries[guestId][selectedCategory] = [];
        }

        savedEntries[guestId][selectedCategory].push(newItem);
        localStorage.setItem('pwaEntries', JSON.stringify(savedEntries));

        itemInput.value = ""; // Clear the input field
        displayEntries();
    }
}

function displayEntries() {
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = ''; // Clear previous entries
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
                savedEntries[guestId][category].forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
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

// Call updateInputPlaceholder on initial load to set the default placeholder
updateInputPlaceholder();
