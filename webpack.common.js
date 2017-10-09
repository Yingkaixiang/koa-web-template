/**
 * todo:
 * pug文件目录错误问题
 * 正式环境使用 webpack.prod 打包
 */

const path = require('path');
const glob = require('glob');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MyHtmlWebpackPlugin = require('./lib/myHtmlWebpackPlugin');

const config = {
  entry: {
    demo: [
      './src/publics/js/demo.js',
      './src/publics/js/demo1.js',
    ],
    layout: './src/publics/js/common.js',
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
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('[name].[chunkhash].css'),
  ],
};

// 生成新模板
const files = glob.sync('./src/views/**/*.pug');
files.forEach((file) => {
  const basename = path.basename(file);
  const filename = path.basename(file, '.pug');
  config.plugins.push(new HtmlWebpackPlugin({
    template: file,
    filename: `../views/${basename}`,
    chunks: [filename],
    inject: filename === 'layout' ? 'head' : 'body',
  }));
});

config.plugins.push(new MyHtmlWebpackPlugin());
config.plugins.push(new HtmlWebpackPugPlugin());

module.exports = config;
