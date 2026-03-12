# Especificacao Tecnica

## Stack
- Frontend: Angular 21.x (estavel atual em 2026-03-12).
- Renderizacao do tabuleiro: 2D (HTML/CSS no MVP).
- Integracao LLM: OpenRouter via HTTP direto no cliente.
- Testes unitarios: Vitest + Angular TestBed + jsdom.
- Modelo LLM padrao: `qwen/qwen2.5-7b-instruct`.
- Modelo LLM fallback: `meta-llama/llama-3.1-8b-instruct`.

## Componentes
- UI de jogo 2D (tabuleiro + painel de configuracao).
- UI de placar (Humano x IA x Empates + acao de reset).
- UI de fim de partida com opcoes neutras de continuidade.
- Engine local de regras (turno, validacao, resultado).
- Engine de estrategia (facil/medio/mestre).
- Cliente OpenRouter (somente mensagens da IA).
- Modulo de fallback (timeout 3s + frases randomicas).
- Configuracao de identidade da IA (nome padrao VelhAIra, exibido em UI/chat).

## Fluxo de Jogada da IA
1. Jogador realiza jogada.
2. Engine atualiza estado.
3. Sistema aplica jogada da IA via engine local da dificuldade atual.
4. Em paralelo, sistema tenta resposta OpenRouter para a fala da IA com budget total de 3s.
5. Ordem de tentativa de modelo dentro do mesmo budget: padrao -> fallback.
6. Se ambos falharem/timeout, usa fala local randomica nao repetitiva.

## Diretriz de UX
- Interface atrativa com microinteracoes leves e feedback claro de turno/resultado.
- Rejogabilidade saudavel sem dark patterns de compulsao.

## RNF
- RNF-001: Jogada da IA sem travamento perceptivel.
- RNF-002: Timeout estrito total de 3s para a camada OpenRouter (padrao + fallback).
- RNF-003: Continuidade da partida mesmo sem OpenRouter.
- RNF-004: Placar mantido apenas em memoria de sessao no MVP.

## Risco Tecnico
- Chamada direta no Angular 21.x expoe chave no cliente (aceito por ser portfolio).
