var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var extend = require('extend')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var Md5HashWP = require('webpack-md5-hash')
var CopyWP = require('copy-webpack-plugin')

var UglifyJsWP = webpack.optimize.UglifyJsPlugin;
var CommonsChunkWP = webpack.optimize.CommonsChunkPlugin;

var env = 'production'
var PATHS = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build'),
  node_modules: path.resolve(__dirname, '../node_modules')
}

var plugins = [
  new Md5HashWP(),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEBUG__: false
  }),
  new CopyWP([
    { from: path.resolve(PATHS.node_modules, './bootstrap/dist/css/bootstrap.min.css'), to: 'css/bootstrap.min.css'},
    { from: path.resolve(PATHS.node_modules, './designmodo-flat-ui/dist/css/flat-ui.min.css'), to: 'css/flat-ui.min.css'},
  ]),
  new HtmlWebpackPlugin({
    template: path.resolve(PATHS.src, 'index.html'),
    filename: 'index.html',
    chunks: ['vendor', 'main'],
    inject: 'body',
    favicon: path.resolve(PATHS.src, 'favicon.ico')
  }),
  new CommonsChunkWP('vendor', `js/vendors.[chunkhash:8].min.js`),
  //new ExtractTextWP('css/commons.[contenthash:8].min.css'),
  new UglifyJsWP({ minimize: true })
]

var sassLoaders = [
  'style-loader',
  'css-loader?sourceMap',
  'postcss-loader',
  'sass-loader?outputStyle=expanded'
]

module.exports = {
  env,
  entry: {
    vendor: ['react', 'redux', 'react-redux', 'react-router', 'react-router-redux'],
    main: path.resolve(PATHS.src, 'main.js')
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].[chunkhash:8].min.js',
    chunkFilename: 'js/[chunkhash:8].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: PATHS.src
      },
      {
        test: /\.scss$/,
        loader: sassLoaders.join('!')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=8192'
      },{
        test: /\.(woff|eot|ttf|woff2)$/i,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ],
    postcss: () => [autoprefixer({ browsers: ['last 2 versions'] })]
  }
}
