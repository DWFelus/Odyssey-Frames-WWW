var progressBar;
var resources;
var totalResources;
var loadedResources;
var cover;
var arrowQuiver;
var boxes;
var headlineWrappers;
var tagline;
var taglineImage;
var loadTag;
var taglineCenterImage;
var taglineCenter;
var observer; 

function trackProgress() {
  progressBar = document.getElementById("myProgressBar");
  resources = window.performance.getEntriesByType("resource");
  totalResources = resources.length *0.7;
  loadedResources = 0;

  function updateProgressBar() {
    loadedResources++;
    var progress = Math.round((loadedResources / totalResources) * 100);
    progressBar.style.width = progress + "%";

    if (loadedResources === totalResources || loadedResources > totalResources) {
      progressBar.style.width = "100%"; // 
      observer.disconnect(); // 
    }
  }

  observer = new PerformanceObserver(function (list) {
    var entries = list.getEntries();
    entries.forEach(function (entry) {
      if (
        entry.initiatorType !== "xmlhttprequest" &&
        entry.initiatorType !== "fetch" &&
        !isVideoWithLazyOrHoveredAutoplay(entry) &&
        !isResourceWithLazyLoading(entry)
      ) {
        updateProgressBar();
      }
    });
  });

  observer.observe({ entryTypes: ["resource"] });
}

function isVideoWithLazyOrHoveredAutoplay(entry) {
  if (entry.element && entry.element.tagName === "VIDEO") {
    var videoElement = entry.element;
    var hasLazyAttribute = videoElement.hasAttribute("lazy");
    var isHoveredAutoplay = videoElement.autoplay && videoElement.played.length === 0;
    return hasLazyAttribute || isHoveredAutoplay;
  }
  return false;
}

function isResourceWithLazyLoading(entry) {
  return entry.loading === "lazy";
}

document.addEventListener("DOMContentLoaded", trackProgress);

window.addEventListener('load', function() {
  cover = document.getElementById('cover');
  arrowQuiver = document.getElementById('arrow-quiver');
  boxes = document.getElementsByClassName('box');
  headlineWrappers = document.getElementsByClassName('headline-wrapper');
  tagline = document.getElementById('tagline');
  taglineImage = document.getElementById('tagline-image');
  taglineCenter = document.getElementById('tagline-center');
  taglineCenterImage = document.getElementById('tagline-center-image');
  loadTag = document.getElementById('loadtag');

  loadScreen = document.getElementsByClassName('load-screen')[0];

  observer.disconnect();

    progressBar = document.getElementById("myProgressBar");   
    progressBar.style.width = "100%";

  cover.addEventListener('transitionend', function()
  {    
    
    arrowQuiver.classList.add('show');

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].classList.add('show');
    }

    for (let i = 0; i < headlineWrappers.length; i++) {
      const headline = headlineWrappers[i].querySelector('.headline');
      headline.classList.add('show');
    }

    loadScreen.classList.add('hide');    
    loadTag.classList.add('hide');
    tagline.classList.add('show');
    taglineImage.classList.add('show');
    taglineCenter.classList.add('show');
    taglineCenterImage.classList.add('show');
    
    
  });

  setTimeout(function() {
    cover.classList.add('loaded');
  }, 250);
  document.body.style.overflow = "auto";
});

/*
var progressBar;
var resources;
var totalResources;
var loadedResources;
var cover;
var arrowQuiver;
var boxes;
var headlineWrappers;
var tagline;
var taglineImage;
var loadTag;
var taglineCenterImage;
var taglineCenter;
var observer; 

function trackProgress() {
  progressBar = document.getElementById("myProgressBar");
  resources = window.performance.getEntriesByType("resource");
  totalResources = resources.length *0.7;
  loadedResources = 0;

  function updateProgressBar() {
    loadedResources++;
    var progress = Math.round((loadedResources / totalResources) * 100);
    progressBar.style.width = progress + "%";

    if (loadedResources === totalResources || loadedResources > totalResources) {
      progressBar.style.width = "100%"; // 
      observer.disconnect(); // 
    }
  }

  observer = new PerformanceObserver(function (list) {
    var entries = list.getEntries();
    entries.forEach(function (entry) {
      if (
        entry.initiatorType !== "xmlhttprequest" &&
        entry.initiatorType !== "fetch" &&
        !isVideoWithLazyOrHoveredAutoplay(entry) &&
        !isResourceWithLazyLoading(entry)
      ) {
        updateProgressBar();
      }
    });
  });

  observer.observe({ entryTypes: ["resource"] });
}

function isVideoWithLazyOrHoveredAutoplay(entry) {
  if (entry.element && entry.element.tagName === "VIDEO") {
    var videoElement = entry.element;
    var hasLazyAttribute = videoElement.hasAttribute("lazy");
    var isHoveredAutoplay = videoElement.autoplay && videoElement.played.length === 0;
    return hasLazyAttribute || isHoveredAutoplay;
  }
  return false;
}

function isResourceWithLazyLoading(entry) {
  return entry.loading === "lazy";
}

document.addEventListener("DOMContentLoaded", trackProgress);

window.addEventListener('load', function() {
  cover = document.getElementById('cover');
  arrowQuiver = document.getElementById('arrow-quiver');
  boxes = document.getElementsByClassName('box');
  headlineWrappers = document.getElementsByClassName('headline-wrapper');
  tagline = document.getElementById('tagline');
  taglineImage = document.getElementById('tagline-image');
  taglineCenter = document.getElementById('tagline-center');
  taglineCenterImage = document.getElementById('tagline-center-image');
  loadTag = document.getElementById('loadtag');

  loadScreen = document.getElementsByClassName('load-screen')[0];

  observer.disconnect();

    progressBar = document.getElementById("myProgressBar");   
    progressBar.style.width = "100%";

  cover.addEventListener('transitionend', function()
  {    
    
    arrowQuiver.classList.add('show');

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].classList.add('show');
    }

    for (let i = 0; i < headlineWrappers.length; i++) {
      const headline = headlineWrappers[i].querySelector('.headline');
      headline.classList.add('show');
    }

    loadScreen.classList.add('hide');    
    loadTag.classList.add('hide');
    tagline.classList.add('show');
    taglineImage.classList.add('show');
    taglineCenter.classList.add('show');
    taglineCenterImage.classList.add('show');
    
    
  });

  setTimeout(function() {
    cover.classList.add('loaded');
  }, 250);
  document.body.style.overflow = "auto";
});

*/