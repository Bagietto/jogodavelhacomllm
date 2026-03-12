# ADR-0009 - Framework de Testes Unitarios

- Status: Aceito
- Data: 2026-03-12

## Contexto
Necessidade de stack de testes simples de manter e aderente ao mercado Angular atual.

## Decisao
- Adotar Vitest como framework de unit test.
- Manter Angular TestBed para testes de componentes/servicos.
- Usar `jsdom` como ambiente de execucao dos testes unitarios.

## Consequencias
- Pro: feedback mais rapido na execucao dos testes.
- Pro: menor friccao de manutencao no dia a dia.
- Contra: equipe precisa padronizar setup inicial do Vitest.
