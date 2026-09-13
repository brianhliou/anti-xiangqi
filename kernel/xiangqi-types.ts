// The board types the rule kernel needs, and the standard array. In the
// mistboard repository these live in packages/game/src/variants-xiangqi.ts
// beside the live-game code; this file is the subset the kernel imports, so
// the kernel here is the mistboard file unchanged apart from its import path.

export type XiangqiColor = 'red' | 'black';

export type XiangqiPieceRole =
  | 'general'
  | 'advisor'
  | 'elephant'
  | 'horse'
  | 'chariot'
  | 'cannon'
  | 'soldier';

export type XiangqiPiece = {
  color: XiangqiColor;
  role: XiangqiPieceRole;
};

type XiangqiFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i';
type XiangqiRank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

/** Algebraic square names: files a to i from Red's left, ranks 1 to 10 from Red's side. */
export type XiangqiSquare = `${XiangqiFile}${XiangqiRank}`;

export type XiangqiBoard = Partial<Record<XiangqiSquare, XiangqiPiece>>;

export type XiangqiMove = {
  from: XiangqiSquare;
  to: XiangqiSquare;
};

const FILES: XiangqiFile[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

function squareOf(file: number, rank: number): XiangqiSquare {
  return `${FILES[file]}${rank}` as XiangqiSquare;
}

export function createInitialXiangqiBoard(): XiangqiBoard {
  const board: XiangqiBoard = {};
  const backRank: XiangqiPieceRole[] = [
    'chariot',
    'horse',
    'elephant',
    'advisor',
    'general',
    'advisor',
    'elephant',
    'horse',
    'chariot',
  ];
  for (let f = 0; f < 9; f++) {
    board[squareOf(f, 1)] = { color: 'red', role: backRank[f]! };
    board[squareOf(f, 10)] = { color: 'black', role: backRank[f]! };
  }
  board[squareOf(1, 3)] = { color: 'red', role: 'cannon' };
  board[squareOf(7, 3)] = { color: 'red', role: 'cannon' };
  board[squareOf(1, 8)] = { color: 'black', role: 'cannon' };
  board[squareOf(7, 8)] = { color: 'black', role: 'cannon' };
  for (const f of [0, 2, 4, 6, 8]) {
    board[squareOf(f, 4)] = { color: 'red', role: 'soldier' };
    board[squareOf(f, 7)] = { color: 'black', role: 'soldier' };
  }
  return board;
}
