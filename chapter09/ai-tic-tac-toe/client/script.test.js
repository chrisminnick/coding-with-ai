const { makeMove } = require('./script');

test('makeMove updates the board correctly', () => {
  startNewGame(0);
  makeMove(0);
  expect(board[0]).toBe('X');
});
