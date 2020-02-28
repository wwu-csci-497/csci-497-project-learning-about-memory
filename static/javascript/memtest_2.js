var level = 1;
var randNum = "";
var randSpace = "";
var errors = 0;
var firstError = 0;
var rand = "";

var items = ["IBM", "FBI", "USA", "UWU", "LOL", "GTG", "BRB", "DOG", "COW", "CAT", "MOO", "ATM"];

console.log(numbers);

document.getElementById("start").onclick = function () {
  var num = document.getElementById('numbers');
  document.getElementById('start').style.display = "none";
  document.getElementById('info').style.display = "none";

  // document.getElementById('attempt').style.display = "inline";
  // num.innerHTML = numbers;
  buildLevel(1);

  // num.style.position = "absolute";
  // document.getElementById('start').style.color = "red";
};

document.getElementById("retry").onclick = function () {
  level = 1;
  randNum = "";
  errors = 0;
  firstError = 0;
  document.getElementById('start').style.display = "none";
  document.getElementById('info').style.display = "none";
  // document.getElementById('numbers').style.display;
  document.getElementById('text').style.display = "none";
  document.getElementById('end').style.display = "none";

  buildLevel(1);

  // num.style.position = "absolute";
  // document.getElementById('start').style.color = "red";
};


function buildLevel(level) {
  var i;
  var rand = "";
  randSpace = "";
  randNum = "";
  for(i = 0; i < level; i++) {
    rand = getRandDigit();
    randNum += rand;
    if(randSpace == "") {
      randSpace = rand;
    }
    else {
      randSpace += " " + rand;
    }
  }
  console.log(randNum);

  document.getElementById("numbers").innerHTML = randSpace;
  var time = level;
  if(time < 3) {
    time = 3;
  }
  // setTimeout(toggleView, time * 10);
  setTimeout(toggleView, time * 1250);
}

function endGame() {
  var input = document.getElementById('attempt');
  var numbers = document.getElementById('numbers');
  var text = document.getElementById('text');
  var buttons = document.getElementById('end');

  input.style.display = "none";
  text.style.display = "inline-block";
  numbers.innerHTML = "You made it to level " + level + "! This means you got " + ((level - 1) * 3) + " characters correct!";

  text.innerHTML = "Your first error was on level " + firstError + ". ";
  numbers.style.display = "inline-block";
  document.getElementById('end').style.display = "inline-block";
  // buttons.style.display = "table";
  //Continue or Reset
}



checkInput = document.getElementById('attempt');
checkInput.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        // console.log('Enter');
        if(document.getElementById('attempt').value.toUpperCase().replace(/\s+/g, '')  == randNum) {
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
  return items[Math.floor(Math.random() * 12)];
}

function flash(color) {
  document.body.style.background = color;
  setTimeout(flashWhite, 200);
}

function flashWhite() {
  document.body.style.background = "#E2B0FF";
}

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
