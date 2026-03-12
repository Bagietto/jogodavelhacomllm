# C4 - Contexto (Nivel 1)

## Sistema
Jogo da Velha com IA (Web Angular 21.x).

## Ator
- Jogador

## Sistema Externo
- OpenRouter (LLMs)

## Relacoes
- Jogador interage com o sistema para configurar e jogar.
- Sistema consulta OpenRouter para mensagens da IA.
- Jogada da IA e decidida localmente; em falha/timeout de LLM, sistema usa fallback local de fala.

## Diagrama
```text
[Jogador] --> [Jogo da Velha com IA (Angular 21.x)] --> [OpenRouter]
```
