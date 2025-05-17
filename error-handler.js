/*!
 * Name, Place, Animal, Thing PWA
 * Copyright (c) 2025 AllieBaig
 *
 * This software is licensed under the MIT License.
 * See LICENSE file for details: https://github.com/AllieBaig/name-place-animal-thing-pwa/blob/main/LICENSE
 */

window.onerror = function(message, source, lineno, colno, error) {
    const errorLog = JSON.parse(localStorage.getItem('clientErrors')) || [];
    const errorInfo = {
        timestamp: new Date().toISOString(),
        message: message,
        source: source,
        line: lineno,
        column: colno,
        errorObject: error ? error.stack : null // Include stack trace if available
    };
    errorLog.push(errorInfo);
    localStorage.setItem('clientErrors', JSON.stringify(errorLog));

    // Optionally, you can still log to the console for your own debugging
    console.error('Client-side error:', errorInfo);

    // Return true to prevent the browser's default error handling
    return true;
};
