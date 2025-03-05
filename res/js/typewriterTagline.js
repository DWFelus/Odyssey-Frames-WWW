window.onload = function () {
  startTextAnimation();

  // Select all elements with the attribute 'activate-typewriter="true"'
  const typewriterTriggers = document.querySelectorAll('[activate-typewriter="true"]');

  // Add hover event listener to each typewriter trigger
  typewriterTriggers.forEach(trigger => {
    let hoverTimeout; // Variable to hold the timeout ID
    let animationTimeout; // Variable to hold the timeout ID for clearing tagline

    trigger.addEventListener('mouseenter', function () {
      // Clear any existing timeouts
      clearTimeout(hoverTimeout);
      clearTimeout(animationTimeout);

      // Set a timeout to delay the animation by 0.5s
      hoverTimeout = setTimeout(() => {
        const dataSecond = this.getAttribute('data-title');
        if (dataSecond) {
          clearTextAndType(dataSecond);
        }
      }, 500); // 0.5 seconds delay
    });

    trigger.addEventListener('mouseleave', function () {
      // Clear the timeout if the mouse leaves before 0.5 seconds
      clearTimeout(hoverTimeout);
    });
  });
};

function startTextAnimation() {
  const dataText = ["Relive the Energy.<br>Rewatch the moment."];
  let i = 0;

  function animateNextText() {
    if (i < dataText.length) {
      typeWriter(dataText[i], function () {
        setTimeout(animateNextText, 200);
      });
      i++;
    }
  }

  animateNextText();
}

let currentIntervalId; // Global variable to store the current typing interval ID

function clearTextAndType(text) {
  const h2Element = document.querySelector("#tagline");

  // Clear the current text instantly
  h2Element.innerHTML = '';

  // Stop any ongoing typing animation
  clearInterval(currentIntervalId);

  // Start typing the new text
  typeWriter(text, null);

  // Set a timeout to clear the tagline after 10 seconds
  setTimeout(() => {
    h2Element.innerHTML = '';
  }, 10000); // 10 seconds delay
}

// Type one text in the typewriter, keeps calling itself until the text is finished
function typeWriter(text, fnCallback) {
  let i = 0;
  const h2Element = document.querySelector("#tagline");

  // Clear any existing typing animation
  clearInterval(currentIntervalId);

  // Set the interval speed to increase typing animation
  currentIntervalId = setInterval(function () {
    if (i < text.length) {
      if (text[i] === "<") {
        // Skip "<br>" characters
        const endIndex = text.indexOf(">", i);
        h2Element.innerHTML = text.substring(0, endIndex + 1) + '<span aria-hidden="true"></span>';
        i = endIndex + 1;
      } else {
        h2Element.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        i++;
      }
    } else {
      clearInterval(currentIntervalId);
      if (typeof fnCallback === 'function') {
        setTimeout(fnCallback, 700);
      }
    }
  }, 75); // Adjust typing speed as needed
}
