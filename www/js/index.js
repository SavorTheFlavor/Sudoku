/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
	矩阵相关
*/
var matrixToolkit = {
	makeRow: function makeRow(v) {
		var array = new Array(9);
		array.fill(v);
		return array;
	},
	makeMatrix: function makeMatrix() {
		var _this = this;

		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		return Array.from({ length: 9 }, function () {
			return _this.makeRow(v);
		});
	},
	shuffle: function shuffle(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			var j = Math.round(Math.random() * (arr.length - 1));
			var _ref = [arr[j], arr[i]];
			arr[i] = _ref[0];
			arr[j] = _ref[1];
		}
		return arr;
	},

	/**
 	检查目标位置是否可填
 */
	checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
		var row = matrix[rowIndex];
		var column = this.makeRow().map(function (v, i) {
			return matrix[i][colIndex];
		});
		//这又是什么语法
		//只需要取出boxIndex

		var _boxTookit$convertToB = boxTookit.convertToBoxIndex(rowIndex, colIndex),
		    boxIndex = _boxTookit$convertToB.boxIndex;
		//取出一个宫


		var box = boxTookit.getBoxCells(matrix, boxIndex);
		for (var i = 0; i < 9; i++) {
			//检查行列宫是否已存在n
			if (row[i] === n || column[i] === n || box[i] === n) {
				return false;
			}
		}
		return true;
	}
};

/**
	宫坐标系工具
*/
var boxTookit = {
	//boxIndex:第几宫
	//cellIndex:在宫里的第几格
	convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
		return {
			boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
			cellIndex: rowIndex % 3 * 3 + colIndex % 3
		};
	},


	//转回在整个矩阵中的rowIndex和colIndex
	convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
		return {
			rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
			colIndex: boxIndex % 3 * 3 + cellIndex % 3
		};
	},
	getBoxCells: function getBoxCells(matrix, boxIndex) {
		var startRowIndex = Math.floor(boxIndex / 3) * 3;
		var startColIndex = boxIndex % 3 * 3;
		var result = [];
		for (var i = 0; i < 9; i++) {
			var rowIndex = startRowIndex + Math.floor(i / 3);
			var colIndex = startColIndex + i % 3;
			result.push(matrix[rowIndex][colIndex]);
		}
		return result;
	}
};

module.exports = function () {
	function Toolkit() {
		_classCallCheck(this, Toolkit);
	}

	_createClass(Toolkit, null, [{
		key: "matrix",
		get: function get() {
			return matrixToolkit;
		}
	}, {
		key: "box",
		get: function get() {
			return boxTookit;
		}
	}]);

	return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(2);
var PopupNumbers = __webpack_require__(6);

var grid = new Grid($(".container"));
grid.build();

var popupnumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupnumbers);

$("#check").on("click", function (e) {
	if (grid.check()) {
		alert("你成功了！！");
	}
});
$("#reset").on("click", function (e) {
	grid.reset();
});
$("#clear").on("click", function (e) {
	grid.clear();
});

