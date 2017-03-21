var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isDevelopment = (process.env.NODE_ENV === 'development');
var devtool = isDevelopment ? 'source-map' : null;

var webpackPlugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.ejs',
    inject: false,
    isDevelopment: isDevelopment
  }),
  new webpack.optimize.CommonsChunkPlugin('commons.chunk.js', ['app']),
  new webpack.DefinePlugin({ 'NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
];

// dev 以外は難読化する
if (!isDevelopment) {
  webpackPlugins.push(new webpack.optimize.OccurenceOrderPlugin());
  webpackPlugins.push(new webpack.optimize.DedupePlugin());
  webpackPlugins.push(new webpack.optimize.AggressiveMergingPlugin());
  webpackPlugins.push(new webpack.optimize.UglifyJsPlugin({
    output: { comments: require('uglify-save-license') }
  }));
}

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    publicPath: '/',
    path: './dist',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  devtool: devtool,

  resolve: {
    root: path.resolve('src')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: webpackPlugins,

  devServer: {
    contentBase: 'dist',
    historyApiFallback: true
  },

  node: {
    fs: 'empty'
  }
};
