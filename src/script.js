// Requirement 1: Cache an element using getElementById
const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
// Requirement 2: Cache elements using querySelector
const nameForm = document.querySelector("#name-form");
// Requirement 3: Use parent-child-sibling relationships
const formParent = nameForm.parentNode;

//Requirement 7: Create a DocumentFragment for the board
const fragment = new DocumentFragment();
// Requirement 4: Iterate over a collection of elements to accomplish a task
for (let i = 0; i < 9; i++) {
  // Requirement 5: Create an element using createElement
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  // Requirement 6: Append created div cell to the document fragment
  fragment.appendChild(cell);
}

// Requirement 6: Append the DocumentFragment to the board element
boardElement.appendChild(fragment);

// Game variables
let currentPlayer = "X";
let computerPlayer = "O";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

// Requirement 11: Register a click event listener and create an event handler
for (const cell of boardElement.children) {
  cell.addEventListener("click", handleCellClick);
}