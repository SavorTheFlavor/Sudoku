const matrixToolkit={
	makeRow(v){
		const array = new Array(9)
		array.fill(v)
		return array
	},

	makeMatrix(v=0){
		return Array.from({length:9},() => {return this.makeRow(v)});
	},

	shuffle(arr){
		for (var i = 0; i < arr.length - 1; i++) {
			var j = Math.round(Math.random()*(arr.length-1));
			[arr[i],arr[j]] = [arr[j],arr[i]];
		}
		return arr;
	}
};

module.exports = matrixToolkit;