// probe.js

import { attachSafeClickListener, logError } from './error-handler.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Probe script loaded.');

    // Function to send data (placeholder - adapt to your needs)
    function sendProbeData(data) {
        console.log('Sending probe data:', data);
        // In a real application, you would send this data to a server.
        // Example using fetch:
        /*
        fetch('/api/probe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(responseData => console.log('Probe response:', responseData))
        .catch(error => {
            console.error('Error sending probe data:', error);
            logError(`Error sending probe data: ${error.message}`);
        });
        */
    }

    // Collect basic device information
    function getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            devicePixelRatio: window.devicePixelRatio || 1,
        };
    }

    // Collect user interaction data (example: button clicks)
    const trackedButtons = document.querySelectorAll('[data-probe-click]');
    trackedButtons.forEach(button => {
        const eventName = button.dataset.probeClick;
        attachSafeClickListener(button, () => {
            const interactionData = {
                type: 'click',
                element: eventName,
                timestamp: new Date().toISOString(),
            };
            sendProbeData({ event: 'userInteraction', data: interactionData });
        }, eventName);
    });

    // Collect performance metrics (example: page load time)
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            sendProbeData({ metric: 'loadTime', value: loadTime });
        });
    }

    // Collect error reports (example: global error listener)
    window.onerror = function(message, source, lineno, colno, error) {
        const errorData = {
            message: message,
            source: source,
            line: lineno,
            column: colno,
            errorObject: error ? error.stack : null,
            timestamp: new Date().toISOString(),
        };
        sendProbeData({ event: 'clientError', data: errorData });
        // Return true to prevent the browser's default error handling
        return true;
    };

    // Initial probe data send on page load
    sendProbeData({ event: 'pageLoad', data: getDeviceInfo() });
});
