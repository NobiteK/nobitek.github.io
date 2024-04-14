$(document).ready(function() {
  // Check if the preloader has already been hidden in this session
  if (sessionStorage.getItem('preloader') !== 'hidden') {
    // Show preloader for 2 seconds
    setTimeout(function() {
      $("#preloader").fadeOut("slow", function() {
        // After fading out, set preloader to hidden in sessionStorage
        sessionStorage.setItem('preloader', 'hidden');
      });
    }, 2000);
  } else {
    // If preloader has been hidden, hide it immediately without delay
    $("#preloader").hide();
  }

  // Disable scrolling and hide scrollbar for 2.6 seconds
  var loader = document.getElementById("preloader");
  window.addEventListener("load", function() {
    window.addEventListener("scroll", disableScroll);
    hideScrollbar();
    setTimeout(function() {
      window.removeEventListener("scroll", disableScroll);
      showScrollbar();
    }, 2600);
  });

  function disableScroll() {
    window.scrollTo(0, 0);
  }

  function hideScrollbar() {
    document.documentElement.style.overflow = 'hidden';
  }

  function showScrollbar() {
    document.documentElement.style.overflow = 'auto';
  }

  // Fade in content when switching from another site or directly entering the URL
  if (!document.referrer || new URL(document.referrer).hostname !== window.location.hostname) {
    $("body").css("display", "none");
    $("body").fadeIn(1000);
  }

  // Create fade-out overlay
  var fadeOutOverlay = $('<div id="fade-out-overlay"></div>').css({
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'right': '0',
    'bottom': '0',
    'background': '#fff',
    'z-index': '9999', // Ensure this is higher than the preloader's z-index
    'display': 'none'
  }).appendTo('body');

  // Fade out and redirect when clicking on a link
  $("a").click(function(event) {
    event.preventDefault();
    var linkLocation = this.href;
    // Show the fade-out overlay and then fade it out
    fadeOutOverlay.show().fadeOut(2000, function() { // Adjust the duration as needed
      window.location = linkLocation;
    });
  });
});
