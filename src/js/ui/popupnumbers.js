module.exports = class PopupNumbers{

	constructor($panel){
		//去掉原来的hidden属性而使用本身的hide()
		this._$panel = $panel.hide().removeClass("hidden");

		//绑定popupnumbers面板事件
		this._$panel.on("click","span",e => {
			const $span = $(e.target);

			//mark1、mark2的样式
			if($span.hasClass("mark1")){
				if(this._$targetCell.hasClass("mark1")){
					this._$targetCell.removeClass("mark1");
				}else{
					this._$targetCell.addClass("mark1");
				}
				this.hide();
				return;
			}
			if($span.hasClass("mark2")){
				if(this._$targetCell.hasClass("mark2")){
					this._$targetCell.removeClass("mark2");
				}else{
					this._$targetCell.addClass("mark2");
				}
				this.hide();
				return;
			}
			//empty，清空数字和mark
			if($span.hasClass("empty")){
				this._$targetCell.removeClass("mark1")
								 .removeClass("mark2")
								 .addClass("empty")
								 .text(0);
				this.hide();
				return;
			}						
			//回填数字1-9
			this._$targetCell.removeClass("empty")
							  .text($span.text());
			this.hide();
		});
	}

	popup($cell){//在$cell的位置弹出这个UI
		this._$targetCell = $cell;
		const {left,top} = $cell.position();
		//注意....那个是``````````不是''
		this._$panel.css({
			left:`${left}px`,
			top:`${top}px`
		}).show();
	}

	hide(){
		this._$panel.hide();
	}

}