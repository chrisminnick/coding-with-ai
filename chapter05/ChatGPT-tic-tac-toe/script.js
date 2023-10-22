let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

function makeMove(index) {
  if (board[index] === '' && !isGameOver) {
    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerHTML = currentPlayer;
    if (checkWin()) {
      alert(currentPlayer + ' Wins!');
      isGameOver = true;
      return;
    }
    if (checkDraw()) {
      alert('Draw!');
      isGameOver = true;
      return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    aiMove(); // Player is X, AI is O
  }
}

function aiMove() {
  let available = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') available.push(i);
  }
  let randomCell = available[Math.floor(Math.random() * available.length)];
  board[randomCell] = 'O';
  document.getElementsByClassName('cell')[randomCell].innerHTML = 'O';
  if (checkWin()) {
    alert('O Wins!');
    isGameOver = true;
  }
}

function checkWin() {
  let winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winCombos.length; i++) {
    if (
      board[winCombos[i][0]] &&
      board[winCombos[i][0]] === board[winCombos[i][1]] &&
      board[winCombos[i][0]] === board[winCombos[i][2]]
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return board.every((cell) => cell !== '');
}
