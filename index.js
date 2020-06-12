
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var isGameOn = false;
var level;

$(document).on("keydown", function() {
  if (!isGameOn) {
    gamePattern = [];
    userClickedPattern = [];

    isGameOn = true;
    level = 0;

    nextSequence();

    $("h1").text("Level 0");
  }
});

$(".btn").on("click", function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(lastIndex) {
  if (!(userClickedPattern[lastIndex] === gamePattern[lastIndex])) {
    isGameOn = false;

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    return;
  }

  if (userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];

    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
