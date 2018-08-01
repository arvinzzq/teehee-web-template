const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HashPlugin = require('./HashPlugin');
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
  entry: {
    'entry': './client/entry/main.js'
  },
  output: {
    filename: 'js/[name]_[chunkhash].js',
    path: path.resolve(__dirname, 'publish')
  },
  plugins: [
    new CleanWebpackPlugin('publish'),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash].css'
    }),
    new HashPlugin()
  ]
});
