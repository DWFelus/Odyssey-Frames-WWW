document.addEventListener('DOMContentLoaded', function () {
  // Array of quotes
  const quotes = [
      '"Waiting on a sunny day, gonna chase the clouds away."',
      '"So I’m waiting, waiting for the sun to shine."',
      '"I’m waiting in the wings for my turn to shine."',
      '"Waiting for the storm to pass, and the skies to clear."',
      '"I’m waiting for a miracle, can’t you see?"',
      '"I’m not good at waiting. I’m good at impatiently pacing."',
      '"If you wait for the perfect moment, you\'ll be waiting forever."'
  ];

  // Function to get a random quote
  function getRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
  }

  // Function to update the text content of the #loadtag element
  function updateLoadingText() {
      const loadtagElement = document.getElementById('loadtag');
      if (loadtagElement) {
          loadtagElement.textContent = getRandomQuote();
      } else {
          console.error('Element with ID "loadtag" not found.');
      }
  }

  // Execute the function when the DOM content is fully loaded
  updateLoadingText();
});
