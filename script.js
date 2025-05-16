function displayInputs() {
    const name = document.getElementById('name').value;
    const place = document.getElementById('place').value;
    const animal = document.getElementById('animal').value;
    const thing = document.getElementById('thing').value;
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = `You entered: Name - ${name}, Place - ${place}, Animal - ${animal}, Thing - ${thing}`;
}
