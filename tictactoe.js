(function () {
  console.log("testing");

  function Board () {
    this.grid = [["_","_","_"],["_","_","_"],["_","_","_"]];
  }

  Board.prototype.display = function () {
    for (var i = 0; i < this.grid.length; i++) {
      console.log(this.grid[i]);
    }
  };

  Board.prototype.isWon = function () {
    var grid = this.grid;
    var won = false;

    ['x','o'].forEach( function (mark) {

      for (var i = 0; i < grid.length; i++) {
        var rowWon = true;
        var colWon = true;
        for (var j = 0; j < grid.length; j++) {
          if (grid[i][j] !== mark) {
            rowWon = false;

          }
          if (grid[j][i] !== mark) {
            colWon = false;
          }
        }

        if (rowWon || colWon) {
          won = true;
        }
      }
      var x = 0;
      var y = 0;
      var a = 2;
      var b = 0;
      var diag1Won = true;
      var diag2Won = true;
      for (var z = 0; z < 3; z++) {
        if (grid[x][y] !== mark) {
          diag1Won = false;
        }
        if (grid[a][b] !== mark) {
          diag2Won = false;
        }
        x++;
        y++;
        a--;
        b++;
      }

      if (diag1Won || diag2Won) {
        won = true;
      }
    });

    return won;
  };

  Board.prototype.empty = function(x, y) {
    return this.grid[x][y] === "_";
  };

  Board.prototype.placeMark = function (x, y, mark) {
    // console.log(this.empty(x, y));
    if (this.empty(x, y)) {
      this.grid[x][y] = mark;
      return true;
    }
    return false;
  };

  Board.prototype.isFull = function () {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.grid[i][j] === "_") {
          return false;
        }
      }
    }
    return true;
  };

  function Game () {
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
        // game.reader.close();
      } else {
        game.run(completionCallback);
      }
    });
  };

  var readline = require('readline');
  var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var game = new Game(reader);

  game.run( function () {
    game.board.display();
    reader.close();
  });
})();
