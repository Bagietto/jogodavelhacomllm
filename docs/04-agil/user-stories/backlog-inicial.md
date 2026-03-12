# Backlog Inicial

## US-001 - Configurar Partida
Como jogador, quero escolher quem inicia, simbolo, dificuldade e idioma para personalizar a partida.

### Criterios de Aceite
- Deve permitir escolher inicio: humano ou IA.
- Deve permitir escolher simbolo: X ou O.
- Deve permitir escolher dificuldade: facil, medio, mestre.
- Deve permitir escolher idioma: pt-BR, es, en-US.

## US-002 - Jogabilidade Base
Como jogador, quero jogar partida completa para obter resultado correto.

### Criterios de Aceite
- Jogada so em casa vazia.
- Alternancia de turnos correta.
- Deteccao de vitoria/empate correta.

## US-003 - Comportamento por Dificuldade
Como jogador, quero niveis diferentes para variar desafio.

### Criterios de Aceite
- Facil: aleatorio com mais erros.
- Medio: estrategia + aleatorio.
- Mestre: melhor jogada (minimax ou equivalente).

## US-004 - Conversa da IA
Como jogador, quero mensagens amigaveis e engracadas para experiencia menos robotica.

### Criterios de Aceite
- IA responde no idioma escolhido.
- Mensagens coerentes com estado da partida.

## US-005 - Resiliencia sem Travar
Como jogador, quero continuidade mesmo com falha externa.

### Criterios de Aceite
- Timeout total de 3s na camada OpenRouter (modelo padrao + fallback).
- A jogada da IA e sempre local (por dificuldade) sem depender de OpenRouter.
- Mensagem de fallback randomica e nao repetitiva.

## US-006 - Placar da Sessao
Como jogador, quero ver o placar acumulado para acompanhar meu desempenho contra a IA.

### Criterios de Aceite
- Exibir contadores de vitorias do Humano, vitorias da IA e empates.
- Atualizar placar ao fim de cada partida, uma unica vez.
- Permitir zerar placar manualmente.
- Reiniciar placar ao recarregar a pagina (escopo sessao no MVP).

## US-007 - Nome da IA
Como jogador, quero que a IA tenha um nome para a experiencia ficar mais humana.

### Criterios de Aceite
- Exibir nome da IA no painel de jogo.
- Exibir nome da IA nas mensagens de chat.

## US-008 - Interface Atrativa e Saudavel
Como jogador, quero uma interface envolvente para jogar varias vezes sem pressao compulsiva.

### Criterios de Aceite
- Interface com feedback visual claro e agradavel.
- Ao fim de partida, mostrar opcoes neutras: "Jogar novamente" e "Encerrar agora".
- Nao usar dark patterns de inducao compulsiva.
