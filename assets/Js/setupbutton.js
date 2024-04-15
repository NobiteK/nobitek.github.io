// Get the collapsible button and content box elements
var collapsibleButton = document.querySelector('.collapsible-button');
var contentBox = document.querySelector('.content-box');

// Add an event listener to the collapsible button
collapsibleButton.addEventListener('click', function() {
  // Toggle the display style between 'block' and 'none'
  if (contentBox.style.display === 'block') {
    contentBox.style.display = 'none';
  } else {
    contentBox.style.display = 'block';
  }
});

// If you also want the close button inside the content box to close it
var closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', function() {
  contentBox.style.display = 'none';
});
