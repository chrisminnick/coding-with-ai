import { TicTacToeGame } from './script';

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

describe('clearBoardDisplay', () => {
  let game;
  let div;

  beforeEach(() => {
    game = new TicTacToeGame();
    div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <div class="cell">X</div>
      <div class="cell">O</div>
      <div class="cell">X</div>
      <div class="cell">O</div>
      <div class="cell">X</div>
      <div class="cell">O</div>
      <div class="cell">X</div>
      <div class="cell">O</div>
      <div class="cell">X</div>
    `;
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  test('clears all cells in the board', () => {
    game.clearBoardDisplay();
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      expect(cell.innerHTML).toBe('');
    });
  });
});

describe('Game stats', () => {
  let game;
  beforeEach(() => {
    game = new TicTacToeGame();
  });
  test('increments total games played after a game ends', () => {
    expect(game.totalGamesPlayed).toBe(0);
    game.endGame();
    expect(game.totalGamesPlayed).toBe(1);
  });
});

describe('Game end', () => {
  let game;
  beforeEach(() => {
    game = new TicTacToeGame();
  });
  test('set isGameOver to true after a player wins', () => {
    expect(game.isGameOver).toBe(false);
    game.board = ['X', 'X', 'X', 'O', 'O', '', '', '', ''];
    game.checkWin();
    expect(game.isGameOver).toBe(true);
  });
});
