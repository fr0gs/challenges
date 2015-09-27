var num = 600851475143;

var isPrime = function(n) {
  for(var i = 2; i < n; i++) {
        if(n % i === 0) {
            return false;
        }
    }
    return n > 1;
}

var largPrimFactor = function(n) {
  var largest = 0;
  var number = n;
  var factor = 2;
  var keep = true;

  while (number != 1) {
    if (isPrime(factor)){
      if (number % factor == 0) {
        console.log("Number: " + number + " -- Factor: " + factor);
        largest = factor;
        number = number / factor;
      }
      else factor ++;
    }
    else factor++;
  }

  return largest;
}

console.log(largPrimFactor(600851475143));
