const cells = document.querySelectorAll('[data-cell]');
const gameMessage = document.getElementById('gameMessage');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle click on a cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(cell, index), { once: true });
});

function handleCellClick(cell, index) {
  if (isGameOver) return;

  cell.textContent = currentPlayer;
  board[index] = currentPlayer;

  if (checkWin(currentPlayer)) {
    gameMessage.textContent = `${currentPlayer} wins!`;
    isGameOver = true;
  } else if (board.every(cell => cell)) {
    gameMessage.textContent = "It's a tie!";
    isGameOver = true;
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === player;
    });
  });
}

// Restart the game
restartButton.addEventListener('click', restartGame);

function restartGame() {
  board = Array(9).fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  currentPlayer = 'X';
  isGameOver = false;
  gameMessage.textContent = '';
}
