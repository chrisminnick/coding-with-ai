import { TicTacToeGame } from '../tic-tac-toe-client-final/script';

describe('sumNumbers', () => {
  let game;

  beforeEach(() => {
    game = new TicTacToeGame();
  });

  test('returns correct sum for positive numbers', () => {
    expect(game.sumNumbers(1, 2)).toBe(3);
  });

  test('returns correct sum for negative numbers', () => {
    expect(game.sumNumbers(-1, -2)).toBe(-3);
  });

  test('returns correct sum for zero', () => {
    expect(game.sumNumbers(0, 0)).toBe(0);
  });

  test('returns correct sum for mixed positive and negative numbers', () => {
    expect(game.sumNumbers(-1, 2)).toBe(1);
    expect(game.sumNumbers(1, -2)).toBe(-1);
  });
});
