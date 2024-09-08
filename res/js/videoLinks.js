document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the ID 'link-image'
  // Note: This will only select the first element with that ID due to ID uniqueness rule.
  const images = document.querySelectorAll('[id="link-image"]');

  // Iterate over each element with the ID 'link-image'
  images.forEach(image => {
    image.addEventListener('click', function() {
      const url = this.getAttribute('data-url');
      if (url) {
        window.open(url, '_blank'); // Open the link in a new tab
      }
    });
  });
});
