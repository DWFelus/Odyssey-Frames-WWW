// Scroll to element with offset
function scrollToElementWithOffset(element, offset)
{
  const elementRect = element.getBoundingClientRect();
  const offsetPixels = (offset * window.innerHeight) / 100;
  const scrollTo = elementRect.top + window.pageYOffset - offsetPixels;

  window.scrollTo({
    top: scrollTo,
    behavior: 'smooth'
  });
}

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function()
{
  // Get all anchor elements
  const anchorElements = document.querySelectorAll('a');

  // Add click event listener to each anchor element
  anchorElements.forEach(function(anchorElement)
  {
    anchorElement.addEventListener('click', function(event)
    {
      event.preventDefault(); // Prevent the default anchor behavior

      const targetId = anchorElement.getAttribute('href').substring(1); // Get the ID from the href attribute
      const targetElement = document.getElementById(targetId); // Get the target element using the ID

      if (targetElement) {
        scrollToElementWithOffset(targetElement, 10); // Scroll to the target element with an 10vh offset
      }
    });
  });
});
