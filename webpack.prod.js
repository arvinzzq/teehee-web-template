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
    filename: 'js/[name]_[chunkhash].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CleanWebpackPlugin('build'),
    new MiniCssExtractPlugin({
      filename: 'css/[name]__[contenthash].css'
    })
  ]
})
