/*
Bonfire: Roman Numeral Converter
Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.
*/


function convert(num) {

  var dictUni = {
    "1": "I",
    "2": "II",
    "3": "III",
    "4": "IV",
    "5": "V",
    "6": "VI",
    "7": "VII",
    "8": "VII",
    "9": "IX",
  };

  var dictDec = {
    "1": "X",
    "2": "XX",
    "3": "XXX",
    "4": "XL",
    "5": "L",
    "6": "LX",
    "7": "LXX",
    "8": "LXXX",
    "9": "XC"
  };

  var numStr = String(num);
  var uni = numStr[numStr.length-1];
  var dec = numStr[numStr.length-2];
  var cent = numStr[numStr.length-3];

  if (isNaN(dec)) {
    return dictUni[uni];
  }
  else if (isNaN(cent)) {
      return dictDec[dec] + dictUni[uni];
  }
  else {
    return dictDec[cent] + dictDec[dec] + dictUni[uni];
  }
}

console.log(convert(5)); //XXXVI
