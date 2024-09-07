// Function to switch image sources based on screen orientation
function switchImageSources() {
  // Check if the page is currently in portrait mode
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  // Get all images with the class 'project-box-image' and an 'alt-src' attribute
  const images = document.querySelectorAll('.project-box-image[alt-src]');

  // Loop through each image and switch the src if in portrait mode
  images.forEach(img => {
    const originalSrc = img.getAttribute('data-original-src') || img.getAttribute('src');
    const altSrc = img.getAttribute('alt-src');

    if (isPortrait && altSrc) {
      // Save the original src in a data attribute if not already saved
      if (!img.getAttribute('data-original-src')) {
        img.setAttribute('data-original-src', originalSrc);
      }
      // If in portrait mode and alt-src exists, switch to alt-src
      img.setAttribute('src', altSrc);
    } else if (!isPortrait && img.getAttribute('data-original-src')) {
      // Revert to the original src when not in portrait mode
      img.setAttribute('src', originalSrc);
    }
  });
}

// Run the function when the page loads
window.addEventListener('load', switchImageSources);

// Listen for changes in the screen orientation
window.addEventListener('resize', switchImageSources);

// Listen specifically for orientation changes on mobile devices
window.addEventListener('orientationchange', switchImageSources);
