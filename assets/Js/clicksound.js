var audio = new Audio("assets/Others/Click.wav");

document.onclick = function() {
  audio.play();
  audio.volume = 0.2;
}
