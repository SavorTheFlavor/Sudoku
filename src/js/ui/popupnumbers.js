module.exports = class PopupNumbers{

	constructor($panel){
		//去掉原来的hidden属性而使用本身的hide()
		this._$panel = $panel.hide().removeClass("hidden");
	}

	popup($cell){//在$cell的位置弹出这个UI
		const {left,top} = $cell.position();
		console.log("left:"+left);
		//注意....那个是``````````不是''
		this._$panel.css({
			left:`${left}px`,
			top:`${top}px`
		}).show();
	}

}