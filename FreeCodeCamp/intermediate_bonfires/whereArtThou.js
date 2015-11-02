/*
Bonfire: Where art thou

Make a function that looks through an array of objects (first argument) and
returns an array of all objects that have matching property and value pairs (second argument).
Each property and value pair of the source object has to be present in the object from the collection if
it is to be included in the returned array.
*/

function contained(container, elem) {
    for (var property in elem) {
      //if the property does not exist in container it is already
      //not contained
      if (!(property in container)) {
        return false;
      }
      //if it has the property, check if the value is the same.
      else {
        if (container[property] != elem[property]) {
          return false;
        }
      }
    }
    return true;
}

function where(collection, source) {
  var arr = [];

  collection.forEach(function(elem) {
    if (contained(elem, source)) {
      arr.push(elem);
    }
  });

  return arr;
}

console.log(where([{ "a": 1, "b": 2 },
                   { "a": 1 },
                   { "a": 1, "b": 2, "c": 2 }],
                   { "a": 1, "b": 2 }));

/*
REAL
[ { a: 1, b: 2 },
  { a: 1 },
  { a: 1, b: 2, c: 2 },
  { a: 1, b: 2 },
  { a: 1, b: 2, c: 2 } ]

ESPERADO
  [{ "a": 1, "b": 2 },
   { "a": 1, "b": 2, "c": 2 }]
*/
