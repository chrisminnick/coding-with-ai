export class TicTacToeGame {
  constructor(difficulty = 10) {
    this.DEFAULT_DIFFICULTY = difficulty;
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.totalGamesPlayed = 0;
    this.isGameOver = false;
    this.messageHistory = [];
    this.difficulty = this.DEFAULT_DIFFICULTY;
    this.init();
  }

  /**
   * The `init` function initializes the game by adding event listeners to the cells, start button, and
   * difficulty slider, and updating the difficulty level based on the slider value.
   */
  init() {
    document.addEventListener('DOMContentLoaded', (event) => {
      let cells = document.querySelectorAll('.cell');
      cells.forEach((cell, i) => {
        cell.addEventListener('click', () => this.makeMove(i));
      });
      document
        .getElementById('start')
        .addEventListener('click', () => this.startNewGame());

      let slider = document.getElementById('slider');
      document.getElementById('difficulty').innerHTML =
        'Level of difficulty: ' + slider.value;
      slider.addEventListener('change', (e) => {
        document.getElementById('difficulty').innerHTML =
          'Level of difficulty: ' + e.target.value;
        this.difficulty = e.target.value;
      });
    });
  }

  async startNewGame() {
    this.resetGameState();
    this.clearBoardDisplay();
    await this.postNewGameMessage();
  }

  endGame() {
    this.isGameOver = true;
    this.updateGameStats();
  }

  resetGameState() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.isGameOver = false;
    this.messageHistory = [{ role: 'user', content: 'new' }];
  }

  clearBoardDisplay() {
    document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
  }

  updateGameStats() {
    if (this.isGameOver) {
      this.totalGamesPlayed++;
    }
  }

  async postNewGameMessage() {
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: this.messageHistory }),
      });

      const data = await response.json();
      this.updateMessageDisplay(data.response.choices[0].message.content);
    } catch (error) {
      console.error('Failed to post new game message:', error);
      this.updateMessageDisplay('Error starting a new game. Please try again.');
    }
  }

  updateMessageDisplay(message) {
    document.getElementById('message').innerHTML = message;
  }

  makeMove(index) {
    if (this.board[index] === '' && !this.isGameOver) {
      this.board[index] = this.currentPlayer;
      document.getElementsByClassName('cell')[index].innerHTML =
        this.currentPlayer;
      this.messageHistory.push({ role: 'user', content: index.toString() });

      if (this.checkWin()) {
        alert(this.currentPlayer + ' Wins!');
        return;
      }
      if (this.checkDraw()) {
        alert('Draw!');
        return;
      }
      this.aiMove(); // Player is X, AI is O
    }
  }

  checkWin() {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const win = winCombos.some((combo) => {
      return (
        this.board[combo[0]] &&
        this.board[combo[0]] === this.board[combo[1]] &&
        this.board[combo[0]] === this.board[combo[2]]
      );
    });
    win ? this.endGame() : null;
    return win;
  }

  checkDraw() {
    const draw = this.board.every((cell) => cell !== '');
    draw ? this.endGame() : null;
    return draw;
  }

  async aiMove() {
    let move = await this.getAIMove(this.messageHistory);
    this.messageHistory.push({ role: 'assistant', content: move.toString() });
    console.log(move);
    this.board[move] = 'O';
    document.getElementsByClassName('cell')[move].innerHTML = 'O';
    if (this.checkWin()) {
      alert('O Wins!');
    }
  }

  async getAIMove(message) {
    let randomNumber = Math.random();
    if (randomNumber < this.difficulty / 10) {
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
      let messageElement = document.getElementById('message');
      messageElement.innerHTML = data.response.choices[0].message.content;
      return data.response.choices[0].message.content;
    }
    let randomMove = Math.floor(Math.random() * 9);
    while (this.board[randomMove] !== '') {
      randomMove = Math.floor(Math.random() * 9);
    }
    document.getElementById('message').innerHTML = randomMove.toString();
    return randomMove.toString();
  }
}

new TicTacToeGame();
