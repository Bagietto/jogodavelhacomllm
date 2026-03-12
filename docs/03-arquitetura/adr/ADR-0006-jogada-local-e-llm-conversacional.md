# ADR-0006 - Jogada Local e LLM Conversacional

- Status: Aceito
- Data: 2026-03-12

## Contexto
Necessidade de jogabilidade fluida sem bloqueio por latencia externa.

## Decisao
- Jogada da IA sera sempre decidida localmente pela engine de dificuldade.
- OpenRouter sera usado apenas para camada conversacional da IA.

## Consequencias
- Pro: resposta de jogada imediata e previsivel.
- Pro: menor risco de travamento percebido.
- Contra: menor "inteligencia generativa" direta nas jogadas.
