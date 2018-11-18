"use strict";

/**************************
 * Import important stuff *
 **************************/

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

/*********************
 * Make some helpers *
 *********************/

const inProduction = process.env.NODE_ENVIRONMENT === "production" ? true : false;

const src = path.join(__dirname, "src", "client");
const dst = path.join(__dirname, "src", "server", "public");

/*******************
 * Make the config *
 *******************/

module.exports = {
	entry: {
		main: [
			path.join(src, "js", "index.js"), // JS
			path.join(src, "style", "index.scss") // SCSS
		]
	},
	output: {
		path: path.join(__dirname, "src", "server", "public"),
		filename: "bundle.js"
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: path.join("style.css")
		}),
		new CopyPlugin([{ from: path.join(src, "img"), to: path.join(dst, "img") }]),
		new CopyPlugin([{ from: path.join(src, "vid"), to: path.join(dst, "vid") }])
	],
	module: {
		rules: [
			// .scss
			{
				test: /\.scss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: "css-loader", options: { sourceMap: !inProduction, minimize: inProduction } },
					{ loader: "sass-loader", options: { sourceMap: !inProduction } }
				]
			},
			// .js
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [["@babel/preset-env", { targets: { firefox: 60, chrome: 70, safari: 12, opera: 55 } }]]
						}
					}
				]
			}
		]
	}
};
