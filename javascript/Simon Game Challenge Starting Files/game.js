// let gamePattern = [];
// const buttonOrder = ["green", "red", "yellow", "blue"];
// const gameOverText = "Game Over, Press Any Key to Restart";

// let gameStart = false;
// let gameOver = false;
// let level = 0;
// let currentIndex = 0;

// function generateRandomNumber() {
//   return Math.floor(Math.random() * 4);
// }

// function flashButton(num) {
//   $(`.${buttonOrder[num]}`).fadeOut(100).fadeIn(100);
// }

// function playButtonSound(num) {
//   const sounds = ["./sounds/green.mp3", "./sounds/red.mp3", "./sounds/yellow.mp3", "./sounds/blue.mp3"];
//   new Audio(sounds[num]).play();
// }

// function addButtonPattern() {
//   const num = generateRandomNumber();
//   gamePattern.push(num);
//   flashButton(num);
//   playButtonSound(num);
// }

// function nextSequence() {
//   level++;
//   $("h1").text(`Level ${level}`);
//   currentIndex = 0;
//   addButtonPattern();
// }

// function resetGame() {
//   gameStart = false;
//   gameOver = false;
//   level = 0;
//   gamePattern = [];
//   $("body").removeClass("game-over");
//   $("h1").text("Press A Key to Start");
// }

// function ifGameOver() {
//   $("body").addClass("game-over");
//   $("h1").text(gameOverText);
//   new Audio("./sounds/wrong.mp3").play();

//   // Attach a one-time listener to restart the game
//   $(document).off("keypress").on("keypress", function () {
//     resetGame();
//     $(document).off("keypress"); // Prevent duplicate listeners
//     startGame(); // Restart the game
//   });
// }

// function startGame() {
//   if (!gameStart) {
//     gameStart = true;
//     nextSequence();
//   }
// }

// // Button click logic
// $(".btn").on("click", function () {
//   const clickedColor = $(this).attr("id");
//   const clickedIndex = buttonOrder.indexOf(clickedColor);

//   $(this).addClass("pressed");
//   setTimeout(() => $(this).removeClass("pressed"), 100);

//   if (clickedIndex === gamePattern[currentIndex]) {
//     currentIndex++;
//     if (currentIndex === gamePattern.length) {
//       setTimeout(nextSequence, 1000);
//     }
//   } else {
//     gameOver = true;
//     ifGameOver();
//   }
// });

// // Initial game start listener
// $(document).on("keypress", startGame);


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

