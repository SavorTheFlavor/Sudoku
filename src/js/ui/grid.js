const Toolkit = require("../core/toolkit")
const Sudoku = require("../core/sudoku")


class Grid{
	constructor(container){
		this.container = container;
	}

	build(){

		// const generator = new Generator();
		// generator.generate();
		// const matrixTemp = generator.matrix;
		const sudoku = new Sudoku();
		sudoku.make();
		const matrixTemp = sudoku.puzzleMatrix;

		const rowGroupClasses = ["row_g_top","row_g_middle","row_g_bottom"]
		const colGroupClasses = ["col_g_left","col_g_center","col_g_right"]

		const cells = matrixTemp.map(row => row.map(
		 (val,colIndex) => {
		 	return $('<span>')
		 	.addClass(colGroupClasses[colIndex%3])
		 	.addClass(val?"fixed":"empty")
		 	.text(val);}
		 ));
		const matrix = cells.map((row,rowIndex) => 
			{return $('<div>')
			.addClass(rowGroupClasses[rowIndex%3])
			.addClass('row')
			.append(row);});
		this.container.append(matrix);
	}

	bindPopup(popupNumbers){
		//由于span是动态生成的，不能直接绑定到span上，采用jQuery事件代理的方式
		this.container.on("click","span",e => {
			const $cell = $(e.target);
			popupNumbers.popup($cell);
		});
	}
}

module.exports = Grid;