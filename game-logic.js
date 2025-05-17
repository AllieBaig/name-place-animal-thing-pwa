// game-logic.js

// Define the computer's possible entries for each category
const computerEntries = {
    Name: ["Alice", "Bob", "Charlie", "David", "Eve", "Jona", "Ken", "Liam", "Mia", "Noah"],
    Place: ["London", "Paris", "Tokyo", "New York", "Rome", "Berlin", "Sydney", "Cairo", "Delhi", "Dubai"],
    Animal: ["Cat", "Dog", "Elephant", "Lion", "Tiger", "Rabbit", "Snake", "Zebra", "Panda", "Monkey"],
    Thing: ["Table", "Chair", "Book", "Pen", "Lamp", "Phone", "Computer", "Car", "Train", "Ball"]
};

// Set to keep track of unique first letters for scoring (reset per round if needed)
let uniqueFirstLetters = new Set();

function calculateScore(item) {
    if (!item) {
        return 0;
    }
    const firstLetter = item.trim().toLowerCase().charAt(0);
    if (!firstLetter.match(/[a-z]/i)) {
        return 0; // No points for non-alphabetic entries
    }
    if (!uniqueFirstLetters.has(firstLetter)) {
        uniqueFirstLetters.add(firstLetter);
        return 10;
    } else {
        return 5;
    }
}

function loadEntries() {
    // Load saved entries from localStorage if any
    const savedEntries = localStorage.getItem('pwaEntries');
    if (savedEntries) {
        // Entries will be in the pwaEntries key
    }
    // You might have other loading logic here if needed
}

function resetUniqueFirstLetters() {
    uniqueFirstLetters.clear();
}

export { calculateScore, loadEntries, resetUniqueFirstLetters, computerEntries };
