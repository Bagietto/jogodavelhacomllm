import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { Language } from './game.types';

interface OpenRouterChoice {
  message?: { content?: string };
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
}

@Injectable({ providedIn: 'root' })
export class OpenRouterChatService {
  constructor(private readonly http: HttpClient) {}

  async getAiLine(input: {
    language: Language;
    aiName: string;
    boardPrompt: string;
    humanSymbol: 'X' | 'O';
    aiSymbol: 'X' | 'O';
  }): Promise<string> {
    if (!environment.openRouterApiKey) {
      return this.localFallback(input.language, input.aiName, '');
    }

    const budgetMs = 3000;
    const startedAt = Date.now();
    const prompt = this.buildPrompt(input);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.openRouterApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': environment.appUrl,
      'X-Title': environment.appName
    });

    const firstTry = await this.requestModel(
      environment.modelPrimary,
      prompt,
      headers,
      budgetMs
    );
    if (firstTry) {
      return firstTry;
    }

    const remaining = budgetMs - (Date.now() - startedAt);
    if (remaining > 0) {
      const secondTry = await this.requestModel(
        environment.modelFallback,
        prompt,
        headers,
        remaining
      );
      if (secondTry) {
        return secondTry;
      }
    }

    return this.localFallback(input.language, input.aiName, 'network');
  }

  localFallback(language: Language, aiName: string, reason: string): string {
    const messagesByLang: Record<Language, string[]> = {
      'pt-BR': [
        `${aiName}: so um instante, chegou algo aqui no portao.`,
        `${aiName}: pera ai, meu modem deu uma piscada.`,
        `${aiName}: um segundo, estou ajustando minha estrategia.`,
        `${aiName}: voltei, tive uma micro pane no meu circuito.`,
        `${aiName}: quase pronta, estava respondendo uma notinha rapida.`
      ],
      es: [
        `${aiName}: dame un segundo, llamaron a la puerta.`,
        `${aiName}: espera, mi conexion hizo algo raro.`,
        `${aiName}: ya casi, estoy ajustando mi jugada.`,
        `${aiName}: vuelvo, tuve una micro pausa tecnica.`,
        `${aiName}: listo, me distraje un instante.`
      ],
      'en-US': [
        `${aiName}: one sec, someone is at the door.`,
        `${aiName}: hold on, my connection just blinked.`,
        `${aiName}: almost there, tuning my move.`,
        `${aiName}: back now, tiny technical hiccup.`,
        `${aiName}: quick pause, then I am ready.`
      ]
    };
    const pool = messagesByLang[language];
    const seed = Math.floor(Math.random() * pool.length);
    if (reason === 'network' && pool.length > 1) {
      return pool[(seed + 1) % pool.length];
    }
    return pool[seed];
  }

  private async requestModel(
    model: string,
    prompt: string,
    headers: HttpHeaders,
    timeoutMs: number
  ): Promise<string | null> {
    if (timeoutMs <= 0) {
      return null;
    }

    const body = {
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 50
    };

    const request = firstValueFrom(
      this.http.post<OpenRouterResponse>(
        `${environment.openRouterBaseUrl}/chat/completions`,
        body,
        { headers }
      )
    );

    const timer = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), timeoutMs);
    });

    try {
      const result = await Promise.race([request, timer]);
      if (!result || typeof result !== 'object') {
        return null;
      }
      const text = result.choices?.[0]?.message?.content?.trim();
      return text || null;
    } catch {
      return null;
    }
  }

  private buildPrompt(input: {
    language: Language;
    aiName: string;
    boardPrompt: string;
    humanSymbol: 'X' | 'O';
    aiSymbol: 'X' | 'O';
  }): string {
    return [
      `You are ${input.aiName}, friendly and playful.`,
      `Language: ${input.language}.`,
      `Keep response under 20 words.`,
      `No insults, no toxic tone.`,
      `Board state (0-8 placeholders for empty):`,
      input.boardPrompt,
      `Human symbol: ${input.humanSymbol}. AI symbol: ${input.aiSymbol}.`,
      `Return only a short fun sentence, no markdown.`
    ].join('\n');
  }
}
