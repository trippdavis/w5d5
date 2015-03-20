Function.prototype.myBind = function (context) {
  var fn = this;
  return function () {
    fn.apply(context);
  };
};

function times(num, fun) {
  for (var i = 0; i < num; i++) {
    fun(); // call is made "function-style"
  }
}

var cat = {
  age: 5,

  ageOneYear: function () {
    this.age += 1;
  }
};

// cat.ageOneYear(); // works

times(10, cat.ageOneYear.myBind(cat)); // does not work!
console.log(cat.age);
