var fs = require("fs");

fs.readdir(process.argv[2], function (err, files) {
  if (err) {
    throw new err;
  }
  else {
    files.forEach(function (elem) {
      var indexElem = elem.indexOf(".");
      if (indexElem !== -1) {
        if (elem.slice(indexElem+1) === process.argv[3]) {
          console.log(elem);
        }
      }
    });
  }
});
