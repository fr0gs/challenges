function translate(str) {
  function isVowel(c) {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
  }

  function getLastConsonantIndex() {
    for (var i=0; i<str.length; i++) {
      if (isVowel(str[i])) {
        return i-1;
      }
    }
    return -1;
  }

  if (isVowel(str.charAt(0))) {
    return str + "way"
  }
  else {
    lastCons = getLastConsonantIndex();
    return str.slice(lastCons+1) + str.substr(0, lastCons+1) + "ay";
  }
}

console.log(translate("consonant"));
