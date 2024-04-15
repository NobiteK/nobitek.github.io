var collapsibleButton = document.querySelector('.collapsible-button');
var contentBox = document.querySelector('.content-box');
var closeButton = document.querySelector('.close-button');

collapsibleButton.addEventListener('click', function() {
  contentBox.style.display = 'block';
});

closeButton.addEventListener('click', function() {
  contentBox.style.display = 'none';
});
