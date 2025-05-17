function generateWireframeImage(week) {
    const appContent = document.getElementById('appContent');
    if (appContent) {
        // Temporarily show the relevant game area and hide others
        document.getElementById('regularGameArea').style.display = 'none';
        document.getElementById('diceChallengeArea').style.display = 'none';
        document.getElementById('wordSafariArea').style.display = 'none';

        if (week === 1) {
            document.getElementById('regularGameArea').style.display = 'block';
            // Ensure basic regular game elements are visible
        } else if (week >= 4 && week <= 8) {
            document.getElementById('regularGameArea').style.display = 'block';
            // Ensure elements for Player vs Computer and scoring are visible
            document.getElementById('playWithComputer').checked = (week >= 4);
            // You might need to simulate adding some entries to see scores
        } else if (week >= 9) {
            // Show the initial game selection
            document.getElementById('regularGameArea').style.display = 'block'; // Or leave all hidden to capture the choice screen
        } else if (week === 10) {
            document.getElementById('wordSafariArea').style.display = 'block';
            startWordSafari(); // Ensure content is loaded
        }

        // Basic styling to make the wireframe more visible
        const originalStyles = appContent.style.border;
        const originalPadding = appContent.style.padding;
        const originalBackground = appContent.style.backgroundColor;

        appContent.style.border = '2px solid black';
        appContent.style.padding = '10px';
        appContent.style.backgroundColor = '#f0f0f0';

        // Ensure the appContent is visible for capture
        appContent.style.display = 'block';

        html2canvas(appContent).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            console.log(`Wireframe Image (Week ${week}):`, imgData);

            // Revert styles
            appContent.style.border = originalStyles;
            appContent.style.padding = originalPadding;
            appContent.style.backgroundColor = originalBackground;

            // Optionally, you can display the image in the DOM for testing:
            // const img = document.createElement('img');
            // img.src = imgData;
            // document.body.appendChild(img);

            // After generating the image for Week 10, you might want to
            // set the visibility back to the appropriate game mode
            const guestId = localStorage.getItem('guestId');
            if (guestId) {
                if (getActiveGameMode() === 'wordSafari') {
                    switchToWordSafari();
                } else if (getActiveGameMode() === 'diceChallenge') {
                    switchToDiceChallenge();
                } else {
                    switchToRegularGame();
                }
            } else {
                appContent.style.display = 'none'; // Hide if not logged in
            }
        });
    } else {
        console.error("App content element not found.");
    }
}
