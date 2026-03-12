import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  applyMove,
  boardToPrompt,
  checkWinner,
  chooseMove,
  createEmptyBoard,
  otherSymbol,
  readableWinner,
  symbolForStarter
} from './game-engine';
import {
  Board,
  Difficulty,
  Language,
  Scoreboard,
  Starter,
  SymbolCell,
  Winner
} from './game.types';
import { OpenRouterChatService } from './openrouter-chat.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly aiName = 'VelhAIra';
  readonly board = signal<Board>(createEmptyBoard());
  readonly difficulty = signal<Difficulty>('medio');
  readonly language = signal<Language>('pt-BR');
  readonly starter = signal<Starter>('humano');
  readonly humanSymbol = signal<SymbolCell>('X');
  readonly currentTurn = signal<SymbolCell>('X');
  readonly gameOver = signal<boolean>(false);
  readonly winner = signal<Winner>(null);
  readonly status = signal<string>('Configure e inicie uma partida.');
  readonly aiLine = signal<string>('VelhAIra: bora jogar?');
  readonly isAiThinking = signal<boolean>(false);
  readonly scoreboard = signal<Scoreboard>({ humano: 0, ia: 0, empates: 0 });

  readonly aiSymbol = computed<SymbolCell>(() => otherSymbol(this.humanSymbol()));
  readonly canInteract = computed<boolean>(() => !this.gameOver() && this.currentTurn() === this.humanSymbol());

  constructor(private readonly chat: OpenRouterChatService) {}

  async startGame(): Promise<void> {
    const board = createEmptyBoard();
    const firstTurn = symbolForStarter(this.starter(), this.humanSymbol());
    this.board.set(board);
    this.currentTurn.set(firstTurn);
    this.winner.set(null);
    this.gameOver.set(false);
    this.status.set('Partida em andamento.');
    this.aiLine.set(`${this.aiName}: boa sorte.`);
    if (firstTurn === this.aiSymbol()) {
      await this.handleAiTurn();
    }
  }

  async onHumanMove(index: number): Promise<void> {
    if (!this.canInteract() || this.board()[index] !== null) {
      return;
    }
    const next = applyMove(this.board(), index, this.humanSymbol());
    this.board.set(next);
    if (this.finishIfNeeded()) {
      return;
    }
    this.currentTurn.set(this.aiSymbol());
    await this.handleAiTurn();
  }

  resetScoreboard(): void {
    this.scoreboard.set({ humano: 0, ia: 0, empates: 0 });
  }

  private async handleAiTurn(): Promise<void> {
    if (this.gameOver()) {
      return;
    }
    this.isAiThinking.set(true);
    const index = chooseMove(this.board(), this.aiSymbol(), this.difficulty());
    if (index !== -1) {
      const next = applyMove(this.board(), index, this.aiSymbol());
      this.board.set(next);
    }

    const line = await this.chat.getAiLine({
      language: this.language(),
      aiName: this.aiName,
      boardPrompt: boardToPrompt(this.board()),
      humanSymbol: this.humanSymbol(),
      aiSymbol: this.aiSymbol()
    });
    this.aiLine.set(line);
    this.isAiThinking.set(false);

    if (this.finishIfNeeded()) {
      return;
    }
    this.currentTurn.set(this.humanSymbol());
  }

  private finishIfNeeded(): boolean {
    const winner = checkWinner(this.board());
    if (!winner) {
      return false;
    }
    this.winner.set(winner);
    this.gameOver.set(true);
    this.status.set(readableWinner(winner, this.humanSymbol(), this.aiName));
    const score = { ...this.scoreboard() };
    if (winner === 'empate') {
      score.empates += 1;
    } else if (winner === this.humanSymbol()) {
      score.humano += 1;
    } else {
      score.ia += 1;
    }
    this.scoreboard.set(score);
    return true;
  }
}
