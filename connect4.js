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
// TODO(done): set "board" to empty HEIGHT x WIDTH matrix array

// function makeBoard() {
//   let boardRows = [];
//   for (let i=0; i<WIDTH; i++) {
//     boardRows.push([null]);
//   }
//   for (let j=0; j<HEIGHT; j++) {
//     board.push(boardRows);
//   }
// }

function makeBoard() {
  for (let y=0; y<HEIGHT; y++) {
    board.push(Array.from({length: WIDTH}));
  }
}
//from method: look up on MDN

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO (done): get "htmlBoard" variable from the item in HTML w/ID of "board"
  //JS variable is set by getting HTML element 'board' from index.html
  let board = document.getElementById('board');

  // TODO(done): add comment for this code
  let top = document.createElement("tr");
  //JS variable of 'top' is declared with a value of the table row
  top.setAttribute("id", "column-top");
  //new variable 'top' is given the id of 'column-top'
  top.addEventListener("click", handleClick);
  //the 'top' variable gets an event listener of 'click' and the function 'handleClick' executes when the event occurs

  for (let x = 0; x < WIDTH; x++) {
    //we loop the number of times that the board is wide
    let headCell = document.createElement("td");
    //on each loop, we create a table data element called 'headCell'
    headCell.setAttribute("id", x);
    //headCell is assigned an id of 'x'
    top.append(headCell);
    //each headCell is appended (given a child) to top
  }
  board.append(top);

  // TODO(done): add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    //we loop the number of times that the board is tall
    const row = document.createElement("tr");
    //a variable of 'row' is arrigned to each table-row that is created
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      //an inner loop loops over the previously created table-row and create a table-data element each time
      cell.setAttribute("id", `${y}-${x}`);
      //an id containing the x and y values of the two loops is assigned to each table-data that is created
      row.append(cell);
      //each row is appended with the new 'cell'
    }
    board.append(row);
    //the html board is appended with the new rows(and each row's cells)
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO(done): write the real version of this, rather than always returning 0
  //this function returns the height where the next piece should drop down to
  for (let y = HEIGHT-1; y>=0; y--) {
      if (!board[y][x]) {
        return y;
      }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO(done): make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`player${currPlayer}Piece`);
  // TODO(done): add the div to the correct td cell in the HTML game board (STEP Five in instructions)
  
  let place = document.getElementById(`${y}-${x}`);

  place.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO(done): pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  //TODO: fix function so it finds the lowest spot available in the column
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  //check all cells by id to see if they have the class of 'piece', if it does, that cell is already occupied
  //write a loop that will check all cells in the colmn for a class




  // place piece in board and add to HTML table
  // TODO(done): add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO(done): check if all cells in board are filled; if so call, endGame


  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }


//if all cells in the top row are filled, then there must be a tie

  // switch players
  // TODO(done): switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();