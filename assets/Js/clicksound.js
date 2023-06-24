var audio = new Audio("assets/Others/Click.mp3");

document.onclick = function() {
  audio.play();
  audio.volume = 0.2;
}