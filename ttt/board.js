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

module.exports = Board;
