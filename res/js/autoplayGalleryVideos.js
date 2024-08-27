document.addEventListener('DOMContentLoaded', function()
{

const videos = document.querySelectorAll('.project-box-image');

videos.forEach(video =>
  {
    video.addEventListener('mouseover', function()
    {
      this.loop = true;
      this.play();
    });

    video.addEventListener('mouseout', function()
    {
      this.loop = false;
      this.pause();
      this.currentTime = 0;
    });
  });

}
);