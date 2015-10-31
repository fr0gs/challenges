function convert(str) {
  var dict = {
    //keys|values
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&apos;",
    "\"": "&quot;"
  };

  var regexp = new RegExp(Object.keys(dict).join("|"), "gi");
  return str.replace(regexp, function(key){
    return dict[key];
  });
}

console.log(convert('Stuff in "quotation marks"'));
