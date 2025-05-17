/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 [Your GitHub Username]
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/[Your GitHub Username]/name-place-animal-thing-pwa/blob/main/LICENSE
 */

const possibleDestinationsWithClues = [
    {
        destination: "The African Savanna",
        categories: ["African Animal", "African Tree", "African Language", "African Landmark"],
        clues: [
            "A large cat with a mane",
            "Tall tree with a thick trunk, often umbrella-shaped",
            "Spoken by many in East Africa",
            "A famous flat-topped mountain"
        ]
    },
    {
        destination: "Ancient Egypt",
        categories: ["Egyptian God", "Egyptian River", "Ancient Title", "Hieroglyph"],
        clues: [
            "God of the sun",
            "The longest river in Africa",
            "The ruler of Egypt",
            "A picture writing system"
        ]
    },
    // Add many more exciting destinations and clue sets!
];

let currentDestination = "";
let currentCategoriesWithClues = { categories: [], clues: [] };

function generateDailySafari() {
    const randomIndex = Math.floor(Math.random() * possibleDestinationsWithClues.length);
    const selectedSafari = possibleDestinationsWithClues[randomIndex];
    currentDestination = selectedSafari.destination;
    currentCategoriesWithClues.categories = [...selectedSafari.categories];
    currentCategoriesWithClues.clues = [...selectedSafari.clues];

    // Shuffle categories and clues together to maintain correspondence
    for (let i = currentCategoriesWithClues.categories.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentCategoriesWithClues.categories[i], currentCategoriesWithClues.categories[j]] = [currentCategoriesWithClues.categories[j], currentCategoriesWithClues.categories[i]];
        [currentCategoriesWithClues.clues[i], currentCategoriesWithClues.clues[j]] = [currentCategoriesWithClues.clues[j], currentCategoriesWithClues.clues[i]];
    }

    return { destination: currentDestination, categories: currentCategoriesWithClues.categories, clues: currentCategoriesWithClues.clues };
}
