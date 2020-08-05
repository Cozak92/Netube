"use strict";

var path = require("path");

var autoprefixer = require("autoprefixer");

var ExtractCSS = require("extract-text-webpack-plugin");

var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var loader = require("sass-loader");

var MODE = process.env.WEBPACK_ENV;
var ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
var OUTPUT_DIR = path.join(__dirname, "static");
var config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [{
      test: /\.(js)$/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.(scss)$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: "css-loader"
      }, {
        loader: "postcss-loader",
        options: {
          plugins: function plugins() {
            return [autoprefixer({
              overrideBrowserslist: "cover 99%"
            })];
          }
        }
      }, {
        loader: "sass-loader"
      }]
    }]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css"), new MiniCssExtractPlugin({
    filename: "styles.css"
  })]
};
module.exports = config;