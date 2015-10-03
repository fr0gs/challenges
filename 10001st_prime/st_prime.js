var num = 1;
var count = 1;

var isPrime = function(n) {
  for(var i = 2; i < n; i++) {
        if(n % i === 0) {
            return false;
        }
    }
    return n > 1;
}

while (count <= 10001) {
  num++;
  if (isPrime(num)) {
    console.log("Count of prime numbers: " + count);
    console.log("Number: " + num);
    console.log("---------------");
    count++;
  }
}

console.log(num);
