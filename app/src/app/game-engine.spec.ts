import {
  applyMove,
  checkWinner,
  chooseMove,
  createEmptyBoard,
  otherSymbol
} from './game-engine';
import { Board } from './game.types';

describe('game-engine', () => {
  it('creates an empty board', () => {
    const board = createEmptyBoard();
    expect(board.length).toBe(9);
    expect(board.every((c) => c === null)).toBe(true);
  });

  it('applies a valid move', () => {
    const board = createEmptyBoard();
    const next = applyMove(board, 0, 'X');
    expect(next[0]).toBe('X');
  });

  it('does not override occupied move', () => {
    const board = applyMove(createEmptyBoard(), 0, 'X');
    const next = applyMove(board, 0, 'O');
    expect(next[0]).toBe('X');
  });

  it('detects winner rows and draw', () => {
    expect(checkWinner(['X', 'X', 'X', null, null, null, null, null, null])).toBe('X');
    expect(checkWinner(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'])).toBe('empate');
  });

  it('medium and hard return available move', () => {
    const board: Board = ['X', null, null, null, 'O', null, null, null, null];
    const medium = chooseMove(board, 'O', 'medio');
    const hard = chooseMove(board, 'O', 'mestre');
    expect(board[medium]).toBeNull();
    expect(board[hard]).toBeNull();
  });

  it('returns opposite symbol', () => {
    expect(otherSymbol('X')).toBe('O');
    expect(otherSymbol('O')).toBe('X');
  });
});
