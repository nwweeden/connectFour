/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
//create a board of arrays based on current width and height
 function makeBoard() {
  for (let y=0; y<HEIGHT; y++){
    let widthArr = [];

    for (let x=0; x<WIDTH; x++){
      widthArr[x] = null;
    }

    board.push(widthArr);
  }
}
/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  let htmlBoard = document.getElementById("board");
  // Creating the rows and event listeners w/ X columns that go into the htmlBoard
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);
  
  // Creating cells and assigning their x and y values as their id's, based on the height and width.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}
/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  for(let y = HEIGHT - 1; y >= 0; y--){
    let xArray = board[y];
    if(xArray[x] === null){
      return y;
    }
  }
  return null;
}
/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  let currPiece = document.createElement('div');
  // if(currPlayer === 1){
  //   currPiece.setAttribute('class','piece player1');
  // }
  // else{
  //   currPiece.setAttribute('class','piece player2')
  // }
  currPiece.setAttribute('class', `piece player${currPlayer}`)
  // console.log(`height minus y: ${HEIGHT - y}`);
  let correctCell = document.getElementById(`${y}-${x}`);
  correctCell.appendChild(currPiece);
}
/** endGame: announce game end */
function endGame(msg) {
  // console.log('we made it!')
  alert(msg)
}
//should this function be broken down further?
/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  placeInTable(y, x);
  // console.log("x:", x,"y:", y, board);
  // if (currPlayer === 1){
  //   board[y][x] = 1;
  // } else {
  //   board[y][x] = 2;
  // }
  board[y][x] = currPlayer
  // console.log("x:", x,"y:", y, board);
  // check for win
  if (checkForWin()) {
    // console.log(`check for win`)
  return endGame(`Player ${currPlayer} won!`);
    // setTimeout(function(){
    //   return endGame(`Player ${currPlayer} won!`);
    // }, 500)
  }
  // check for tie
  let boardIsFilled = 0;
  for (let i of board){
    if (i.every(e => e !== null)){
      boardIsFilled++;
    }
  }
  if (boardIsFilled === HEIGHT){
    endGame("Tie!");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // if (currPlayer === 1){
  //   currPlayer = 2;
  // } else {
  //   currPlayer = 1;
  // }
  currPlayer = currPlayer === 1 ? 2 : 1;
  // console.log("current player: ", currPlayer);
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  // console.log(board);
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
  //iterate through the board, check to see if four in a row any direction are filled, bounded by the board, and the same color
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
makeBoard();
makeHtmlBoard();
