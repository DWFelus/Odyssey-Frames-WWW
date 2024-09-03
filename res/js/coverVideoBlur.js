var targets = [
  { id: 'top', brightness: 1.1, saturate: 1, blur: 0 },
  { id: 'live', brightness: 0.7, saturate: 0.7, blur: 7 },
  { id: 'session', brightness: 0.7, saturate: 0.6, blur: 7 },
  { id: 'exp', brightness: 0.7, saturate: 1, blur: 7 },
  { id: 'contact', brightness: 0.7, saturate: 0.0, blur: 7 },
  { id: 'gotoLIW', brightness: 0.7, saturate: 0.7, blur: 7 },
  { id: 'gotoSM', brightness: 0.7, saturate: 1, blur: 7 },
  { id: 'gotoILLU', brightness: 0.7, saturate: 0.0, blur: 7 },
  { id: 'gotoOK', brightness: 0.7, saturate: 0.7, blur: 7 },
  { id: 'gotoD20', brightness: 0.7, saturate: 0.5, blur: 0 },
  { id: 'bottom', brightness: 1.1, saturate: 1, blur: 0 }
];

document.addEventListener('scroll', function () {
  var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  var nextTarget = null;
  var currentTarget = null;

  for (var i = 0; i < targets.length - 1; i++) {
    if (
      scrollPosition >= document.getElementById(targets[i].id).offsetTop &&
      scrollPosition < document.getElementById(targets[i + 1].id).offsetTop
    ) {
      currentTarget = targets[i];
      nextTarget = targets[i + 1];
      break;
    }
  }

  if (currentTarget && nextTarget) {
    var progress =
      (scrollPosition - document.getElementById(currentTarget.id).offsetTop) /
      (document.getElementById(nextTarget.id).offsetTop - document.getElementById(currentTarget.id).offsetTop);
    var brightness = interpolateFilter(currentTarget.brightness, nextTarget.brightness, progress);
    var saturate = interpolateFilter(currentTarget.saturate, nextTarget.saturate, progress);
    var blur = interpolateFilter(currentTarget.blur, nextTarget.blur, progress);

    document.getElementById('cover').style.filter =
      'brightness(' + brightness + ')' + ' saturate(' + saturate + ')' + ' blur(' + blur + 'px)';
  } else if (scrollPosition >= document.getElementById(targets[targets.length - 1].id).offsetTop) {
    // Reached the last target, apply its filter
    document.getElementById('cover').style.filter =
      'brightness(' + targets[targets.length - 1].brightness + ')' +
      ' saturate(' + targets[targets.length - 1].saturate + ')' +
      ' blur(' + targets[targets.length - 1].blur + 'px)';
  } else {
    // Reset the filters to the initial state
    document.getElementById('cover').style.filter = 'brightness(1.1)' + ' saturate(1.1)' + ' blur(0px)';
  }
});

function interpolateFilter(value1, value2, progress) {
  return (value2 - value1) * progress + value1;
}

window.addEventListener('load', function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

// Scroll to element with offset
function scrollToElementWithOffset(element, offset) {
  const elementRect = element.getBoundingClientRect();
  const offsetPixels = (offset * window.innerHeight) / 100;
  const scrollTo = elementRect.top + window.pageYOffset - offsetPixels;

  window.scrollTo({
    top: scrollTo,
    behavior: 'smooth'
  });
}
