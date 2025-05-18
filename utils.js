

// utils.js




const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const allCategories = ['Name', 'Place', 'Animal', 'Thing', 'Film', 'TV Show', 'Book', 'Song'];
const scrabbleLetterValues = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8,
    'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1,
    'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
};

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



export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// You can remove the 'utils' object if you are only exporting individual functions
// or you can keep it and export it as well if you have other properties:
// export default utils;

