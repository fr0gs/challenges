var fs = require("fs");

var file = fs.readFileSync(process.argv[2]);
var lines = file.toString().split("\n");
var numlines = lines.length-1;


console.log(numlines);
