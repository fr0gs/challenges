function isAVowel(character) {
var vowels = ['a', 'e', 'i', 'o', 'u'];
  return vowels.indexOf(character) >= 0;
}

var count = -1;
var cases = null;
var arrayfinal = []

function main(input) {
	var str = "";
  count++;
	//Number of test cases in first line.
	if (count == 0) {
		cases = input;
	}
	//Program logic.
	else {
		arr = input.split(".")[1];
		for (var i = 0; i < arr.length; i++) {
			if (!isAVowel(arr[i])) {
				str += arr[i];
			}
		}
		var aux = input.length;	
		aux = aux-1;
		arrayfinal.push((str.length+4)+"/"+aux);
	}

	//If it reached maximum cases close.
	if (count == cases) {
		for (var i=0; i<arrayfinal.length; i++) {
			console.log(arrayfinal[i]);
		}
		process.exit();	
	}
}

process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";
process.stdin.on("data", function (input) {
    stdin_input = input;
		main(stdin_input);
});
