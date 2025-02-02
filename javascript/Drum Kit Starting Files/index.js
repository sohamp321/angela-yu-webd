let drumList = document.querySelectorAll(".drum");
console.log(drumList);

drumList.forEach((drum) => {
  drum.addEventListener("click", function () {
    playSound(this.innerHTML);
    buttonAnimation(this.innerHTML);
  });
});

document.addEventListener("keydown", function (event) {
  playSound(event.key);
  buttonAnimation(event.key);
});


function playSound(key){
  let sound;
  switch (key) {
    case "w":
      sound = "./sounds/crash.mp3";
      break;
    case "a":
      sound = "./sounds/kick-bass.mp3";
      break;
    case "s":
      sound = "./sounds/snare.mp3";
      break;
    case "d":
      sound = "./sounds/tom-1.mp3";
      break;
    case "j":
      sound = "./sounds/tom-2.mp3";
      break;
    case "k":
      sound = "./sounds/tom-3.mp3";
      break;
    case "l":
      sound = "./sounds/tom-4.mp3";
      break;
    default:
      console.log(key);
      return;
  }
  let audio = new Audio(sound);
  audio.play();
}

function buttonAnimation(key){
  let element = document.querySelector(`.${key}`);
  element.classList.toggle("pressed");

  setTimeout(function(){
    element.classList.toggle("pressed");
  }, 100);
}
