// content.js

// Function to generate random text
function generateRandomText(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Function to generate random email
function generateRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return generateRandomText(8) + '@' + randomDomain;
}

// Function to generate random number
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to fill input with random content
function fillInput(input) {
    let randomValue;
    if (input.tagName === 'INPUT') {
        switch (input.type) {
            case 'text':
                randomValue = generateRandomText(10);
                break;
            case 'email':
                randomValue = generateRandomEmail();
                break;
            case 'number':
                randomValue = generateRandomNumber(1000, 9999);
                break;
        }
    } else if (input.tagName === 'TEXTAREA') {
        randomValue = generateRandomText(50);
    }

    // Set input value
    input.value = randomValue;

    // Trigger change event
    input.dispatchEvent(new Event('change', { bubbles: true }));
}

// Function to create and inject button
function createButton(input) {
    const button = document.createElement('button');
    button.innerHTML = 'Fill';
    button.style.position = 'absolute';
    button.style.right = '5px';
    button.style.top = '5px';
    button.style.zIndex = '9999';
    button.onclick = function () {
        fillInput(input);
    };

    input.parentNode.appendChild(button);

    // Show the button when input is clicked or focused
    input.addEventListener('click', function () {
        button.style.display = 'block';
    });

    input.addEventListener('focus', function () {
        button.style.display = 'block';
    });

    // Hide the button when clicked outside
    document.addEventListener('click', function (event) {
        if (!input.contains(event.target)) {
            button.style.display = 'none';
        }
    });

    // Mark the input as processed
    input.dataset.fillButtonAttached = true;
}

// Function to find and attach buttons to eligible input fields and textareas
function attachButtonsToEligibleInputs() {
    const eligibleInputs = document.querySelectorAll('input[type="text"]:not([readonly]), input[type="email"]:not([readonly]), input[type="number"]:not([readonly]), textarea:not([readonly])');
    eligibleInputs.forEach(input => {
        // Only attach button if not already processed
        if (!input.dataset.fillButtonAttached) {
            createButton(input);
        }
    });
}

// Initial attachment of buttons to eligible inputs
attachButtonsToEligibleInputs();

// Periodically check for new eligible input fields and textareas and attach buttons to them
setInterval(attachButtonsToEligibleInputs, 1000); // Adjust the interval as needed