$("#restart").on("click", function (e) {
	grid.restart();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolkit = __webpack_require__(0);
var Sudoku = __webpack_require__(3);
var Checker = __webpack_require__(5);

var Grid = function () {
	function Grid(container) {
		_classCallCheck(this, Grid);

		this.container = container;
	}

	_createClass(Grid, [{
		key: "build",
		value: function build() {

			// const generator = new Generator();
			// generator.generate();
			// const matrixTemp = generator.matrix;
			var sudoku = new Sudoku();
			sudoku.make();
			var matrixTemp = sudoku.solutionMatrix;

			var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
			var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

			var cells = matrixTemp.map(function (row) {
				return row.map(function (val, colIndex) {
					return $('<span>').addClass(colGroupClasses[colIndex % 3]).addClass(val ? "fixed" : "empty").text(val);
				});
			});
			var matrix = cells.map(function (row, rowIndex) {
				return $('<div>').addClass(rowGroupClasses[rowIndex % 3]).addClass('row').append(row);
			});
			this.container.append(matrix);
		}
	}, {
		key: "bindPopup",
		value: function bindPopup(popupNumbers) {
			//由于span是动态生成的，不能直接绑定到span上，采用jQuery事件代理的方式
			this.container.on("click", "span", function (e) {
				var $cell = $(e.target);
				//is .fixed选择中的元素
				if ($cell.is(".fixed")) {
					return;
				}
				popupNumbers.popup($cell);
			});
		}
		/**
   重新生成游戏
  */

	}, {
		key: "restart",
		value: function restart() {
			this.container.empty();
			this.build();
		}
		/**
    检查解密结果
  */

	}, {
		key: "check",
		value: function check() {
			//从页面获取要检查的数据
			var $rows = this.container.children();
			var data = $rows.map(function (rowIndex, div) {
				return $(div).children().map(function (colIndex, span) {
					//不是scala...要加return...
					return parseInt($(span).text()) || 0;
				});
			}).toArray().map(function ($data) {
				return $data.toArray();
			});

			var checker = new Checker(data);
			if (checker.check()) {
				return true;
			}

			//检查不成功，对错误的地方进行标记
			var marks = checker.matrixMarks;
			this.container.children().each(function (rowIndex, div) {
				$(div).children().each(function (colIndex, span) {
					var $span = $(span);
					//is(选择器选择的元素) .fixed可以选中含有fixed的span
					if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
						$span.removeClass("error");
					} else {
						$span.addClass("error");
					}
				});
			});
		}
		/**
   重置到游戏开始时的布局
  */

	}, {
		key: "reset",
		value: function reset() {
			this.container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
		}
		/**
    清除错误标志
  */

	}, {
		key: "clear",
		value: function clear() {
			this.container.find("span.error").removeClass("error");
		}
	}]);

	return Grid;
}();

module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//随机生成解决方案
//随机去除部分数据

var Generator = __webpack_require__(4);

module.exports = function () {
	function Sudoku() {
		_classCallCheck(this, Sudoku);

		var generator = new Generator();
		generator.generate();
		this.solutionMatrix = generator.matrix;
	}

	_createClass(Sudoku, [{
		key: "make",
		value: function make() {
			var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
			// level/9的数据被抹掉
			//生成谜盘
			this.puzzleMatrix = this.solutionMatrix.map(function (row) {
				return row.map(function (cell) {
					return Math.random() * 9 < level ? 0 : cell;
				});
			});
		}
	}]);

	return Sudoku;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独解决方案
var Toolkit = __webpack_require__(0);

module.exports = function () {
	function Generator() {
		_classCallCheck(this, Generator);
	}

	_createClass(Generator, [{
		key: "generate",

		//新语法啊，不习惯
		value: function generate() {
			//生成的矩阵含有0说明生成失败，则让其继续生成
			while (!this.internalGenerate()) {}
		}
	}, {
		key: "internalGenerate",
		value: function internalGenerate() {
			this.matrix = Toolkit.matrix.makeMatrix();
			this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
				return row.map(function (v, i) {
					return i;
				});
			}).map(function (row) {
				return Toolkit.matrix.shuffle(row);
			}); //对每一行进行打乱

			for (var n = 1; n <= 9; n++) {
				if (!this.fillNumber(n)) {
					return false;
				}
			}
			return true;
		}

		//填数字n

	}, {
		key: "fillNumber",
		value: function fillNumber(n) {
			return this.fillRow(n, 0);
		}
	}, {
		key: "fillRow",
		value: function fillRow(n, rowIndex) {
			if (rowIndex > 8) {
				return true;
			}
			var row = this.matrix[rowIndex];
			//对rowIndex行的随机序列
			var orders = this.orders[rowIndex];
			for (var i = 0; i < 9; i++) {
				var colIndex = orders[i];
				//已填过，跳过
				if (row[colIndex]) {
					continue;
				}

				//是否可填
				//checkFillable()
				if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
					continue;
				}

				row[colIndex] = n;

				//对于数字n，填下一行
				if (!this.fillRow(n, rowIndex + 1)) {
					row[colIndex] = 0;
					continue;
				}

				return true;
			}

			return false;
		}
	}]);

	return Generator;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//检查解决方案
function checkArray(arr) {
	var length = arr.length;
	var marks = new Array(length);
	marks.fill(true);

	for (var i = 0; i < length - 1; i++) {
		var v = arr[i];
		//已标志为false则跳过
		if (!marks[i]) {
			continue;
		}

		//是否有效 0无效，1-9有效
		if (v === 0) {
			marks[i] = false;
			continue;
		}
		//是否重复
		for (var j = i + 1; j < length; j++) {
			if (arr[j] === v) {
				marks[j] = false;
				marks[i] = false;
			}
		}
	}
	return marks;
}

