function findLongestWord(str) {
	var maxl = 0;
	str.split(" ").forEach(function(elem, index, array) {
		if (elem.length > maxl) {
			maxl = elem.length;		
		}
	});
	return maxl;
}

console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));
