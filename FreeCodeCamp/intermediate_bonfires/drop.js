function drop(arr, func) {
  return arr.filter(function (el) {
    return func(el);
  });
}

console.log(drop([1, 2, 3, 4], function(n) {return n >= 3;}));
