const Grid = require("./ui/grid")
const PopupNumbers = require("./ui/popupnumbers");

const grid = new Grid($(".container"));
grid.build();

const popupnumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupnumbers);

$("#check").on("click", e => {
	if(grid.check()){
		alert("你成功了！！");
	}
})
$("#reset").on("click", e => {
	grid.reset();
})
$("#clear").on("click", e => {
	grid.clear();
})

$("#restart").on("click", e => {
	grid.restart();
})