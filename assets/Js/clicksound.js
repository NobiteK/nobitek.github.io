var audio = new Audio("assets/Others/Click.wav");

document.onclick = function() {
  audio.volume = 0.2;
  audio.play();
};
