var targets = 
[
  { id: 'top', color: 'rgba(42, 39, 75, 1)', brightness: 1.1, saturate: 1, blur: 0},
  { id: 'welcome', color: 'rgba(0, 0, 0, 1)', brightness: 0.5, saturate: 0.7, blur: 7},
  { id: 'project-gallery', color: 'rgba(71, 11, 11, 1)', brightness: 0.5, saturate: 0.6, blur: 7},
  { id: 'about', color: 'rgba(9, 38, 32, 1)', brightness: 0.5, saturate: 1, blur: 7},
  { id: 'gotoAS', color: 'rgba(92, 27, 94, 1)', brightness: 0.5, saturate: 0.0, blur: 7},
  { id: 'gotoYLH', color: 'rgba(115, 22, 40, 1)', brightness: 0.5, saturate: 0.7, blur: 7},
  { id: 'gotoTP', color: 'rgba(18, 79, 37, 1)',  brightness: 0.5, saturate: 1, blur: 7},
  { id: 'gotoPS', color: 'rgba(51, 85, 130, 1)', brightness: 0.5, saturate: 0.0, blur: 7},
  { id: 'gotoPORT', color: 'rgba(97, 66, 32, 1)', brightness: 0.5, saturate: 0.7, blur: 7},
  { id: 'gotoMP', color: 'rgba(42, 39, 75, 1)',  brightness: 0.8, saturate: 0.5, blur: 0},
  { id: 'bottom', color: 'rgba(42, 39, 75, 1)', brightness: 1.1, saturate: 1, blur: 0}
];

document.addEventListener('scroll', function()
{
  var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  var nextTarget = null;
  var currentTarget = null;

  for (var i = 0; i < targets.length - 1; i++)
  {
    if (scrollPosition >= document.getElementById(targets[i].id).offsetTop &&
      scrollPosition < document.getElementById(targets[i + 1].id).offsetTop)
      {
        currentTarget = targets[i];
        nextTarget = targets[i + 1];
        break;
      }
  }

  if (currentTarget && nextTarget)
  {
    var progress =
      (scrollPosition - document.getElementById(currentTarget.id).offsetTop) /
      (document.getElementById(nextTarget.id).offsetTop - document.getElementById(currentTarget.id).offsetTop);
    var color = interpolateColor(currentTarget.color, nextTarget.color, progress);
    var brightness = interpolateFilter(currentTarget.brightness, nextTarget.brightness, progress);    
    var saturate = interpolateFilter(currentTarget.saturate, nextTarget.saturate, progress);
    var blur = interpolateFilter(currentTarget.blur, nextTarget.blur, progress);

    document.body.style.backgroundColor = color;
    document.getElementById('cover').style.filter = 'brightness(' + brightness + ')' + ' saturate(' + saturate + ')' + 'blur(' + blur +'px)'; 
  }

  else if (scrollPosition >= document.getElementById(targets[targets.length - 1].id).offsetTop)
  {
    // Reached the last target, use its color
    document.body.style.backgroundColor = targets[targets.length - 1].color;    
    document.getElementById('cover').style.filter = 
    'brightness(' + targets[targets.length - 1].brightness + ')' + 
    ' saturate(' + targets[targets.length - 1].saturate + ')' +
    ' blur(' + targets[targets.length - 1].blur + 'px)'
    ;
  } 

  else
  {
    // Reset the background to the initial state
    document.body.style.backgroundColor = 'rgba(42, 39, 75, 1)';
    document.getElementById('cover').style.filter = 'brightness(1.1)' + ' saturate(1.1)' + ' blur (0px)';   
  }

});

function interpolateFilter(value1, value2, progress)
{
  return (value2 - value1) * progress + value1;
}

function interpolateColor(color1, color2, progress)
{
  var rgba1 = color1.match(/\d+/g);
  var rgba2 = color2.match(/\d+/g);

  var r1 = parseInt(rgba1[0]);
  var g1 = parseInt(rgba1[1]);
  var b1 = parseInt(rgba1[2]);
  var a1 = parseFloat(rgba1[3]);

  var r2 = parseInt(rgba2[0]);
  var g2 = parseInt(rgba2[1]);
  var b2 = parseInt(rgba2[2]);
  var a2 = parseFloat(rgba2[3]);

  var r = Math.round((r2 - r1) * progress + r1);
  var g = Math.round((g2 - g1) * progress + g1);
  var b = Math.round((b2 - b1) * progress + b1);
  var a = ((a2 - a1) * progress + a1).toFixed(2);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}


window.addEventListener('load', function()
  {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

// Scroll to element with offset
function scrollToElementWithOffset(element, offset)
{
  const elementRect = element.getBoundingClientRect();
  const offsetPixels = (offset * window.innerHeight) / 100;
  const scrollTo = elementRect.top + window.pageYOffset - offsetPixels;

  window.scrollTo
  ({
    top: scrollTo,
    behavior: 'smooth'
  });    
}
