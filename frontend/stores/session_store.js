var GameDispatcher = require('../dispatchers/game_dispatcher');

var Store = require('flux/utils').Store;

var SessionStore = new Store(GameDispatcher);

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  default:
    // no-op
  }
};

module.exports = SessionStore;
