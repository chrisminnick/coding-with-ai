export class TicTacToeGame {
  constructor(difficulty = 10) {
    this.DEFAULT_DIFFICULTY = difficulty;
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.isGameOver = false;
    this.messageHistory = [];
    this.difficulty = this.DEFAULT_DIFFICULTY;
    this.init();
  }
  /**
   * Initialize the game by adding event listeners to the DOM
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
  /**
   * Start a new game by resetting the game state and clearing the board
   * Then post a new game message to the server
   */
  async startNewGame() {
    this.resetGameState();
    this.clearBoardDisplay();
    await this.postNewGameMessage();
  }

  /**
   * Reset the game state
   */
  resetGameState() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.isGameOver = false;
    this.messageHistory = [{ role: 'user', content: 'new' }];
  }
  /**
   * Clear the board display
   */
  clearBoardDisplay() {
    document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
  }

  /**
   * Post a new game message to the server
   */
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

  /**
   * Update the message display
   * @param {string} message
   */
  updateMessageDisplay(message) {
    document.getElementById('message').innerHTML = message;
  }

  /**
   * Make a move on the board
   * @param {number} index
   */
  makeMove(index) {
    if (this.board[index] === '' && !this.isGameOver) {
      this.board[index] = this.currentPlayer;
      document.getElementsByClassName('cell')[index].innerHTML =
        this.currentPlayer;
      this.messageHistory.push({ role: 'user', content: index.toString() });

      if (this.checkWin()) {
        alert(this.currentPlayer + ' Wins!');
        this.isGameOver = true;
        return;
      }
      if (this.checkDraw()) {
        alert('Draw!');
        this.isGameOver = true;
        return;
      }
      this.aiMove(); // Player is X, AI is O
    }
  }

  /**
   * Check whether someone has won the game
   * @returns {boolean}
   */
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
    return winCombos.some((combo) => {
      return (
        this.board[combo[0]] &&
        this.board[combo[0]] === this.board[combo[1]] &&
        this.board[combo[0]] === this.board[combo[2]]
      );
    });
  }

  /**
   * Check whether the game is a draw
   * @returns {boolean}
   */
  checkDraw() {
    return this.board.every((cell) => cell !== '');
  }

  /**
   * Adds two numbers together.
   * @returns {number}
   */
  sumNumbers(num1, num2) {
    return num1 + num2;
  }

  /**
   * Make a move for the AI
   */
  async aiMove() {
    let move = await this.getAIMove(this.messageHistory);
    this.messageHistory.push({ role: 'assistant', content: move.toString() });
    console.log(move);
    this.board[move] = 'O';
    document.getElementsByClassName('cell')[move].innerHTML = 'O';
    if (this.checkWin()) {
      alert('O Wins!');
      this.isGameOver = true;
    }
  }

  /**
   * Get a move from the AI
   * @param {array} message
   * @returns {string}
   */
  async getAIMove(message) {
    /* 
      Use the value of difficulty to decide whether to
      query the API for a move or use a random move.
      If difficulty is 10, always query the API
      If difficulty is 0, always use a random move
      If difficulty is between 0 and 10, use a random move
      10 - difficulty percent of the time
      and use the best move difficulty percent of the time
    */
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
    while (this.board[move] !== '') {
      randomMove = Math.floor(Math.random() * 9);
    }
    document.getElementById('message').innerHTML = move.toString();
    return randomMove.toString();
  }
}

// Create a new game
new TicTacToeGame();
