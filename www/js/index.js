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
var grid = new Grid($(".container"));
grid.build();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolkit = __webpack_require__(0);
var Sudoku = __webpack_require__(3);

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
			var matrixTemp = sudoku.puzzleMatrix;

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

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map