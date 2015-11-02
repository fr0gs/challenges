function myReplace(str, before, after) {
  function upperFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //if first char is uppercase I change it in the after word.
  if (before.charAt(0) == before.charAt(0).toUpperCase()) {
    after = upperFirstLetter(after);
  }
  var rep = new RegExp(before, "gi");
  return str.replace(rep, after);
}

console.log(myReplace("His name is Tom", "Tom", "john"));
