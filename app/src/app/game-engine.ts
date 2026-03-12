import { Board, CellValue, Difficulty, SymbolCell, Winner } from './game.types';

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function createEmptyBoard(): Board {
  return Array.from({ length: 9 }, () => null);
}

export function availableMoves(board: Board): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

export function checkWinner(board: Board): Winner {
  for (const [a, b, c] of WIN_LINES) {
    const va = board[a];
    if (va !== null && va === board[b] && va === board[c]) {
      return va;
    }
  }
  if (availableMoves(board).length === 0) {
    return 'empate';
  }
  return null;
}

export function applyMove(board: Board, index: number, symbol: SymbolCell): Board {
  if (index < 0 || index > 8 || board[index] !== null) {
    return board;
  }
  const next = board.slice();
  next[index] = symbol;
  return next;
}

export function chooseMove(board: Board, aiSymbol: SymbolCell, difficulty: Difficulty): number {
  const moves = availableMoves(board);
  if (moves.length === 0) {
    return -1;
  }
  if (difficulty === 'facil') {
    return randomMove(board);
  }
  if (difficulty === 'medio') {
    const strategyChance = Math.random() < 0.6;
    return strategyChance ? strategicMove(board, aiSymbol) : randomMove(board);
  }
  return minimaxMove(board, aiSymbol);
}

function randomMove(board: Board): number {
  const moves = availableMoves(board);
  const idx = Math.floor(Math.random() * moves.length);
  return moves[idx];
}

function strategicMove(board: Board, aiSymbol: SymbolCell): number {
  const opponent = aiSymbol === 'X' ? 'O' : 'X';
  const winning = findImmediate(board, aiSymbol);
  if (winning !== -1) {
    return winning;
  }
  const blocking = findImmediate(board, opponent);
  if (blocking !== -1) {
    return blocking;
  }
  if (board[4] === null) {
    return 4;
  }
  const corners = [0, 2, 6, 8].filter((m) => board[m] === null);
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }
  return randomMove(board);
}

function findImmediate(board: Board, symbol: SymbolCell): number {
  for (const move of availableMoves(board)) {
    const simulated = applyMove(board, move, symbol);
    if (checkWinner(simulated) === symbol) {
      return move;
    }
  }
  return -1;
}

function minimaxMove(board: Board, aiSymbol: SymbolCell): number {
  const opponent = aiSymbol === 'X' ? 'O' : 'X';
  let bestScore = Number.NEGATIVE_INFINITY;
  let bestMove = -1;
  for (const move of availableMoves(board)) {
    const simulated = applyMove(board, move, aiSymbol);
    const score = minimax(simulated, false, aiSymbol, opponent, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

function minimax(
  board: Board,
  isMaximizing: boolean,
  aiSymbol: SymbolCell,
  opponent: SymbolCell,
  depth: number
): number {
  const winner = checkWinner(board);
  if (winner === aiSymbol) {
    return 10 - depth;
  }
  if (winner === opponent) {
    return depth - 10;
  }
  if (winner === 'empate') {
    return 0;
  }

  if (isMaximizing) {
    let best = Number.NEGATIVE_INFINITY;
    for (const move of availableMoves(board)) {
      const score = minimax(applyMove(board, move, aiSymbol), false, aiSymbol, opponent, depth + 1);
      best = Math.max(best, score);
    }
    return best;
  }

  let best = Number.POSITIVE_INFINITY;
  for (const move of availableMoves(board)) {
    const score = minimax(applyMove(board, move, opponent), true, aiSymbol, opponent, depth + 1);
    best = Math.min(best, score);
  }
  return best;
}

export function symbolForStarter(starter: 'humano' | 'ia', humanSymbol: SymbolCell): SymbolCell {
  if (starter === 'humano') {
    return humanSymbol;
  }
  return humanSymbol === 'X' ? 'O' : 'X';
}

export function otherSymbol(symbol: SymbolCell): SymbolCell {
  return symbol === 'X' ? 'O' : 'X';
}

export function readableWinner(winner: Winner, humanSymbol: SymbolCell, aiName: string): string {
  if (winner === 'empate') {
    return 'Empate.';
  }
  if (winner === humanSymbol) {
    return 'Voce venceu.';
  }
  if (winner === null) {
    return '';
  }
  return `${aiName} venceu.`;
}

export function boardToPrompt(board: Board): string {
  const normalized = board.map((c: CellValue, i) => c ?? `${i}`);
  return `${normalized.slice(0, 3).join(' | ')}\n${normalized.slice(3, 6).join(' | ')}\n${normalized.slice(6, 9).join(' | ')}`;
}
