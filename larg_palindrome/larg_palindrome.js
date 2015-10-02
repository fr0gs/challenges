//I didn't care about checking the type of the parameter..
var is_palindrome = function(s) {
  var ret = true;
  var l = s.length;

  for (var i=0; i<(l/2); i++) {
    if (s[i] != s[l-i-1] ) {
      ret = false;
    }
  }
  return ret;
}

var larg_pal = -1;

for (var i=100; i<=999; i++) {
  for (var j=100; j<=999; j++) {
    var res = i*j; //Starting from 100*100;

    //If it is a palindrome
    if (is_palindrome(res.toString())) {

      //If it is bigger than last palindome.
      if (res > larg_pal) {
        larg_pal = res;
      }
    }
  }
}

console.log(larg_pal);
