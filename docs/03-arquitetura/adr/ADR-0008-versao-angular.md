# ADR-0008 - Versao do Angular

- Status: Aceito
- Data: 2026-03-12

## Contexto
Necessidade de evitar ambiguidade de stack durante implementacao.

## Decisao
- Adotar Angular 21.x como base do MVP.
- Manter atualizacoes apenas de patch/minor dentro da linha 21.x durante o MVP.

## Consequencias
- Pro: previsibilidade de desenvolvimento e toolchain.
- Pro: menor risco de quebra por upgrade de major.
- Contra: necessidade de revisao planejada ao migrar para major futura.
