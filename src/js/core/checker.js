
//检查解决方案
function checkArray(arr){
	const length = arr.length;
	const marks = new Array(length);
	marks.fill(true);

	for (let i = 0; i < length - 1; i++) {
		const v = arr[i];
		//已标志为false则跳过
		if(!marks[i]){
			continue;
		}

		//是否有效 0无效，1-9有效
		if(v === 0){
			marks[i] = false;
			continue;
		}
		//是否重复
		for (let j = i+1; j < length; j++) {
			if(arr[j] === v){
				marks[j] = false;
				marks[i] = false;
			}
		}
	}
	return marks;
}

const Toolkit = require("./toolkit");
//输入: matrix，用户完成后的矩阵
//处理：对matrix 行、列。宫进行检查
//输出：检查是否成功，marks

class Checker{
	constructor(matrix){
		this._matrix = matrix;
		this._matrixMarks = Toolkit.matrix.makeMatrix(true);
	}

	get matrixMarks(){
		return this._matrixMarks;
	}

	get isSuccess(){
		return this._success;
	}

	check(){
		this.checkRows();
		this.checkCols();
		this.checkBoxes();

		//Array.prototype.every(checkFn)，使用checkFn对每个元素进行检查，只要有一个返回false就返回false
		this._success = this._matrixMarks.every(row => row.every(mark => mark));
		return this._success;
	}

	checkRows(){
		for (let i = 0; i < 9; i++) {
			const row = this._matrix[i];
			const marks = checkArray(row);

			//把检查结果弄到_matrixMarks上去
			for (let j = 0; j < 9; j++) {
				if(!marks[j]){
					this._matrixMarks[i][j] = false;
				}
			}
		}
	}

	checkCols(){
		for (let colIndex = 0; colIndex < 9; colIndex++) {
			const cols = [];
			for (let i = 0; i < 9; i++) {
				cols[i] = this._matrix[i][colIndex];
			}

			const marks = checkArray(cols);
			//把检查结果弄到_matrixMarks上去
			for (let j = 0; j < 9; j++) {
				if(!marks[j]){
					this._matrixMarks[j][colIndex] = false;
				}
			}
		}
	}

	checkBoxes(){
		for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
			const boxes = Toolkit.box.getBoxCells(this._matrix,boxIndex);
			const marks = checkArray(boxes);

			for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
				if(!marks[cellIndex]){
					const { rowIndex, colIndex}
					= Toolkit.box.convertFromBoxIndex(boxIndex,cellIndex);
					this._matrixMarks[rowIndex][colIndex] = false;
				}
				

			}
		}
	}
}

const Generator = require("./generator");
const gen = new Generator();
gen.generate();
const matrix = gen.matrix;
const checker = new Checker(matrix);

matrix[1][1] = 0;
matrix[2][3] = matrix[3][5] = 5;
const checker2 = new Checker(matrix);
console.log("check result:"+checker.check());
console.log("check2 result:"+checker2.check());
console.log(checker2.matrixMarks)
