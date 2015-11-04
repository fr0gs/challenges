function add(x, y) {

  if (arguments.length === 2) {
    if (typeof x != "number" || typeof y != "number") {
      return undefined;
    }
    else {
      return arguments[0] + arguments[1];
    }
  }
  else {
    if (typeof x != "number") {
      return undefined;
    }
    else {
      return function (second) {
        if (typeof second != "number") {
          return undefined;
        }
        else {
          return x + second;
        }
      }
    }
  }
}

console.log(add(2)([3]));
