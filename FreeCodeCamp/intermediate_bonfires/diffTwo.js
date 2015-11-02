/*
Bonfire: Diff Two Arrays
Compare two arrays and return a new array with any items not found in both of the original arrays.
*/
function diff(arr1, arr2) {

  if (arr1.length == 0){
    return arr2;
  }
  if (arr2.length == 0) {
    return arr1;
  }

  var newArr = [];

  for (var i=0; i<arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) == -1) {
      newArr.push(arr1[i]);
    }
  }

  for (var i=0; i<arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      newArr.push(arr2[i]);
    }
  }

  return newArr.reverse();
}

console.log(diff(["andesite", "grass", "dirt", "pink wool", "dead shrub"],
["diorite", "andesite", "grass", "dirt", "dead shrub"]));
