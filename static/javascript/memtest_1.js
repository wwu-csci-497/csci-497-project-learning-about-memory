var level = 1;
var randNum = "";
var errors = 0;

randNum += getRandDigit();
// randNum += getRandDigit();
// randNum += getRandDigit();
// randNum += getRandDigit();
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
  setTimeout(toggleView, time * 750);
}



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
          errors++;
          if(errors == 2) {
            //Quit Game
          }
        }
        document.getElementById('attempt').value = "";
        console.log("Error: " + errors);
    }
});

function getRandDigit() {
  return Math.floor(Math.random() * 10);
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
