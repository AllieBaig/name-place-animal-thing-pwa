console.log("Debug Mode Activated!");

// Function to disable browser caching (aggressive)
function disableCache() {
    console.warn("Cache disabling activated!");
    localStorage.clear(); // Clear local storage
    sessionStorage.clear(); // Clear session storage

    // Attempt to disable various caching mechanisms
    fetch('/?cache-bust=' + Date.now(), {
        headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
            'Expires': '0'
        }
    }).then(() => {
        console.log("Cache busting request sent.");
    }).catch(error => {
        console.error("Error sending cache busting request:", error);
    });

    // Reload the page to try and ensure fresh load
    setTimeout(() => {
        console.log("Attempting page reload for fresh load.");
        window.location.reload(true); // Force reload from server, bypassing cache
    }, 500);
}

// Function to log all local storage data
function logLocalStorage() {
    console.group("Local Storage Data:");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`${key}:`, value);
    }
    if (localStorage.length === 0) {
        console.log("Local Storage is empty.");
    }
    console.groupEnd();
}

// Function to log all session storage data
function logSessionStorage() {
    console.group("Session Storage Data:");
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(`${key}:`, value);
    }
    if (sessionStorage.length === 0) {
        console.log("Session Storage is empty.");
    }
    console.groupEnd();
}

// Function to simulate a specific week for Word Safari (for testing)
function simulateWordSafariWeek(weekNumber) {
    console.warn(`Word Safari week simulation activated for week: ${weekNumber}`);
    currentWeek = parseInt(weekNumber);
    startWordSafari(); // Reload Word Safari content for the simulated week
}

// Function to reset local storage (use with caution!)
function resetLocalStorage() {
    console.warn("Local Storage RESET initiated! Data will be cleared in 3 seconds. Cancel by typing 'cancelReset' in the console.");
    let cancelled = false;
    window.cancelReset = () => {
        cancelled = true;
        console.warn("Local Storage reset cancelled.");
    };
    setTimeout(() => {
        if (!cancelled) {
            console.warn("Local Storage CLEARED!");
            localStorage.clear();
            window.location.reload(true);
        }
    }, 3000);
}

// You can call these functions from your browser's developer console
// Example usage in the console:
// disableCache();
// logLocalStorage();
// simulateWordSafariWeek(3);
// resetLocalStorage();
