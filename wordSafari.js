let currentSafariData = { destination: "", categories: [], clues: [] };

function loadDailySafariContent(destination, categories, clues) {
    document.getElementById('currentDestination').textContent = destination;
    document.getElementById('category1Label').textContent = categories[0] + ":";
    document.getElementById('category1Clue').textContent = clues[0];
    document.getElementById('category2Label').textContent = categories[1] + ":";
    document.getElementById('category2Clue').textContent = clues[1];
    document.getElementById('category3Label').textContent = categories[2] + ":";
    document.getElementById('category3Clue').textContent = clues[2];
    document.getElementById('category4Label').textContent = categories[3] + ":";
    document.getElementById('category4Clue').textContent = clues[3];
}

function startWordSafari() {
    currentSafariData = generateDailySafari();
    loadDailySafariContent(currentSafariData.destination, currentSafariData.categories, currentSafariData.clues);
    displayPassportStamps();
}

function submitSafariEntries() {
    const entry1 = document.getElementById('safariCategory1').value.trim();
    const entry2 = document.getElementById('safariCategory2').value.trim();
    const entry3 = document.getElementById('safariCategory3').value.trim();
    const entry4 = document.getElementById('safariCategory4').value.trim();
    console.log("Submitted Safari Entries for:", currentSafariData.destination, "-", entry1, entry2, entry3, entry4);
    alert("Answers submitted! Checking functionality will be added soon.");
    passportStamps++;
    localStorage.setItem('passportStamps', passportStamps);
    displayPassportStamps();
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

let passportStamps = localStorage.getItem('passportStamps') ? parseInt(localStorage.getItem('passportStamps')) : 0;
displayPassportStamps();
