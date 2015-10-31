function unite(arr1, arr2, arr3) {
  var argsArray = [].slice.apply(arguments)
  var final = [];

  final = argsArray.reduce(function(prev, cur) {
    return prev.concat(cur.filter(function (elem) {
      return (prev.indexOf(elem) == -1);
    }));
  });

  return final;
}

console.log(unite([1, 3, 2], [5, 2, 1, 4], [2, 1]));
