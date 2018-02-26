'use strict';
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const ACTIVE_GAMES = {};
const ACTIVE_SESSIONS = {};

app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/api/save', (req, res) => {
  const game = req.body.game;

  if (!game.token) {
    const token = Math.random().toString(16).slice(2, 6).toLowerCase();
    game.token = token;
  }

  game.votes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  ACTIVE_GAMES[game.token] = game;
  res.send(game.token);
});

app.get('/api/games/:token', (req, res) => {
  const game = ACTIVE_GAMES[req.params.token];

  if (game) {
    res.send({
      cards: game.cards,
      currentCard: game.current_card,
      votes: game.votes,
      players: (game.players || []).length,
    });
  }
});

app.get('/api/votes/:token', (req, res) => {
  const gameToken = req.params.token;
  const game = ACTIVE_GAMES[gameToken];

  const winner = Math.max(...game.votes);
  const winningIndex = game.votes.indexOf(winner);

  game.votes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  res.send({ winner: winningIndex });
});

app.post('/api/vote', (req, res) => {
  const gameToken = req.body.vote.token;
  const game = ACTIVE_GAMES[gameToken];

  const player = ACTIVE_SESSIONS[req.body.sessionToken];
  
  game.votes[req.body.vote.card] += 1;

  res.send({ vote: req.body.vote.card });
});

app.get('/api/session', (req, res) => {
  const gameToken = req.body.gameToken;
  const sessionToken = req.body.sessionToken;

  let player;
  const game = ACTIVE_GAMES[gameToken];

  if (sessionToken) {
    player = ACTIVE_SESSIONS[sessionToken];
  }

  if (player && player.gameToken === game.token) {
    res.send({
      player,
      votes: player.vote,
    });
  } else {
    const token = Math.random().toString(16).slice(2, 6).toUpperCase();
    player = { vote: null, gameToken };

    res.send({ player });
  }
});

app.listen(3000, () => console.log('Server is listening on localhost:3000'));
