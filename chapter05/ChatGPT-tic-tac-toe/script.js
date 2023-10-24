let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;
let messageHistory = [];

function startNewGame(levelOfDifficulty) {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameOver = false;
  messageHistory = [];
  messageHistory.push({
    role: 'user',
    content: 'new(' + levelOfDifficulty + ')',
  });
  document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
  const response = getAIMove(messageHistory);
  return response;
}

function makeMove(index) {
  if (board[index] === '' && !isGameOver) {
    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerHTML = currentPlayer;
    messageHistory.push({
      role: 'user',
      content: index.toString(),
    });

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
    aiMove(messageHistory); // Player is X, AI is O
  }
}

async function getAIMove(message) {
  // This function will send a message to the API server
  // The message will contain each previous move and the user's latest move
  // The API server will return the AI's next move
  const response = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: message,
    }),
  });
  const data = await response.json();
  document.getElementById('message').innerHTML =
    data.response.choices[0].message.content;
  return data.response.choices[0].message.content;
}

async function aiMove(messageHistory) {
  let move = await getAIMove(messageHistory);
  messageHistory.push({
    role: 'assistant',
    content: move.toString(),
  });
  console.log(move);
  board[move] = 'O';
  document.getElementsByClassName('cell')[move].innerHTML = 'O';
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
