function sumPrimes(num) {
  var sum = 0;
  function isPrime(n) {
    for(var i = 2; i < n; i++) {
          if(n % i === 0) {
              return false;
          }
    }
    return n > 1;
  }

  for (var i=1; i<=num; i++) {
    if (isPrime(i)) {
      sum += i;
    }
  }
  return sum;
}

console.log(sumPrimes(10));
