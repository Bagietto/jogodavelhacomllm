# Requisitos Funcionais

## RF
- RF-001: O jogador pode escolher quem inicia (humano ou IA).
- RF-002: O jogador pode escolher simbolo (X ou O).
- RF-003: O sistema oferece dificuldade facil, medio e mestre.
- RF-004: O sistema valida jogadas por turno e casa vazia.
- RF-005: O sistema detecta vitoria, derrota e empate.
- RF-006: A IA envia mensagens amigaveis/engracadas durante a partida.
- RF-007: O jogador escolhe idioma da IA: pt-BR, es, en-US.
- RF-008: A jogada da IA deve ocorrer sem travamento perceptivel.
- RF-009: Integracao principal de chat com OpenRouter via Angular 21.x (chamada direta).
- RF-010: Timeout total de 3s para camada OpenRouter (modelo padrao + fallback); ao falhar, manter jogada local e enviar fala randomica de espera/justificativa.
- RF-011: O tabuleiro do MVP deve ser renderizado em 2D.
- RF-012: O sistema deve exibir placar acumulado da sessao (vitorias Humano, vitorias IA e empates).
- RF-013: O sistema deve permitir zerar o placar manualmente.
- RF-014: A IA deve ter nome fixo exibido em UI e mensagens (padrao: VelhAIra).
- RF-015: A interface deve ser visualmente atraente para incentivar novas partidas.
- RF-016: O sistema nao deve usar dark patterns de inducao compulsiva (sem contagem regressiva falsa, sem pressionar continuidade infinita).
- RF-017: A decisao da jogada da IA deve ser local (engine de dificuldade); OpenRouter fica restrito a camada conversacional.
- RF-018: O chat da IA deve usar modelo padrao `qwen/qwen2.5-7b-instruct`.
- RF-019: Em indisponibilidade do modelo padrao, o chat deve usar fallback `meta-llama/llama-3.1-8b-instruct`.

## Regras de Negocio
- RN-001: Tabuleiro 3x3.
- RN-002: Dificuldade facil = aleatorio com alta chance de erro.
- RN-003: Dificuldade medio = estrategia + aleatorio.
- RN-004: Dificuldade mestre = melhor jogada (minimax ou equivalente).
- RN-005: Fallback deve variar justificativas de indisponibilidade, evitando repeticao continua.
- RN-006: Ao fim de cada partida, o placar deve ser atualizado exatamente uma vez.
- RN-007: Apos cada partida, exibir CTA neutro de continuidade (ex.: "Jogar novamente" e "Encerrar agora").
- RN-008: O placar e apenas de sessao (reinicia ao recarregar a pagina no MVP).

## Cenarios Minimos
- UC-001: Configurar partida (inicio, simbolo, dificuldade, idioma).
- UC-002: Jogar partida ate resultado final.
- UC-003: Queda/latencia de LLM com fallback de fala local em ate 3s.
