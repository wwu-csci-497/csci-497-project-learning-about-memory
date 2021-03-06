var level = 1;
var randNum = "";
var errors = 0;
var firstError = 0;

// Begins the experiment
document.getElementById("start").onclick = function () {
  var num = document.getElementById('numbers');
  document.getElementById('start').style.display = "none";
  document.getElementById('info').style.display = "none";
  buildLevel(1);
};

// Clicking Retry resets all the values and begins the experiment
document.getElementById("retry").onclick = function () {
  level = 1;
  randNum = "";
  errors = 0;
  firstError = 0;
  document.getElementById('start').style.display = "none";
  document.getElementById('info').style.display = "none";
  document.getElementById('text').style.display = "none";
  document.getElementById('end').style.display = "none";

  buildLevel(1);
};

// Creates a String to display. Length is determined by level, and the content is randomly generated.
function buildLevel(level) {
  var i;
  randNum = "";
  for(i = 0; i < level; i++) {
    randNum += getRandDigit();
  }
  console.log(randNum);

  document.getElementById("numbers").innerHTML = randNum;
  var time = level;
  if(time < 3) {
    time = 3;
  }
  // setTimeout(toggleView, time * 10);
  setTimeout(toggleView, time * 750);
}

// What happens when the User fails to input a correct answer. Summarizes how well they did and where they failed.
function endGame() {
  var input = document.getElementById('attempt');
  var numbers = document.getElementById('numbers');
  var text = document.getElementById('text');
  var buttons = document.getElementById('end');

  input.style.display = "none";
  text.style.display = "inline-block";
  numbers.innerHTML = "Woops, you missed that one! On level " + level + " you made two mistakes in a row!";

  text.innerHTML = "Your first error was on level " + firstError + ". ";
  numbers.style.display = "inline-block";
  document.getElementById('end').style.display = "inline-block";
  // buttons.style.display = "table";
  //Continue or Reset
}


// This happens every time the User hits enter on the given text box. Checks if they input the right answer or not.
checkInput = document.getElementById('attempt');
checkInput.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        // console.log('Enter');
        if(document.getElementById('attempt').value == randNum) {
          flash('#b674fc');
          errors = 0;
          console.log("Wow!");
          level++;
          // toggleTextBox();
          toggleView();
          // document.getElementById('attempt').style.display = "none";
          buildLevel(level);
        }
        else {
          flash('#f55656');
          if(errors == 0 && firstError == 0) {
            firstError = level;
          }
          errors++;
          if(errors == 2) {
            endGame();
          }
        }
        document.getElementById('attempt').value = "";
        console.log("Error: " + errors);
    }
});


function getRandDigit() {
  return Math.floor(Math.random() * 10);
}

// Flashes a given color on the screen
function flash(color) {
  document.body.style.background = color;
  setTimeout(flashWhite, 200);
}

function flashWhite() {
  document.body.style.background = "#E2B0FF";
}

// Toggles the view between displaying the numbers and the text box during the experiment
function toggleView() {
  var input = document.getElementById('attempt');
  var numbers = document.getElementById('numbers');
  if(input.style.display == "inline-block") {
    numbers.style.display = "inline-block";
    input.style.display = "none";
  }
  else {
    input.style.display = "inline-block";
    numbers.style.display = "none";
    input.focus();
    input.select();
  }
}
