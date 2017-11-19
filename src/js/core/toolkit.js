/**
	矩阵相关
*/
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
	},
	/**
		检查目标位置是否可填
	*/
	checkFillable(matrix,n,rowIndex,colIndex){
		const row = matrix[rowIndex];
		const column = this.makeRow()
					.map((v,i) => matrix[i][colIndex]);
		//这又是什么语法
		//只需要取出boxIndex
		const { boxIndex } = boxTookit.convertToBoxIndex(rowIndex,colIndex);
		//取出一个宫
		const box = boxTookit.getBoxCells(matrix,boxIndex);
		for (var i = 0; i < 9; i++) {
			//检查行列宫是否已存在n
			if(row[i] === n || column[i] === n
				|| box[i] === n){
				return false;
			}
		}
		return true;
	}
};

/**
	宫坐标系工具
*/
const boxTookit = {
	//boxIndex:第几宫
	//cellIndex:在宫里的第几格
	convertToBoxIndex(rowIndex,colIndex){
		return {
			boxIndex:Math.floor(rowIndex/3)*3 + Math.floor(colIndex/3),
			cellIndex: (rowIndex%3) * 3 + colIndex%3
		};
	},

	//转回在整个矩阵中的rowIndex和colIndex
	convertFromBoxIndex(boxIndex,cellIndex){
		return {
			rowIndex: Math.floor(boxIndex / 3)*3 + Math.floor(cellIndex/3),
			colIndex: (boxIndex % 3)*3 + colIndex%3
		};
	},
	getBoxCells(matrix,boxIndex){
		const startRowIndex = Math.floor(boxIndex/3)*3;
		const startColIndex = (boxIndex%3)*3;
		const result = [];
		for (let i = 0; i < 9; i++) {
			const rowIndex = startRowIndex + Math.floor(i/3);
			const colIndex = startColIndex + i%3;
			result.push(matrix[rowIndex][colIndex]);
		}
		return result;
	}

};


module.exports = class Toolkit{
	static get matrix(){
		return matrixToolkit;
	}
	static get box(){
		return boxTookit;
	}
}