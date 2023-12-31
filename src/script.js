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

function handleCellClick(event) {
  if (gameOver) return;

  const cell = event.target;
  const index = cell.dataset.index;

  if (gameBoard[index] === "") {
    // Requirement 8: Modify the HTML content of an element
    cell.innerHTML = currentPlayer;
    // Requirement 9: Modify the style of an element using classList
    cell.classList.add("disabled");
    // Requirement 10: Modify at least one attribute of an element in response to user interaction.
    cell.classList.add("clicked");  
    gameBoard[index] = currentPlayer;

    if (checkForWin(currentPlayer)) {
      // Hightlight the wining cell combination
      const winCellTiles = getWinningTiles(currentPlayer);
      // // Remove winning-cell class from all cells
      for (const boardCell of boardElement.children) {
        boardCell.classList.remove("clicked");
      }
      for (const winIndex of winCellTiles) {
        boardElement.children[winIndex].classList.add("winning-cell");
      }

      // Delay to display the winning cells before showing the alert
      setTimeout(() => {
        if (confirm(`Player ${currentPlayer} wins! Play again?`)) {
          // restartGame();
        } else {
          endGame();
        }
        // Requirement 12: Use window.alert
        window.alert(`Player ${currentPlayer} wins!`);
        endGame();
      }, 2000);
    } else if (gameBoard.every((cell) => cell !== "")) {
      // Requirement 12: Use window.alert
      // window.alert("It's a draw!");
      setTimeout(() => {
        if (confirm("It's a draw! Play again?")) {
          restartGame();
        } else {
          endGame();
        }
      }, 500);
      endGame();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      // Requirement 8: Modify the text content of an element
      messageElement.textContent = `Player ${currentPlayer}'s turn`;

      setTimeout(computerTurn, 500); // Requirement 12: BOM method
    }
  }
}

// restart game function
function restartGame() {
  if (confirm("Are you sure you want to restart the game?")) {
    for (const cell of boardElement.children) {
      cell.textContent = "";
      cell.classList.remove("disabled");
      cell.classList.remove("clicked");
      cell.classList.remove("winning-cell");
    }
    currentPlayer = "X";
    computerPlayer = "O";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;

    messageElement.textContent = "Player's turn";
  }
}

// Get the winning tiles
function getWinningTiles(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] === player &&
      gameBoard[b] === player &&
      gameBoard[c] === player
    ) {
      return pattern; // Return the winning combination
    }
  }

  return [];
}

// computerTurn() to play game
function computerTurn() {
  if (gameOver) return;

  let emptyCells = gameBoard.reduce((acc, val, index) => {
    if (val === "") acc.push(index);
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const computerMove = emptyCells[randomIndex];

  const cell = boardElement.children[computerMove];
  cell.textContent = computerPlayer;
  cell.classList.add("disabled");
  gameBoard[computerMove] = computerPlayer;

  if (checkForWin(computerPlayer)) {
    // Requirement 12: Use window.alert
    window.alert("Computer wins!");
    endGame();
  } else if (gameBoard.every((cell) => cell !== "")) {
    // Requirement 12: Use window.alert
    window.alert("It's a draw!");
    endGame();
  } else {
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// checkForWin(player) to check for the winner
function checkForWin(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] === player &&
      gameBoard[b] === player &&
      gameBoard[c] === player
    ) {
      return true;
    }
  }

  return false;
}

// endGame() to end game
function endGame() {
  gameOver = true;
  for (const cell of boardElement.children) {
    cell.classList.add("disabled");
  }
}

// Requirement 11: Register a submit event listener and create a DOM-based event validation
nameForm.addEventListener("submit", (event) =>{
  event.preventDefault();
  const playerNameInput = document.getElementById("player-name");
  const playerName = playerNameInput.value.trim();
  if (playerName === "") {
    alert("Please enter your name to start the game.");
  } else {
    playerNameInput.setAttribute("disabled", "true");
    playerNameInput.classList.add("disabled");
    document.getElementById("name-form").style.display = "none";
    document.getElementById("board").style.display = "grid"; // Display the game board
    document.getElementById("message").textContent = `${playerName}'s turn`;
  }
});