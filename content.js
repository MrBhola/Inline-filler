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
    button.style.zIndex = '9999'; // Set the z-index to a high value
    button.style.display = 'none'; // Initially hide the button

    // Function to position the button relative to the input
    function positionButton() {
        const rect = input.getBoundingClientRect();
        const inputStyle = window.getComputedStyle(input);
        const inputPaddingTop = parseFloat(inputStyle.paddingTop);
        const inputPaddingRight = parseFloat(inputStyle.paddingRight);
        const inputPaddingBottom = parseFloat(inputStyle.paddingBottom);
        const inputPaddingLeft = parseFloat(inputStyle.paddingLeft);
        const inputBorderTop = parseFloat(inputStyle.borderTopWidth);
        const inputBorderRight = parseFloat(inputStyle.borderRightWidth);
        const inputBorderBottom = parseFloat(inputStyle.borderBottomWidth);
        const inputBorderLeft = parseFloat(inputStyle.borderLeftWidth);

        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;

        // Calculate button position relative to the input
        let buttonLeft, buttonTop;

        if (input.tagName === 'TEXTAREA') {
            buttonLeft = rect.left + window.scrollX + rect.width - inputPaddingRight - inputBorderRight - buttonWidth - 5;
            buttonTop = rect.top + window.scrollY + inputPaddingTop + inputBorderTop;
        } else {
            buttonLeft = rect.left + window.scrollX + rect.width - inputPaddingRight - inputBorderRight - buttonWidth;
            buttonTop = rect.top + window.scrollY + inputPaddingTop + inputBorderTop + (rect.height - inputPaddingTop - inputPaddingBottom - inputBorderTop - inputBorderBottom - buttonHeight) / 2;
        }

        button.style.left = buttonLeft + 'px';
        button.style.top = buttonTop + 'px';
    }

    // Attach event listeners to show/hide the button
    input.addEventListener('click', function () {
        positionButton();
        button.style.display = 'block';
    });

    input.addEventListener('focus', function () {
        positionButton();
        button.style.display = 'block';
    });

    document.addEventListener('click', function (event) {
        if (!input.contains(event.target)) {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click event from bubbling up to document
        fillInput(input);
        event.preventDefault(); // Prevent form submission
    });

    // Append button to input parent
    input.parentNode.appendChild(button);

    // Mark the input as processed
    input.dataset.fillButtonAttached = true;

    // Position the button initially
    positionButton();

    // Update button position when page is scrolled
    window.addEventListener('scroll', positionButton);
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
