
//随机生成解决方案
//随机去除部分数据

const Generator = require("./generator");

module.exports = class Sudoku{

	constructor(){
		const generator = new Generator();
		generator.generate();
		this.solutionMatrix = generator.matrix;
	}

	make(level = 5){  // level/9的数据被抹掉
		//生成谜盘
		this.puzzleMatrix = this.solutionMatrix.map(row => {
			return row.map(cell => Math.random()*9 < level ? 0:cell);
			});
	}

}