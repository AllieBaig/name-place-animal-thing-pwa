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

function switchToRegularGame() {
    document.getElementById('wordSafariArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'none';
    document.getElementById('regularGameArea').style.display = 'block';
}

function switchToDiceChallenge() {
    document.getElementById('wordSafariArea').style.display = 'none';
    document.getElementById('regularGameArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'block';
    document.getElementById('diceRollStartArea').style.display = 'block';
    document.getElementById('challengeInputs').style.display = 'none';
}

function switchToWordSafari() {
    document.getElementById('regularGameArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'none';
    document.getElementById('wordSafariArea').style.display = 'block';
    startWordSafari();
}
