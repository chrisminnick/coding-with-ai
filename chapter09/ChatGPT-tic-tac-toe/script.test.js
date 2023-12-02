import { TicTacToeGame } from './script';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';
import '@testing-library/jest-dom';

function getTicTacToeDOM() {
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
describe('checkWin', () => {
  let game;

  beforeEach(() => {
    game = new TicTacToeGame();
  });

  test('returns false when the board is empty', () => {
    expect(game.checkWin()).toBe(false);
  });

  test('returns false when there is no winning combination', () => {
    game.board = ['X', 'O', 'X', 'O', 'X', 'O', '', '', ''];
    expect(game.checkWin()).toBe(false);
  });

  test('returns true when there is a winning combination', () => {
    game.board = ['X', 'X', 'X', 'O', 'O', '', '', '', ''];
    expect(game.checkWin()).toBe(true);
  });
});
describe('checkDraw', () => {
  let game;

  beforeEach(() => {
    game = new TicTacToeGame();
  });

  test('returns false when the board is empty', () => {
    expect(game.checkDraw()).toBe(false);
  });

  test('returns false when the board is partially filled', () => {
    game.board = ['X', 'O', 'X', 'O', 'X', 'O', '', '', ''];
    expect(game.checkDraw()).toBe(false);
  });

  test('returns true when the board is fully filled and there is no winner', () => {
    game.board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(game.checkDraw()).toBe(true);
  });
});
