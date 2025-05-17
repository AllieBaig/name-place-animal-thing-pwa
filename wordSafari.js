/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 AllieBaig
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/AllieBaig/name-place-animal-thing-pwa/blob/main/LICENSE
 */

let currentSafariData = { destination: "", categories: [], clues: [], correctAnswers: [] };

function loadDailySafariContent(destination, categories, clues) {
    document.getElementById('currentDestination').textContent = destination;
    for (let i = 0; i < categories.length; i++) {
        const categoryLabel = document.getElementById(`category${i + 1}Label`);
        const textClueSpan = document.getElementById(`category${i + 1}Clue`);
        const jumbleClueSpan = document.getElementById(`category${i + 1}JumbleClue`);
        const fillClueSpan = document.getElementById(`category${i + 1}FillClue`);

        categoryLabel.textContent = categories[i] + ":";
        textClueSpan.style.display = 'none';
        jumbleClueSpan.style.display = 'none';
        fillClueSpan.style.display = 'none';

        const clue = clues[i];
        if (clue.type === 'text') {
            textClueSpan.textContent = clue.value;
            textClueSpan.style.display = 'inline';
        } else if (clue.type === 'jumble') {
            jumbleClueSpan.textContent = clue.value.toUpperCase().split('').sort(() => Math.random() - 0.5).join('');
            jumbleClueSpan.style.display = 'inline';
        } else if (clue.type === 'fill') {
            fillClueSpan.textContent = clue.value;
            fillClueSpan.style.display = 'inline';
        }
    }
}

function startWordSafari() {
    currentSafariData = generateDailySafari();
    loadDailySafariContent(currentSafariData.destination, currentSafariData.categories, currentSafariData.clues);
    displayPassportStamps();
}

function submitSafariEntries() {
    const entry1 = document.getElementById('safariCategory1').value.trim().toLowerCase();
    const entry2 = document.getElementById('safariCategory2').value.trim().toLowerCase();
    const entry3 = document.getElementById('safariCategory3').value.trim().toLowerCase();
    const entry4 = document.getElementById('safariCategory4').value.trim().toLowerCase();

    const userEntries = [entry1, entry2, entry3, entry4];
    const correctAnswers = currentSafariData.correctAnswers.map(answer => answer.toLowerCase());
    let correctCount = 0;

    for (let i = 0; i < userEntries.length; i++) {
        if (userEntries[i] === correctAnswers[i]) {
            correctCount++;
        }
    }

    alert(`You got ${correctCount} out of ${correctAnswers.length} correct!`);

    if (correctCount === correctAnswers.length) {
        passportStamps++;
        localStorage.setItem('passportStamps', passportStamps);
        displayPassportStamps();
    }

    // Future: Implement definition lookup and display
    // For now, let's just log the entries and answers
    console.log("Submitted Safari Entries for:", currentSafariData.destination);
    console.log("Your Entries:", userEntries);
    console.log("Correct Answers:", correctAnswers);
}

function surpriseMe() {
    console.log('Surprise Me button clicked');
    currentSafariData = generateDailySafari(); // Generate a new random safari
    loadDailySafariContent(currentSafariData.destination, currentSafariData.categories, currentSafariData.clues); // Update the UI
}

function displayPassportStamps() {
    const stampsDisplay = document.getElementById('stampsDisplay');
    if (stampsDisplay) { // Check if stampsDisplay exists
        stampsDisplay.innerHTML = '';
        for (let i = 0; i < passportStamps; i++) {
            const stamp = document.createElement('span');
            stamp.textContent = '🛂'; // Passport stamp emoji
            stamp.classList.add('passport-stamp');
            stampsDisplay.appendChild(stamp);
        }
    } else {
        console.error("Error: stampsDisplay element not found in the DOM.");
    }
}

let passportStamps = localStorage.getItem('passportStamps') ? parseInt(localStorage.getItem('passportStamps')) : 0;
displayPassportStamps();

export { startWordSafari, submitSafariEntries, surpriseMe };
