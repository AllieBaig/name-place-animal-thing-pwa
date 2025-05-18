// error-handler.js

function attachSafeClickListener(element, callback, elementName = 'unknown element') {
    if (!element) {
        const errorMessage = `Error: Element "${elementName}" not found. Cannot attach click listener.`;
        console.error(errorMessage);
        logError(errorMessage);
        return;
    }

    element.addEventListener('click', () => {
        try {
            callback();
        } catch (error) {
            console.error(`Error during click on "${elementName}":`, error);
            logError(`Click error on "${elementName}": ${error.message}`);
            // Optionally provide user feedback here, e.g., a subtle message
        }
    });
}

function attachSafeTouchStartListener(element, callback, elementName = 'unknown element') {
    if (!element) {
        const errorMessage = `Error: Element "${elementName}" not found. Cannot attach touchstart listener.`;
        console.error(errorMessage);
        logError(errorMessage);
        return;
    }

    element.addEventListener('touchstart', () => {
        try {
            callback();
        } catch (error) {
            console.error(`Error during touchstart on "${elementName}":`, error);
            logError(`Touchstart error on "${elementName}": ${error.message}`);
            // Optionally provide user feedback here
        }
    });
}

function logError(errorMessage) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${errorMessage}\n`;

    // --- Choose your logging mechanism here ---

    // 1. Log to console (for development/debugging):
    console.log("Error Log:", logMessage);

    // 2. Append to a client-side storage (e.g., localStorage - simple, but limited):
    let errorLogs = localStorage.getItem('appErrors') || '';
    localStorage.setItem('appErrors', errorLogs + logMessage);

    // 3. Send to a server-side logging endpoint (more robust for production):
    fetch('/log-error', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: logMessage }),
    }).catch(networkError => {
        console.error("Error sending log to server:", networkError);
        // Optionally store in localStorage as a fallback if server logging fails
    });

    // 4. Use IndexedDB for more structured client-side logging (more complex):
    // (Implementation would go here)

    // --- End of logging mechanism ---
}

export { attachSafeClickListener, attachSafeTouchStartListener, logError };
