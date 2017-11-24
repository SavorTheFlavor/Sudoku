const Toolkit = require("../core/toolkit")
const Sudoku = require("../core/sudoku")
const Checker = require("../core/checker")


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
	/**
	 重新生成游戏
	*/
	restart(){
		this.container.empty();
		this.build();
	}
	/**
	  检查解密结果
	*/
	check(){
		//从页面获取要检查的数据
		const $rows = this.container.children();
		const data = $rows.map((rowIndex, div) => {
			return $(div).children()
					.map((colIndex, span) => {
						//不是scala...要加return...
						return parseInt($(span).text()) || 0;
					})

		}).toArray()
		.map($data => $data.toArray())

		const checker = new Checker(data);
		if(checker.check()){
			return true;
		}

		//检查不成功，对错误的地方进行标记
		const marks = checker.matrixMarks;
		this.container.children()
					.each((rowIndex,div) => {
						$(div).children().each((colIndex,span) => {
							const $span = $(span);
							//is(选择器选择的元素) .fixed可以选中含有fixed的span
							if($span.is(".fixed") || marks[rowIndex][colIndex]){
								$span.removeClass("error");
							}else{
								$span.addClass("error");
							}
						})
					})
		
	}
	/**
	 重置到游戏开始时的布局
	*/
	reset(){

	}
	/**
	  清除错误标志
	*/
	clear(){

	}
}

module.exports = Grid;