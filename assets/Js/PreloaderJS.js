// Check if the page has been visited during the session
var hasVisited = sessionStorage.getItem('hasVisited');

// Hide preloader after 2 seconds
// If the page has not been visited, show the preloader and set the flag
if (!hasVisited) {
  sessionStorage.setItem('hasVisited', 'true');
  setTimeout(function() {
    $("#preloader").fadeOut("slow");
  }, 2000);
  
  // Disable scrolling and hide scrollbar for 2.6 seconds
  window.addEventListener("load", function() {
    window.addEventListener("scroll", disableScroll);
    hideScrollbar();
  
    setTimeout(function() {
      window.removeEventListener("scroll", disableScroll);
      showScrollbar();
    }, 2600);
  });
} else {
  // If the page has been visited, immediately hide the preloader
  $("#preloader").hide();
}

function disableScroll() {
  window.scrollTo(0, 0);
}

function hideScrollbar() {
  document.documentElement.style.overflow = 'hidden';
}

function showScrollbar() {
  document.documentElement.style.overflow = 'auto';
}
