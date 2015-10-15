function largestOfFour(arr) {
  var ret = [];
  arr.forEach(function (elem, index, array) {
    var max = -1;
    for (var i in elem) {
      max = (elem[i] > max) ? elem[i] : max;
    }
    ret.push(max);
  });
  return ret;
}

var x = largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
console.log(x);
