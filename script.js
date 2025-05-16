function displayInputs() {
    const name = document.getElementById('name').value;
    const place = document.getElementById('place').value;
    const animal = document.getElementById('animal').value;
    const thing = document.getElementById('thing').value;
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = `You entered: Name - ${name}, Place - ${place}, Animal - ${animal}, Thing - ${thing}`;
}

function displayInputs() {
    // ... (existing displayInputs function)
}

async function shareInputs() {
    const name = document.getElementById('name').value;
    const place = document.getElementById('place').value;
    const animal = document.getElementById('animal').value;
    const thing = document.getElementById('thing').value;
    const shareText = `Check out my choices: Name - ${name}, Place - ${place}, Animal - ${animal}, Thing - ${thing}`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'My NPAT Choices',
                text: shareText,
                url: window.location.href
            });
            console.log('Data shared successfully');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        alert('Web Share API is not supported in your browser.');
    }
}

