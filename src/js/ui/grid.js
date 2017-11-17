const Toolkit = require("../core/toolkit")


class Grid{
	constructor(container){
		this.container = container;
	}

	build(){
		const matrixTemp = Toolkit.matrix.makeMatrix();

		const rowGroupClasses = ["row_g_top","row_g_middle","row_g_bottom"]
		const colGroupClasses = ["col_g_left","col_g_center","col_g_right"]

		const cells = matrixTemp.map(row => row.map(
		 (val,colIndex) => {
		 	return $('<span>')
		 	.addClass(colGroupClasses[colIndex%3])
		 	.text(val);}
		 ));
		const matrix = cells.map((row,rowIndex) => 
			{return $('<div>')
			.addClass(rowGroupClasses[rowIndex%3])
			.addClass('row')
			.append(row);});
		this.container.append(matrix);
	}
}

module.exports = Grid;