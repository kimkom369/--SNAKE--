
 var canvas, ctx, gameControl, gameActive;
 
 // render X times per second
 var x = 8.5;
 
 // GAME COLOR SETTING 
 const CANVAS_BORDER_COLOUR = 'black';
 const CANVAS_BACKGROUND_COLOUR = "white";
 const SNAKE_COLOUR = 'lightgreen';
 const SNAKE_BORDER_COLOUR = 'darkgreen';


window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownEvent);

    gameControl = startGame(x);
  };

// ****** START GAME ***** //
function startGame(x) {
    gameActive = true;
    document.getElementById("game-status").innerHTML = "<small>Game Started!</small>";
    document.getElementById("game-score").innerHTML= "";
    return setInterval(draw, 1000 / x);
}
// ****** PAUSE GAME ***** //
function pauseGame() {
    clearInterval(gameControl);
    gameActive = false;
    document.getElementById("game-status").innerHTML = "<small>Game Paused</small>";
}
// ****** END GAME ***** //
function endGame(x) {
 clearInterval(gameControl);
 gameActive = false;
 document.getElementById("game-status").innerHTML = "<small>Game Over !</small>";
 document.getElementById("game-score").innerHTML = "<h1> " + x + "</h1>"
 alert('game over');
}


// ********* GAME VARIABLES  ********** //

//Grid --setup
var gridSize = (tileSize = 20); //20*20 = 400
var nextX = (nextY = 0);

//SNAKE --setup
var defaultTailSize = 1;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 5);

//APPLE --setup
var appleX = (appleY = 15);

/*********  GAME INITIAT functions  **********/

function draw() {
    // MOVE SNAKE IN NEXT POSITION
    snakeX += nextX;
    snakeY += nextY;

    

    // SNAKE IN GAME
    if (snakeX < 0) {
        snakeX = gridSize;
    }
    if (snakeX > gridSize -1) {
        snakeX = 0;
    }
    
    if (snakeY < 0) {
        snakeY = gridSize -1;
    }
    if (snakeY > gridSize -1) {
        snakeY = 0;
    }
    
    //SNAKE EAT APPLE
    if (snakeX == appleX && snakeY == appleY) {
        tailSize++;
    // Randomizes the APPLES position !
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
    }
 
    // select the color to fill the canvas
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    // select the color to fill the border of the canvas
    ctx.strokeStyle = CANVAS_BORDER_COLOUR;
    // draw a "filled" rectangle to cover the entire canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw a "border" around the enitre canvas
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // PAINT SNAKE
    ctx.fillStyle = SNAKE_COLOUR;
    ctx.strokeStyle = SNAKE_BORDER_COLOUR;
    for (var i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );

        ctx.strokeRect(snakeTrail[i].x * tileSize, 
            snakeTrail[i].y * tileSize, tileSize, tileSize);

        // SNAKES BITES TAIL scenario
        if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            if (tailSize > 3) {
                endGame(tailSize);
            }
            tailSize = defaultTailSize;
        }
    }
        // PAINT APPLE
        ctx.fillStyle = "red";
        ctx.fillRect(appleX * tileSize, appleY * tileSize, 
            tileSize, tileSize);

        snakeTrail.push({ x: snakeX, y: snakeY});
        while (snakeTrail.length > tailSize) {
            snakeTrail.shift();
        }
 }

// ****** KEYBOARD 37=Left, 38=Up, 39=Right, 40=Down ***** //
function keyDownEvent(e) {
    switch (e.keyCode) {
        case 37:
            nextX = -1;
            nextY = 0;
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            break;
        case 32:
            if (gameActive == true) {
                pauseGame();
            }
            else {
                gameControl = startGame(x);
            }
            break;
    }
}