// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select flags and content elements with translation
    const flagEn = document.getElementById('flag-en');
    const flagPl = document.getElementById('flag-pl');
    const contentElements = document.querySelectorAll('[pl]');

    // Store the original content and placeholder values of each text element
    contentElements.forEach(element => {
        if (element.tagName.toLowerCase() === 'textarea' || element.tagName.toLowerCase() === 'input') {
            // Handle placeholder for textarea and input elements
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('data-placeholder-original', element.getAttribute('placeholder'));
            }
        } else {
            // Handle other elements (including links)
            const link = element.querySelector('a');
            if (link) {
                link.setAttribute('data-original', link.innerHTML);
            } else {
                element.setAttribute('data-original', element.innerHTML);
            }
        }
    });

    // Function to set the page to English
    function setEnglish() {
        document.documentElement.lang = 'en';
        flagEn.classList.add('active-flag');
        flagPl.classList.remove('active-flag');

        // Restore English text content and placeholder values
        contentElements.forEach(element => {
            if (element.tagName.toLowerCase() === 'textarea' || element.tagName.toLowerCase() === 'input') {
                // Restore the original placeholder value for textarea and input
                if (element.hasAttribute('data-placeholder-original')) {
                    element.setAttribute('placeholder', element.getAttribute('data-placeholder-original'));
                }
                // Clear the value if it was previously set to pl attribute value
                if (element.value === element.getAttribute('pl')) {
                    element.value = '';
                }
            } else {
                // Restore text content, including HTML tags
                const link = element.querySelector('a');
                if (link) {
                    link.innerHTML = link.getAttribute('data-original');
                } else {
                    element.innerHTML = element.getAttribute('data-original');
                }
            }
        });

        // Make the English flag non-clickable and the Polish flag clickable
        flagEn.style.pointerEvents = 'none';
        flagPl.style.pointerEvents = 'auto';
    }

    // Function to set the page to Polish
    function setPolish() {
        document.documentElement.lang = 'pl';
        flagPl.classList.add('active-flag');
        flagEn.classList.remove('active-flag');

        // Replace text with the Polish translation from the 'pl' attribute
        contentElements.forEach(element => {
            const polishText = element.getAttribute('pl');
            if (element.tagName.toLowerCase() === 'textarea' || element.tagName.toLowerCase() === 'input') {
                // Update the placeholder value for textarea and input
                if (polishText) {
                    element.setAttribute('placeholder', polishText);
                }
                // Clear any existing content in the textarea or input
                element.value = '';
            } else {
                const link = element.querySelector('a');
                if (link && polishText) {
                    link.innerHTML = polishText;
                } else if (polishText) {
                    element.innerHTML = polishText;
                }
            }
        });

        // Make the Polish flag non-clickable and the English flag clickable
        flagPl.style.pointerEvents = 'none';
        flagEn.style.pointerEvents = 'auto';
    }

    // Add click event listeners to each flag
    flagEn.addEventListener('click', () => {
        if (document.documentElement.lang !== 'en') {
            setEnglish();
        }
    });

    flagPl.addEventListener('click', () => {
        if (document.documentElement.lang !== 'pl') {
            setPolish();
        }
    });

    // Initialize the page to English by default
    setEnglish();
});
