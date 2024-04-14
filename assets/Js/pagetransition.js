document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.add("fade-in");

  document.querySelectorAll("a").forEach(function(anchor) {
    anchor.addEventListener("click", function(event) {
      var href = anchor.getAttribute("href");
      if (href.startsWith("#") || href.startsWith("javascript:")) {
        return; // Ignore anchor links and JavaScript links
      }
      event.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(function() {
        window.location.href = href;
      }, 500);
    });
  });
});
