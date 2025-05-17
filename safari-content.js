/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 AllieBaig
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/AllieBaig/name-place-animal-thing-pwa/blob/main/LICENSE
 */

const possibleDestinationsWithClues = [
    {
        destination: "The African Savanna",
        categories: ["African Animal", "African Tree", "African Language", "African Landmark"],
        clues: [
            { type: "text", value: "A large cat with a mane" },
            { type: "jumble", value: "nioel" },
            { type: "fill", value: "A _ _ _ _ _ _ tree" },
            { type: "text", value: "Famous for its flat top" }
        ],
        correctAnswers: ["lion", "acacia", "swahili", "mount kilimanjaro"] // Added correct answers for potential future use
    },
    {
        destination: "Ancient Egypt",
        categories: ["Egyptian God", "Egyptian River", "Ancient Title", "Hieroglyph"],
        clues: [
            { type: "text", value: "God of the sun" },
            { type: "jumble", value: "ra" },
            { type: "fill", value: "The longest river in A _ _ _ _ _" },
            { type: "text", value: "The ruler of Egypt" }
        ],
        correctAnswers: ["ra", "nile", "pharaoh", "ankh"] // Added correct answers
    },
    {
        destination: "The Amazon Rainforest",
        categories: ["Amazonian Animal", "Amazonian Plant", "South American Country", "Amazon River Feature"],
        clues: [
            { type: "text", value: "A colorful parrot" },
            { type: "jumble", value: "aamcw" },
            { type: "fill", value: "B _ _ _ _ _ where much of the Amazon is" },
            { type: "text", value: "A large snake" }
        ],
        correctAnswers: ["macaw", "water lily", "brazil", "tributary"] // Added correct answers
    },
    {
        destination: "The Arctic Tundra",
        categories: ["Arctic Animal", "Arctic Plant", "Arctic Phenomenon", "Cold Region"],
        clues: [
            { type: "text", value: "A large white bear" },
            { type: "jumble", value: "osms" },
            { type: "fill", value: "N _ _ _ _ _ lights" },
            { type: "text", value: "A very cold landmass" }
        ],
        correctAnswers: ["polar bear", "moss", "northern", "greenland"] // Added correct answers
    },
    {
        destination: "Medieval Europe",
        categories: ["Medieval Profession", "Medieval Building", "Medieval Weapon", "Royal Title"],
        clues: [
            { type: "text", value: "Worked with metal" },
            { type: "jumble", value: "elcats" },
            { type: "fill", value: "Used by knights in b _ _ _ _ _" },
            { type: "text", value: "A female ruler" }
        ],
        correctAnswers: ["blacksmith", "castle", "battle", "queen"] // Added correct answers
    }
    // Add many more exciting destinations and clue sets!
];

let currentDestination = "";
let currentCategoriesWithClues = { categories: [], clues: [], correctAnswers: [] };

function generateDailySafari() {
    const randomIndex = Math.floor(Math.random() * possibleDestinationsWithClues.length);
    const selectedSafari = possibleDestinationsWithClues[randomIndex];
    currentDestination = selectedSafari.destination;
    currentCategoriesWithClues.categories = [...selectedSafari.categories];
    currentCategoriesWithClues.clues = [...selectedSafari.clues];
    currentCategoriesWithClues.correctAnswers = [...selectedSafari.correctAnswers];

    // Shuffle categories, clues, and correct answers together to maintain correspondence
    for (let i = currentCategoriesWithClues.categories.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [currentCategoriesWithClues.categories[i], currentCategoriesWithClues.categories[j]] = [currentCategoriesWithClues.categories[j], currentCategoriesWithClues.categories[i]];
        [currentCategoriesWithClues.clues[i], currentCategoriesWithClues.clues[j]] = [currentCategoriesWithClues.clues[j], currentCategoriesWithClues.clues[i]];
        [currentCategoriesWithClues.correctAnswers[i], currentCategoriesWithClues.correctAnswers[j]] = [currentCategoriesWithClues.correctAnswers[j], currentCategoriesWithClues.correctAnswers[i]];
    }

    return {
        destination: currentDestination,
        categories: currentCategoriesWithClues.categories,
        clues: currentCategoriesWithClues.clues,
        correctAnswers: currentCategoriesWithClues.correctAnswers
    };
}
