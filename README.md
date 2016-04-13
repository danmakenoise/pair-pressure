# Pair Pressure

> **Pair Pressure** is a multiplayer browser game built in **Ruby on Rails**, **React.js**, and vanilla **JavaScript**.

[Click here for live website.][live-link]

[live-link]: http://pair.danphillips.io
---
## Main Menu
![menu]

## Main Display
![main]

---
## Technical
**Pair Pressure** is a cross-platform multiplayer game. Users begin by starting a game up on the device of their choice. A room code will be given and anyone wanting to play signs in on the website. You are then paired with the game and can vote on which cards you want to select for the game!

When a game is created, the game is stored on the back-end with a unique room code. Players that join in are assigned unique session-tokens that are also saved onto their client browser. Because of this, players can refresh the page without fear of losing the game!

The game uses a complex series of JavaScript Timeout's and AJAX requests to keep the display, and all players devices in sync with the server. When the voting time limit is up, all votes are counted up on the backend and the card with the most votes is chosen. I chose to put voting into the backend to allow users to maintain state if they accidentally leave!

---
## Features
 * Multiplayer ability.
 * Play on computer or mobile platforms.
 * Maintains game state on the back-end.
 
---
## Todo
 - [ ] Keep track of correct user guesses.
 - [ ] Store user name.
 - [ ] Convert AJAX requests to WebSockets.

[menu]: ./docs/images/menu.png
[main]: ./docs/images/main.png
