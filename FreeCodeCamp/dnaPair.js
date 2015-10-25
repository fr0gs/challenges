function pair(str) {
  var ret = [];
  var dna = {
    "G": "C",
    "C": "G",
    "A": "T",
    "T": "A"
  };

  var letters = str.split("");
  for (var i=0; i<letters.length; i++) {
    var aux = [];
    aux.push(letters[i]);
    aux.push(dna[letters[i]]);
    ret.push(aux);
  }
  return ret;
}

console.log(pair("GCG"));
