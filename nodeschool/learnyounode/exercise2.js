
var args = process.argv.slice(2);

var sum = args.reduce(function (prev, cur, a) {
	return Number(prev) + Number(cur);
	});

console.log(sum);
