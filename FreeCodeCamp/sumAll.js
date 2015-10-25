/*
*
* Bonfire: Sum All Numbers in a Range
* We'll pass you an array of two numbers. Return the sum of those two numbers and all numbers between them.
*
* The lowest number will not always come first.
*
* Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.
*/
function sumAll(arr) {
  var maxi = Math.max(arr[0], arr[1]);
  var mini = Math.min(arr[0], arr[1]);
  var res = 0;

  for (var i=mini; i<=maxi; i++){
    res += i;
  }
  return res;
}

console.log(sumAll([1, 4]));
