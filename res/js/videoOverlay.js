document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('videoOverlay');
  const videoFrame = document.getElementById('videoFrame');
  const closeButton = document.querySelector('.close-button');
  const triggers = document.querySelectorAll('#video-trigger');

  // Open overlay when an image is clicked
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const videoSrc = this.getAttribute('data-video-src'); // Get the video URL
      const startSecond = this.getAttribute('data-second'); // Get the start time
      
      // Append start time, autoplay, and mute parameters
      const srcWithParams = new URL(videoSrc);
      srcWithParams.searchParams.set('autoplay', '1');
      srcWithParams.searchParams.set('mute', '1');
      if (startSecond) {
        srcWithParams.searchParams.set('start', startSecond);
      }
      
      videoFrame.src = srcWithParams.toString(); // Set the iframe src to the video URL with parameters
      overlay.classList.add('active'); // Add active class to show the overlay with transition
    });
  });

  // Close overlay and stop the video
  closeButton.addEventListener('click', function() {
    overlay.classList.remove('active'); // Remove active class to hide the overlay with transition
    setTimeout(() => {
      videoFrame.src = ''; // Stop the video after the transition
    }, 500); // Delay stopping the video until the transition ends
  });

  // Close overlay if clicked outside the video container
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      setTimeout(() => {
        videoFrame.src = '';
      }, 500);
    }
  });
});
