let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'main.js'
    },
    mode: 'production',
    plugins: [  new MiniCssExtractPlugin(), 
                new HtmlWebpackPlugin(
                {
                  template: './src/html/index.pug',
                  filename: 'index.html'
                }
                ),
                new ESLintPlugin({
                  fix: true
                }),
            ], 
    module: {
        rules: [
          {
            test: /\.scss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          }, 
          {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
            pretty: true
            }
          }
        ],
      },
      optimization: {
        minimizer: [
          `...`,
          new CssMinimizerPlugin(),
        ],
      },
}