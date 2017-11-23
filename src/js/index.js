const Grid = require("./ui/grid")
const PopupNumbers = require("./ui/popupnumbers");

const grid = new Grid($(".container"));
grid.build();

const popupnumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupnumbers);