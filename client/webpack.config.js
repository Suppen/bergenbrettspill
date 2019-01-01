/* eslint-disable-next-line */
"use strict";

/**************************
 * Import important stuff *
 **************************/

const path = require("path");

/*********************
 * Make some helpers *
 *********************/

const inProduction = process.env.NODE_ENVIRONMENT === "production" ? true : false;

/*******************
 * Make the config *
 *******************/

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.join(__dirname, "build"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			// .scss
			{
				test: /\.scss$/i,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader", options: { sourceMap: !inProduction, minimize: inProduction } },
					{ loader: "sass-loader", options: { sourceMap: !inProduction } }
				]
			},
			// .js and .jsx
			{
				test: /\.jsx?$/i,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								["@babel/preset-env", { targets: { firefox: 60, chrome: 70, safari: 12, opera: 55 } }],
								["@babel/preset-react"]
							]
						}
					}
				]
			},
			// Static files
			{
				test: /\.(png|jpg|webm)$/i,
				use: {
					loader: "file-loader"
				}
			}
		]
	}
};
