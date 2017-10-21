
module.exports = {
	entry:{
		index:"./js/index"
	},
	output:{
		filename:"[name].js"
	},
	devtool:"source-map",
	resolve:{
		extensions:[".js"]
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:"babel-loader",
				exclude:__dirname + "/node_modules",
				query:{
					presets:["es2015"]
				}
			}
		]
	}

}