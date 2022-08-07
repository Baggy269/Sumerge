var playerSymbol;
var enemySymbol;
var win;  // TRUE if somebody won the game
var turn; // Number of the current turn
var row, column;  // Will contain "coordinates"for a specific cell
var cpuEnabled = false;  // Set this to false to play against a human

$(document).ready(function() {
  // Intro screen buttons
  $("#choose-x").on("click", function() {
    playerSymbol = "X";
    enemySymbol = "O";
    cpuEnabled = false;
    $("#intro-screen").fadeOut(300, startGame());
  });
  $("#choose-o").on("click", function() {
    playerSymbol = "O";
    enemySymbol = "X";
	cpuEnabled = false;
    $("#intro-screen").fadeOut(300, startGame());
  });
  
  // Game screen buttons
  $("#restart").on("click", function() {
    restartGame();
  });
  $(".cell").on("click", function() {
    // If nobody has won yet and clicked cell is empty
    if(!win && this.innerHTML === "") {
      if(turn%2 === 0) { // Even number = player turn
        insertSymbol(this, playerSymbol);
      }
      else { // Odd number = enemy turn
        insertSymbol(this, enemySymbol);
      }
    }
  });
});


/******  FUNCTIONS  ******/


// Inserts a symbol in the clicked cell
function insertSymbol(element, symbol) {
  element.innerHTML = symbol;
  
  if(symbol === enemySymbol)
    $("#" + element.id).addClass("player-two"); // Color enemy symbol differently
  $("#" + element.id).addClass("cannotuse");  // Show a "disabled" cursor on already occupied cells
  
  checkWinConditions(element);
  turn++;
  // Game end - If somebody has won or all cells are filled
  if(win || turn > 8) {
    $("#restart").addClass("btn-green");  // Highlights "restart" button
    $(".cell").addClass("cannotuse");  // Tells visually you can't interact anymore with the game grid
  }
  else if(cpuEnabled && turn%2 !== 0) {
    cpuTurn();
  }
}

/* Changes screen with a fade effect */
function startGame() {
	$("#game-screen").fadeIn(300);
	restartGame();
}

/* Sets everything to its default value */
function restartGame() {
  turn = 0;
  win = false;
  $(".cell").text("");
  $(".cell").removeClass("wincell");
  $(".cell").removeClass("cannotuse");
  $(".cell").removeClass("player-two");
  $("#restart").removeClass("btn-green");
}

function checkWinConditions(element) {
  row = element.id[4];
  column = element.id[5];
    
  win = true;
  for(var i=0; i<3; i++) {
    if($("#cell" + i + column).text() !== element.innerHTML) {
      win = false;
    }
  }
  if(win) {
    for(var i=0; i<3; i++) {
      $("#cell" + i + column).addClass("wincell");
    }
    return; 
  }
    
  win = true;
  for(var i=0; i<3; i++) {
    if($("#cell" + row + i).text() !== element.innerHTML) {
      win = false;
    }
  }
  if(win) {
    for(var i=0; i<3; i++) {
      $("#cell" + row + i).addClass("wincell");
    }
    return;
  }
    
  win = true;
  for(var i=0; i<3; i++) {
    if($("#cell" + i + i).text() !== element.innerHTML) {
      win = false;
    }
  }
  if(win) {
    for(var i=0; i<3; i++) {
      $("#cell" + i + i).addClass("wincell");
    }
    return;
  }
    
  win = false;
  if($("#cell02").text() === element.innerHTML) {
    if($("#cell11").text() === element.innerHTML) {
      if($("#cell20").text() === element.innerHTML) {
        win = true;
        $("#cell02").addClass("wincell");
        $("#cell11").addClass("wincell");
        $("#cell20").addClass("wincell");
      }
    }
  }
}