/* 
 * This program allows the user to play tic-tac-toe with the computer. 
 */
var origBoard;
var humanPlayer = 'X';
var comp = 'O';
var winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
var annc;
var cells;
var cellRect = []; 
window.addEventListener("load", start, false);
/*
 * The start function initalizes all the variables needed to play the game. 
 * It also works as a replay function. 
 */
function start()
{
    //Creating the board and creating event listener
    cells = document.querySelectorAll(".cell");
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) 
    {
        cells[i].innerHTML = "";
        cells[i].addEventListener('click', playerClick, false); 
    }  
    annc = document.getElementById("annc");
    //Determines which play will go first
    var isPlayerTurn = Math.random()<0.5; 
    if (!isPlayerTurn)
    {
        annc.innerHTML = "Computer goes first!";
        compTurn(); 
    }
    else
    {
        annc.innerHTML = "Player goes first!";
    }
    
    document.getElementById("replay").addEventListener("click", start, false);
}
/*
 * Checks if the player move is valid, if valid an "X" will be placed in 
 * respective spot on the board.
 */
function playerClick(e)
{   
    if (typeof origBoard[e.target.id]==="number")
   {
        origBoard[e.target.id] = humanPlayer; 
        document.getElementById(e.target.id).innerHTML = humanPlayer;
        var gameWon = checkWin(origBoard, humanPlayer);
        if (gameWon) 
            gameOver(gameWon);
        else
            compTurn();
  }
}
/*
 * Checks if the computer move is valid, if valid an "O" will be placed in 
 * respective spot on the board.
 */
function compTurn()
{
    /*
     * the options array is filled with all the empty spots on the board
     */
    var options = [];
    for (var i = 0, j = 0; i < origBoard.length; i++)
    {
        if (typeof origBoard[i]==="number")
        {
            options[j] = origBoard[i];
            j++;
        }       
    }
    /*
     * A random number between 0 and the length of the options array is 
     * returned then placed in the corresponding spots in the board
     */
    var index = Math.floor(Math.random()*(options.length));
    origBoard[options[index]] = comp; 
    document.getElementById(options[index]).innerHTML = comp;
    var gameWon = checkWin(origBoard, comp);
        if (gameWon) 
            gameOver(gameWon);
}
/*
 * Checks if the game is in a won state, if the game is in a won state 
 * the gameOver function will be called
 */
function checkWin(board, player)
{
    var check = [];
    gameWon = null;
    for (var i = 0; i < winCombos.length; i++) 
    {
        for ( var j = 0; j < winCombos[i].length; j++)
        {        
            check[j] = board[winCombos[i][j]];           
        }
        if (check.every(elem => elem===player))
        {
            gameWon = player;
            break;
        }       
    }
    if (gameWon===null)
    {
        if (origBoard.every(elem => typeof elem==="string"))
            gameWon = "tie";
    }
    return gameWon; 
}
/*
 * the gameOver function removes the eventlisteners since the game is over 
 * and also announces the winner
 */
function gameOver(player)
{
    window.removeEventListener("click", playerClick, false); 
    if (player===humanPlayer||player===comp) 
        annc.innerHTML = player + " has won!";
    else 
        annc.innerHTML = "It is a tie!";
}