const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
  entry: {
    'entry': './client/entry/main.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'static')
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin('static'),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
})
