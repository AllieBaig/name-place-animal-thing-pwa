// gameNavigation.js

function switchToRegularGame() {
    document.getElementById('wordSafariArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'none';
    document.getElementById('regularGameArea').style.display = 'block';
    const playWithComputerCheckbox = document.getElementById('playWithComputer');
    if (playWithComputerCheckbox.checked) {
        // Assuming startRegularGameTimer is now imported or accessible globally
        startRegularGameTimer();
    }
    // Assuming displayEntries is now imported or accessible globally
    displayEntries();
    // Assuming displayScores is now imported or accessible globally
    displayScores();
}

function switchToDiceChallenge() {
    document.getElementById('wordSafariArea').style.display = 'none';
    document.getElementById('regularGameArea').style.display = 'none';
    document.getElementById('diceChallengeArea').style.display = 'block';
    document.getElementById('diceRollStartArea').style.display = 'block';
    document.getElementById('challengeInputs').style.display = 'none';
    document.getElementById('challengeLetterDisplay').textContent = '?';
    // Assuming clearInterval and challengeTimeLeft are in diceChallenge.js
    clearInterval(challengeTimerInterval);
    challengeTimeLeft = 60;
    // Assuming updateChallengeTimerDisplay and clearChallengeInputs are in diceChallenge.js
    updateChallengeTimerDisplay();
    clearChallengeInputs();
}

function switchToWordSafari() {
    document.getElementById('wordSafariArea').style.display = 'block';
    document.getElementById('diceChallengeArea').style.display = 'none';
    document.getElementById('regularGameArea').style.display = 'none';
    // Assuming startWordSafari is now imported or accessible globally
    startWordSafari(); // This calls loadDailySafariContent and displayPassportStamps
}

export { switchToRegularGame, switchToDiceChallenge, switchToWordSafari };
