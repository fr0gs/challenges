function sumFibs(num) {

  function isEven (x) { var ret = (x % 2 == 1) ? true: false; return ret;}

  var sum = 0;
  var n_menos_2 = 0;
  var n_menos_1 = 1;
  var fib_term = 1;

  while (fib_term <= num) {
    if (isEven(fib_term)) {
      sum += fib_term;
    }
    fib_term = n_menos_1 + n_menos_2;
    n_menos_2 = n_menos_1;
    n_menos_1 = fib_term;
  }

  return sum;
}



console.log(sumFibs1(1000));