var Toolkit = __webpack_require__(0);
//输入: matrix，用户完成后的矩阵
//处理：对matrix 行、列。宫进行检查
//输出：检查是否成功，marks

module.exports = function () {
	function Checker(matrix) {
		_classCallCheck(this, Checker);

		this._matrix = matrix;
		this._matrixMarks = Toolkit.matrix.makeMatrix(true);
	}

	_createClass(Checker, [{
		key: "check",
		value: function check() {
			this.checkRows();
			this.checkCols();
			this.checkBoxes();

			//Array.prototype.every(checkFn)，使用checkFn对每个元素进行检查，只要有一个返回false就返回false
			this._success = this._matrixMarks.every(function (row) {
				return row.every(function (mark) {
					return mark;
				});
			});
			return this._success;
		}
	}, {
		key: "checkRows",
		value: function checkRows() {
			for (var i = 0; i < 9; i++) {
				var row = this._matrix[i];
				var marks = checkArray(row);

				//把检查结果弄到_matrixMarks上去
				for (var j = 0; j < 9; j++) {
					if (!marks[j]) {
						this._matrixMarks[i][j] = false;
					}
				}
			}
		}
	}, {
		key: "checkCols",
		value: function checkCols() {
			for (var colIndex = 0; colIndex < 9; colIndex++) {
				var cols = [];
				for (var i = 0; i < 9; i++) {
					cols[i] = this._matrix[i][colIndex];
				}

				var marks = checkArray(cols);
				//把检查结果弄到_matrixMarks上去
				for (var j = 0; j < 9; j++) {
					if (!marks[j]) {
						this._matrixMarks[j][colIndex] = false;
					}
				}
			}
		}
	}, {
		key: "checkBoxes",
		value: function checkBoxes() {
			for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
				var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
				var marks = checkArray(boxes);

				for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
					if (!marks[cellIndex]) {
						var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
						    rowIndex = _Toolkit$box$convertF.rowIndex,
						    colIndex = _Toolkit$box$convertF.colIndex;

						this._matrixMarks[rowIndex][colIndex] = false;
					}
				}
			}
		}
	}, {
		key: "matrixMarks",
		get: function get() {
			return this._matrixMarks;
		}
	}, {
		key: "isSuccess",
		get: function get() {
			return this._success;
		}
	}]);

	return Checker;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function PopupNumbers($panel) {
		var _this = this;

		_classCallCheck(this, PopupNumbers);

		//去掉原来的hidden属性而使用本身的hide()
		this._$panel = $panel.hide().removeClass("hidden");

		//绑定popupnumbers面板事件
		this._$panel.on("click", "span", function (e) {
			var $span = $(e.target);

			//mark1、mark2的样式
			if ($span.hasClass("mark1")) {
				if (_this._$targetCell.hasClass("mark1")) {
					_this._$targetCell.removeClass("mark1");
				} else {
					_this._$targetCell.addClass("mark1");
				}
				_this.hide();
				return;
			}
			if ($span.hasClass("mark2")) {
				if (_this._$targetCell.hasClass("mark2")) {
					_this._$targetCell.removeClass("mark2");
				} else {
					_this._$targetCell.addClass("mark2");
				}
				_this.hide();
				return;
			}
			//empty，清空数字和mark
			if ($span.hasClass("empty")) {
				_this._$targetCell.removeClass("mark1").removeClass("mark2").addClass("empty").text(0);
				_this.hide();
				return;
			}
			//回填数字1-9
			_this._$targetCell.removeClass("empty").text($span.text());
			_this.hide();
		});
	}

	_createClass(PopupNumbers, [{
		key: "popup",
		value: function popup($cell) {
			//在$cell的位置弹出这个UI
			this._$targetCell = $cell;

			var _$cell$position = $cell.position(),
			    left = _$cell$position.left,
			    top = _$cell$position.top;
			//注意....那个是``````````不是''


			this._$panel.css({
				left: left + "px",
				top: top + "px"
			}).show();
		}
	}, {
		key: "hide",
		value: function hide() {
			this._$panel.hide();
		}
	}]);

	return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map