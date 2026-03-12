# ADR-0007 - Selecao de Modelos LLM

- Status: Aceito
- Data: 2026-03-12

## Contexto
Necessidade de manter conversa da IA com boa latencia e resiliencia no OpenRouter.

## Decisao
- Modelo padrao: `qwen/qwen2.5-7b-instruct`.
- Modelo fallback: `meta-llama/llama-3.1-8b-instruct`.

## Consequencias
- Pro: maior disponibilidade da camada conversacional.
- Pro: controle claro de fallback no MVP.
- Contra: variacao de estilo de resposta entre modelos.
