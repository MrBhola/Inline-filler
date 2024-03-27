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
  if (input.tagName === 'INPUT') {
    switch (input.type) {
      case 'text':
        input.value = generateRandomText(10);
        break;
      case 'email':
        input.value = generateRandomEmail();
        break;
      case 'number':
        input.value = generateRandomNumber(1000, 9999);
        break;
    }
  } else if (input.tagName === 'TEXTAREA') {
    input.value = generateRandomText(50);
  }
}

// Function to create and inject button
function createButton(input) {
  const button = document.createElement('button');
  button.innerHTML = 'Fill';
  button.style.position = 'absolute';
  button.style.right = '5px';
  button.style.top = '5px';
  button.onclick = function() {
    fillInput(input);
  };

  input.parentNode.appendChild(button);

  // Show the button when input is clicked or focused
  input.addEventListener('click', function() {
    button.style.display = 'block';
  });

  input.addEventListener('focus', function() {
    button.style.display = 'block';
  });

  // Hide the button when clicked outside
  document.addEventListener('click', function(event) {
    if (!input.contains(event.target)) {
      button.style.display = 'none';
    }
  });
}

// Find all input fields and textareas and attach buttons to them
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], textarea');
inputs.forEach(input => {
  createButton(input);
});
