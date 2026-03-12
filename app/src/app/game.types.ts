export type SymbolCell = 'X' | 'O';
export type CellValue = SymbolCell | null;
export type Board = CellValue[];
export type Difficulty = 'facil' | 'medio' | 'mestre';
export type Language = 'pt-BR' | 'es' | 'en-US';
export type Starter = 'humano' | 'ia';
export type Winner = SymbolCell | 'empate' | null;

export interface Scoreboard {
  humano: number;
  ia: number;
  empates: number;
}
