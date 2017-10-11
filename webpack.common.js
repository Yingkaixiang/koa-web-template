const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MyHtmlWebpackPlugin = require('./lib/myHtmlWebpackPlugin');

const config = {
  entry: {
    moment: [
      './src/publics/js/moment.js',
    ],
    layout: [
      './src/publics/js/lib/common.js',
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './dist/publics/'),
    publicPath: '/publics/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
  ],
};

// 生成新模板
const files = glob.sync('./src/views/**/*.pug');
files.forEach((file) => {
  const filename = path.parse(file).name;
  config.plugins.push(new HtmlWebpackPlugin({
    template: `raw-loader!${file}`,
    filename: file.replace(/^\.\/src/, '..'),
    chunks: [filename, 'layout'],
  }));
});

config.plugins.push(new MyHtmlWebpackPlugin());
config.plugins.push(new HtmlWebpackPugPlugin());

module.exports = config;
