const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$(document).on("keydown", () => {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = currentLevel => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout( () => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press any key to restart");

    setTimeout( () => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

const nextSequence = () => {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

const playSound = name => {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

const animatePress = currentColour => {
  $("#" + currentColour).addClass("pressed");
  setTimeout( () => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
}
