
var fiboloop = function(n) {
    var a = 0, b = 1, f = 1;
    for(var i = 2; i <= n; i++) {
        f = a + b;
        a = b;
        b = f;
    }
    return f;
};

var isEven = function (x) { var ret = (x % 2 == 1) ? true: false; return ret;}

var sum = 0;
var i = 1;


while (true) {
	var value = fiboloop(i);
	if (value < 4000000) {
		console.log("Term: " + i + " --- Value: " + value);
		if (isEven(value)) sum += value;
	}
	else break;
	i++;
}

console.log(sum);
