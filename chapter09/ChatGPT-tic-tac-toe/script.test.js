import { TicTacToeGame } from './script';
// query utilities:
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  waitFor,
} from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';

function getTicTacToeDOM() {
  // This is just a raw example of setting up some DOM
  // that we can interact with. Swap this with your UI
  // framework of choice 😉
  const div = document.createElement('div');
  div.innerHTML = `
    <div id="board">
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
    </div>
    AI Move:
    <div id="message"></div>
    <span id="difficulty">Level of difficulty:</span>
    <input type="range" id="slider" min="1" max="10" step="1" value="10" />
    <button id="start">Start Game</button>
  `;

  return div;
}
describe('TicTacToeGame', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = getTicTacToeDOM();
    game = new TicTacToeGame();
  });

  test('makeMove updates the board correctly', () => {
    game.makeMove(0);
    expect(game.board[0]).toBe('X');
    expect(document.getElementById('1').innerHTML).toBe('X');
  });

  test('makeMove does not overwrite existing moves', () => {
    game.makeMove(0);
    game.makeMove(0);
    expect(game.board[0]).toBe('X');
  });

  test('makeMove switches players after a move', () => {
    game.makeMove(0);
    game.makeMove(1);
    expect(game.board[0]).toBe('X');
    expect(game.board[1]).toBe('O');
  });

  test('checkWin detects a win correctly', () => {
    game.board = ['X', 'X', 'X', '', '', '', '', '', ''];
    expect(game.checkWin()).toBe(true);
  });

  test('checkDraw detects a draw correctly', () => {
    game.board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(game.checkDraw()).toBe(true);
  });

  test('startNewGame resets the game state correctly', async () => {
    game.board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    await game.startNewGame();
    expect(game.board).toEqual(['', '', '', '', '', '', '', '', '']);
    expect(game.currentPlayer).toBe('X');
    expect(game.isGameOver).toBe(false);
  });
});
