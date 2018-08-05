const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:['env', 'stage-0', 'react'],
            plugins: ['transform-decorators-legacy', 'transform-runtime', 'transform-async-to-generator']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'client/common'),
      pages: path.resolve(__dirname, 'client/pages')
    },
    extensions: ['.js', '.jsx']
  }
};
