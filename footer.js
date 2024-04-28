

function isBottomReached() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }
  

  function showScrollToTop() {
    var scrollToTop = document.querySelector('.scroll-to-top');
    scrollToTop.style.display = isBottomReached() ? 'block' : 'none';
  }
  
 
  window.addEventListener('scroll', function() {
    showScrollToTop();
  });
  

  window.addEventListener('load', function() {
    showScrollToTop();
  });