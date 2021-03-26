/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // DONE: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board.push([]);
    for (let j = 0; j < WIDTH; j++) {
      board[i].push(null);
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // DONE: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // DONE: add comment for this code
  // creates row above board to handle player clicks/moves
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // appends table elements with corresponding ids(idx) to top row 
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // DONE: add comment for this code
  // creates rest of elements with corresponding ids('id y-x') in rows that are appended to htmlBoard
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
  // DONE: write the real version of this, rather than always returning 0
  for (let i = 5; i >= 0; i--) {
    if (board[i][x] === null) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // DONE: make a div and insert into correct table cell
  const cell = document.getElementById(`${y}-${x}`);
  if (cell.querySelector('div') === null) {
    const div = document.createElement("div");
    div.className = `piece p${currPlayer}`;
    cell.append(div);
  }
}

/** endGame: announce game end */

function endGame(msg) {
  // DONE: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // DONE: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // DONE: check if all cells in board are filled; if so call, call endGame
  let allFilled = true;
  for (let i = 5; i >= 0; i--) {
    if (board[i].some((row) => row === null)) {
      allFilled = false;
      break;
    }
  }
  if (allFilled) {
    endGame('Tie game!');
  }

  // switch players
  // DONE: switch currPlayer 1 <-> 2
  if (currPlayer === 1) {
    currPlayer = 2;
  }
  else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
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

  // DONE: read and understand this code. Add comments to help you.

  //while traversing the board left to right top to bottom, make 4 collections of cells to check for a win with the current cell being at the end of the four
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //horiz is from current cell to the right
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //vert is from the current cell downwards
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //diagDR is from current cell down right
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //diagDL is from current cell DL
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //checks to see if any of these collections are all of one player with above function _win()
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
