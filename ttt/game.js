var Board = require('./board.js');

function Game (readerInterface) {
  this.reader = readerInterface;
  this.board = new Board();
}

Game.prototype.promptMove = function (callback) {
  this.board.display();
  this.reader.question("Enter move (e.g. 0,2)", function (input) {
    var arr = input.split(',');

    callback(parseInt(arr[0]), parseInt(arr[1]), arr[2]);
  });
};

Game.prototype.run = function (completionCallback) {
  var game = this;
  var board = game.board;
  game.promptMove( function (x, y, mark) {
    var moved = board.placeMark(x, y, mark);
    if (!moved) {
      console.log('Invalid Move');
    }
    if (board.isWon()) {
      completionCallback();
      game.reader.close();
    } else {
      game.run(completionCallback);
    }
  });
};

module.exports = Game;
