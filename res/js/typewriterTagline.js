window.onload = function()
{
  startTextAnimation();
};

function startTextAnimation()
{
  var dataText = ["Hello World, <br> I'm Dariusz!:)"];
  var i = 0;

  function animateNextText()
  {
    if (i < dataText.length) {
      typeWriter(dataText[i], function() {
        setTimeout(animateNextText, 200);
      });
      i++;
    } 
  }

  animateNextText();
}

// type one text in the typewriter
// keeps calling itself until the text is finished
function typeWriter(text, fnCallback)
{
  var i = 0;
  var h2Element = document.querySelector("#tagline");

  var intervalId = setInterval(function()
  {
    if (i < text.length)
    {
      if (text[i] === "<")
      {
        // Skip "<br>" characters
        var endIndex = text.indexOf(">", i);
        h2Element.innerHTML = text.substring(0, endIndex + 1) + '<span aria-hidden="true"></span>';
        i = endIndex + 1;
      }
       else
      {
        h2Element.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        i++;
      }
    }

    else    
    {
      clearInterval(intervalId);
      if (typeof fnCallback === 'function') {
        setTimeout(fnCallback, 700);
      }
    }
  }, 100);
}
