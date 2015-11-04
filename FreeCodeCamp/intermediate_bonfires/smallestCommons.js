"use strict";

function smallestCommons(arr) {

  var final_factors = [];
  var mcm = 1;

  function checkFinalFactors(n) {
    //Get all the final factors in pretty object format.
    var factors = convertFactors(getPrimeFactors(n));

    factors.forEach(function (element) {
      //if factor is not in the final_factors it is added.
      if (final_factors.filter(function(elem) {
          return (element.num === elem.num);
        }).length === 0) {
        final_factors.push(element);
      }
      else { //else it's exponent is increased.
        var index = findObjByNum(final_factors, element.num);
        if (element.exp > final_factors[index].exp) {
          final_factors[index] = element;
        }
      }
    });
  }

  function findObjByNum(arr, num) {
    for (var i=0; i<arr.length; i++) {
      if (arr[i].num === num) {
        return i;
      }
    }
    return -1;
  }

  function convertFactors(arr) {
    var ret = [], prev;
    arr.sort();

    for (var i=0; i<arr.length; i++) {
        if (arr[i] !== prev) {
            ret.push({
              "num": arr[i],
              "exp": 1
            });
        } else {
            ret[ret.length-1].exp++;
        }
        prev = arr[i];
    }

    return ret;
  }

  function isPrime(n) {
    for(var i = 2; i < n; i++) {
          if(n % i === 0) {
              return false;
          }
    }
    return n > 1;
  }

  function getPrimeFactors(num) {
    var ret = [];
    //If number is prime its prime factors are 1 and the number.
    if (num === 1) {
      ret.push(1);
    }
    if (isPrime(num)) {
      ret.push(1, num);
      return ret;
    }
    else {
      var largest = 0;
      var factor = 2;
      var keep = true;

      while (num != 1) {
        if (isPrime(factor)){
          if (num % factor === 0) {
            ret.push(factor);
            num = num / factor;
          }
          else factor++;
        }
        else factor++;
      }
      return ret;
    }
  }

  for (var j=1; j<=(Math.max(arr[0], arr[1])); j++) {
    checkFinalFactors(j);
  }

  final_factors.forEach(function (elem) {
    mcm *= (Math.pow(elem.num, elem.exp));
  });

  return mcm;
}


console.log(smallestCommons([1,5]));
