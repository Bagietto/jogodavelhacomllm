# Tasks MVP

## Baseline de Stack (obrigatorio para execucao)
- Framework: Angular 21.x + TypeScript.
- UI: HTML + SCSS (tabuleiro 2D).
- Estado: Services + RxJS (sem backend no MVP).
- HTTP: Angular `HttpClient`.
- LLM Gateway: OpenRouter.
- Testes unitarios: Vitest + Angular TestBed + jsdom.
- Testes E2E: Playwright.
- Gerenciador de pacotes: npm.

## T-001 Setup Angular
- Tipo: Setup
- Prioridade: P0
- Dependencias: nenhuma
- Entrega:
  - Criar projeto Angular 21.x.
  - Estruturar modulos/pastas (`core`, `features/game`, `shared`).
  - Definir SCSS como padrao de estilos.
  - Configurar ambientes (`environment.ts` para OpenRouter).
  - Fixar versoes no `package.json` (Angular 21.x) e manter lockfile versionado.
- DoD:
  - App sobe localmente.
  - Estrutura base versionada.

## T-002 Modelagem de Dominio do Jogo
- Tipo: Core
- Prioridade: P0
- Dependencias: T-001
- Entrega:
  - Definir tipos: jogador, simbolo, dificuldade, estado da partida.
  - Definir contrato de engine local.
- DoD:
  - Tipos e interfaces usados no app sem `any`.

## T-003 Engine de Regras 3x3
- Tipo: Core
- Prioridade: P0
- Dependencias: T-002
- Entrega:
  - Validacao de jogada.
  - Alternancia de turnos.
  - Deteccao de vitoria/empate.
- DoD:
  - Testes unitarios cobrindo cenarios base.

## T-004 Engine de Dificuldade
- Tipo: Core
- Prioridade: P0
- Dependencias: T-003
- Entrega:
  - Facil: aleatorio com erro alto.
  - Medio: estrategia + aleatorio.
  - Mestre: minimax (ou equivalente).
- DoD:
  - Testes unitarios por dificuldade.

## T-005 UI 2D do Tabuleiro
- Tipo: Frontend
- Prioridade: P0
- Dependencias: T-003
- Entrega:
  - Tabuleiro 2D interativo.
  - Feedback visual de turno, jogada invalida e fim de partida.
- DoD:
  - Fluxo completo jogavel em desktop e mobile.

## T-006 Tela de Configuracao de Partida
- Tipo: Frontend
- Prioridade: P0
- Dependencias: T-005
- Entrega:
  - Escolha de quem inicia.
  - Escolha de simbolo X/O.
  - Escolha de dificuldade.
  - Escolha de idioma (`pt-BR`, `es`, `en-US`).
- DoD:
  - Configuracoes impactam partida corretamente.

## T-007 Placar da Sessao
- Tipo: Frontend/Core
- Prioridade: P1
- Dependencias: T-003, T-005
- Entrega:
  - Exibir Humano x IA x Empates.
  - Atualizar placar uma vez por partida.
  - Acao de reset.
  - Reinicio ao recarregar pagina.
- DoD:
  - Regras RN-006 e RN-008 validadas.

## T-008 Identidade da IA
- Tipo: Frontend
- Prioridade: P1
- Dependencias: T-005
- Entrega:
  - Exibir nome padrao `VelhAIra` na UI e no chat.
- DoD:
  - Nome aparece em todos os pontos previstos.

## T-009 Cliente OpenRouter (Conversacional)
- Tipo: Integracao
- Prioridade: P0
- Dependencias: T-001
- Entrega:
  - Cliente HTTP para OpenRouter com `HttpClient`.
  - Modelo padrao: `qwen/qwen2.5-7b-instruct`.
  - Fallback: `meta-llama/llama-3.1-8b-instruct`.
- DoD:
  - Chamada funcional para ambos os modelos.
  - Segredos consumidos por `environment` sem hardcode em componente.

## T-010 Orquestracao de Timeout e Fallback de Fala
- Tipo: Integracao/Core
- Prioridade: P0
- Dependencias: T-004, T-009
- Entrega:
  - Budget total de 3s (padrao -> fallback).
  - Se falhar, usar fala local randomica nao repetitiva.
  - Jogada sempre local.
- DoD:
  - Cenarios de timeout/falha cobertos por testes.

## T-011 Chat da IA Multilingue
- Tipo: Frontend/Integracao
- Prioridade: P1
- Dependencias: T-006, T-009, T-010
- Entrega:
  - Exibir falas amigaveis/engracadas.
  - Respeitar idioma selecionado.
- DoD:
  - Validacao manual em `pt-BR`, `es`, `en-US`.

## T-012 UX de Rejogabilidade Saudavel
- Tipo: UX/Frontend
- Prioridade: P1
- Dependencias: T-005
- Entrega:
  - Microinteracoes leves.
  - CTA neutro no fim: "Jogar novamente" e "Encerrar agora".
  - Sem dark patterns.
- DoD:
  - Checklist de UX etica aprovado.

## T-013 Observabilidade Minima
- Tipo: Qualidade
- Prioridade: P2
- Dependencias: T-009, T-010
- Entrega:
  - Logs de erro de integracao.
  - Contadores basicos de eventos (inicio/fim de partida).
- DoD:
  - Erros de API rastreaveis localmente.

## T-014 Toolchain de Qualidade
- Tipo: Qualidade
- Prioridade: P0
- Dependencias: T-001
- Entrega:
  - Configurar scripts `lint`, `test`, `test:coverage`, `e2e`.
  - Configurar Vitest com ambiente `jsdom`.
  - Validar pipeline local minima para rodar checks.
- DoD:
  - Comandos executam sem erro no projeto base.
  - Cobertura minima de unit test >= 80% nas regras do jogo.

## T-015 KPI de Sessao
- Tipo: Produto/Qualidade
- Prioridade: P2
- Dependencias: T-013
- Entrega:
  - Medir partidas por sessao.
  - Exibir/registrar media para validar meta `>=3`.
- DoD:
  - Evidencia de medicao em ambiente local.

## T-016 Testes E2E do Fluxo Principal
- Tipo: Qualidade
- Prioridade: P1
- Dependencias: T-006, T-007, T-010, T-011, T-014
- Entrega:
  - E2E: configurar partida, jogar, atualizar placar, fallback de fala.
- DoD:
  - Suite E2E verde no fluxo critico.

## T-017 Hardening de Risco Conhecido
- Tipo: Seguranca
- Prioridade: P2
- Dependencias: T-009
- Entrega:
  - Documentar risco de chave no frontend.
  - Limitar uso da chave (escopo/rate limit no provedor).
- DoD:
  - Risco e mitigacoes registrados no projeto.
