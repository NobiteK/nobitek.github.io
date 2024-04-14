// Hide preloader after 2 seconds

   setTimeout(function() {
      $("#preloader").fadeOut("slow");
   }, 2000);
   
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

  // Check if user came from another site or directly entered the URL
  if (!document.referrer || new URL(document.referrer).hostname !== window.location.hostname) {
    $("body").css("display", "none");
    $("body").fadeIn(1000);
  }

  // Fade out and redirect when clicking on a link
  $("a").click(function(event) {
    event.preventDefault();
    var linkLocation = this.href;
    $("body").fadeOut(1000, function() {
      window.location = linkLocation;
    });
  });
});
