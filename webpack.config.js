"use strict";

/**************************
 * Import important stuff *
 **************************/

const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

/*******************
 * Make the config *
 *******************/

module.exports = {
	entry: path.join(__dirname, "src", "client", "index.js"),
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "src", "server", "public")
	},
	module: {
		rules: [
			// .scss
			{
				test: /\.scss$/,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
			},
			// .js and .jsx
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								["@babel/preset-env", { targets: { firefox: 60, chrome: 70, safari: 12, opera: 55 } }],
								"@babel/preset-react"
							]
						}
					}
				]
			},
			// .html
			{
				test: /\.html$/,
				use: [{ loader: "html-loader" }]
			}
		]
	},
	plugins: [
		new HtmlPlugin({
			template: path.join(__dirname, "src", "client", "index.html")
		})
	]
};
