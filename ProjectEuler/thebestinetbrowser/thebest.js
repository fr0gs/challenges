var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

var count = -1;
var cases = null;
var str = "";

function isAVowel(character) {
	var vowels = ['a', 'e', 'i', 'o', 'u'];
  return vowels.indexOf(character) >= 0;
}

rl.on('line', function(line){
	count++;
	//Number of test cases in first line.
	if (count == 0) {
		cases = line;
	}
	//Program logic.
	else {
		var arr = line.split(".")[1];
		for (var i = 0; i < arr.length; i++) {
			if (!isAVowel(arr[i])) {
				str += arr[i];
			}
		}
		console.log((str.length+4)+"/"+line.length);
	}

	//If it reached maximum cases close.
	if (count == cases) {
		rl.close();		
	}
});

