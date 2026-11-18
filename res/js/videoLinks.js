document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('[id="link-image"]');

  images.forEach(image => {
    image.addEventListener('click', function() {
      const url = this.getAttribute('data-url');
      if (url) {
        window.open(url, '_blank', 'noopener');
      }
    });
  });

  const videoTriggers = document.querySelectorAll('#video-trigger');
  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(event) {
      const videoSrc = this.getAttribute('data-video-src');
      if (!videoSrc) {
        return;
      }

      const embedUrl = new URL(videoSrc);
      const videoId = embedUrl.pathname.match(/^\/embed\/([^/]+)$/);
      if (!videoId) {
        console.error('Invalid YouTube embed URL:', videoSrc);
        return;
      }

      const watchUrl = new URL('https://www.youtube.com/watch');
      watchUrl.searchParams.set('v', videoId[1]);

      const startSecond = Number(this.getAttribute('data-second'));
      if (Number.isSafeInteger(startSecond) && startSecond > 0) {
        watchUrl.searchParams.set('t', startSecond + 's');
      }

      event.preventDefault();
      window.open(watchUrl.toString(), '_blank', 'noopener');
    });
  });
});
