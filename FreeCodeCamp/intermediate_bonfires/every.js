function every(collection, pre) {
  var fin = true;
  collection.forEach(function (elem) {
    if (!elem.hasOwnProperty(pre)) {
      fin = false;
    }
    else {
      if (!elem[pre]) {
        fin = false;
      }
    }
  });

  return fin;
}

console.log(every([
                  {"user": "Tinky-Winky", "sex": "male", "age": 0},
                  {"user": "Dipsy", "sex": "male", "age": 3},
                  {"user": "Laa-Laa", "sex": "female", "age": 5},
                  {"user": "Po", "sex": "female", "age": 4}
                  ],
                  "age"));

//console.log(every());
