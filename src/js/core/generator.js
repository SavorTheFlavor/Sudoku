//生成数独解决方案
const Toolkit = require("./toolkit")

module.exports = class Generator{
	//新语法啊，不习惯
	generate(){
		//生成的矩阵含有0说明生成失败，则让其继续生成
		while(!this.internalGenerate()){

		}
	}

	internalGenerate(){
		this.matrix = Toolkit.matrix.makeMatrix();
		this.orders = Toolkit.matrix.makeMatrix()
					.map(row => row.map((v,i) => i))
					.map(row => Toolkit.matrix.shuffle(row));//对每一行进行打乱

		for (var n = 1; n <= 9; n++) {
			if(!this.fillNumber(n)){
				return false;
			}
		}
		return true;
	}



	//填数字n
	fillNumber(n){
		return this.fillRow(n,0);
	}

	fillRow(n,rowIndex){
		if(rowIndex > 8){
			return true;
		}
		const row = this.matrix[rowIndex];
		//对rowIndex行的随机序列
		const orders = this.orders[rowIndex];
		for (let i = 0; i < 9; i++) {
			const colIndex = orders[i];
			//已填过，跳过
			if(row[colIndex]){
				continue;
			}

			//是否可填
			//checkFillable()
			if(!Toolkit.matrix.checkFillable(this.matrix,n,rowIndex,colIndex)){
				continue;
			}

			row[colIndex] = n;

			//对于数字n，填下一行
			if(!this.fillRow(n, rowIndex + 1)){
				row[colIndex] = 0;
				continue;
			}

			return true;
		}

		return false;
	}

};