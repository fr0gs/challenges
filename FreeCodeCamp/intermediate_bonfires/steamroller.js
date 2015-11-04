function steamroller(arr) {

  function head(array) {
    return array[0];
  }

  function tail(array) {
    return array.slice(1);
  }

  if (arr.length === 0) {
    return [];
  }
  else {
    if (!Array.isArray(head(arr))) {
      return [head(arr)].concat(steamroller(tail(arr)));
    }
    else {
      return (steamroller(head(arr)).concat(steamroller(tail(arr))));
    }
  }
}

//steamroller([1, [2], [3, [[4]]]]);
console.log(steamroller([1]));
