'use strict';
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const ACTIVE_GAMES = {};

app.use(express.static('public'));
app.use(bodyParser.urlencoded());

app.post('/api/save', (req, res) => {
  const game = req.body.game;

  if (!game.token) {
    const token = Math.random().toString(16).slice(2, 6).toUpperCase();
    game.token = token;
  }

  ACTIVE_GAMES[game.token] = game;
  res.send(game.token);
});

app.get('/api/games/:token', (req, res) => {
  const game = ACTIVE_GAMES[req.params.token];

  res.send({
    cards: game.cards,
    currentCard: game.current_card,
    votes: game.votes || [],
    players: (game.players || []).length,
  });
});

app.get('/api/votes/:token', () => {});
app.post('/api/vote', () => {});
app.get('/api/session', () => {});

app.listen(3000, () => console.log('Server is listening on localhost:3000'));
