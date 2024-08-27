window.addEventListener('load', function()
{
  


  const nav = document.querySelector('nav');
  const footer = document.querySelector('footer');
  
  setTimeout(function()
  {
    nav.classList.add('show');
  }, 0);
  
  setTimeout(function()
  {
    footer.classList.add('show');
  }, 0);
});