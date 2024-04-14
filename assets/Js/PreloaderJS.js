// Check if the referrer is from the same domain
var isInternalNavigation = document.referrer.indexOf(window.location.hostname) !== -1;

// If it's not an internal navigation, show the preloader
if (!isInternalNavigation) {
  // Show preloader
  $("#preloader").fadeIn("fast");

  // Hide preloader after 2 seconds
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
  // If it's an internal navigation, hide the preloader immediately
  $("#preloader").hide();
  showScrollbar();
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
