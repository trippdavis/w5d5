function HanoiGame() {
  this.stacks = [[3, 2, 1], [], []];
}

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


HanoiGame.prototype.isWon = function () {
  for (var i = 1; i < this.stacks.length; i++) {
    if (this.stacks[i].length === 3) {
      return true;
    }
  }
  return false;
};

HanoiGame.prototype.isValidMove = function (startIdx, endIdx) {
  var takeStack = this.stacks[startIdx];
  var putStack = this.stacks[endIdx];

  if (takeStack.length > 0 &&
    (takeStack[takeStack.length - 1] < putStack[putStack.length - 1] ||
      putStack.length === 0)) {
        return true;
      }
  return false;
};

HanoiGame.prototype.move = function (startIdx, endIdx) {
  var that = this;
  // console.log([that.stacks[startIdx], that.stacks[endIdx]]);
  if (that.isValidMove(startIdx, endIdx)) {
    var num = that.stacks[startIdx].pop();
    // console.log(num);
    that.stacks[endIdx].push(num);
    return true;
  }
  return false;
};

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function (callback) {
  this.print();
  reader.question("Move? (e.g. 1,2)", function (input) {
    var response = input.split(',').map( function (i) {
      return parseInt(i);
      });

    callback(response[0], response[1]);
  });
};

HanoiGame.prototype.run = function (completionCallback) {
  var that = this;
  that.promptMove( function (startIdx, endIdx) {

    var moved = that.move(startIdx, endIdx);
    if (!moved) {
      console.log('Invalid Move');
    }
    if (that.isWon()) {
      completionCallback();
      reader.close();
    } else {
      that.run(completionCallback);
    }
  });
};



var game = new HanoiGame();
game.run( function () {
  game.print();
});
