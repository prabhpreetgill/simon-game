// Array created for the colors in the game
var buttonColours = ["red", "blue", "green", "yellow"];

// Empty Arrays Created for the pattern the game creates and the pattern the user clicks
var gamePattern = [];
var userClickedPattern = [];

// Variables for if the game has started and the current level of the game
var started = false;
var level = 0;


// When one of the 4 colored buttons are clicked the function creates a variable that stores the id of the clicked button
// The function then plays the sound corresponding the color and performs an animation when the button is pressed
// The function then checks the answer for each pattern length 
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// On a keypress of any key, if the game has not started yet, will change the heading to the current level 
// The function will also call for next sequence and change the value of started to true
$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// The function nextSequence gets a variable randomNumber of values 0 to 3 and then a randomChosenColor from the array buttonColours using index randomNumber
// The function creates and animation for the randomChosenColour, and then adds the randomChosenColor into the gamePattern Array
// The function then plays a sound according to the colour, changes the heading to the current level, add 1 to the level variable. then clears the userClickedPattern array
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);

    $("#level-title").text("Level " + level);
    level++;

    userClickedPattern = [];
}


// playSound created a new variable audio according to the parameter inside the function
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// animatePress creates an animation for the currentColor by adding a pre-existing css class to the current color and removing it after 100ms
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


// checkAnswer checks if the user answer at the current level is equal to the value of the game pattern at current level, the if the length of both userClickedPattern
// and gamePattern are equal, then after one second it will call to function nextSequence
// If the conditionals are not met, then the function plays an audio, and adds an animation for 20ms to the body of the file using a pre-existing css class called "game-over
// Then the heading of the game will be changed to "Game Over" and the function startOver() will be called
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success")
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}


// startOver resets the values of level, started, and gamePattern to their initial values
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}