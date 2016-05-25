var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var extend = require('extend')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWP = require('copy-webpack-plugin')

var env = 'production'
var PATHS = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build'),
  node_modules: path.resolve(__dirname, '../node_modules')
}

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEBUG__: false
  }),
  new CopyWP([
    { from: path.resolve(PATHS.src, 'favicon.png'), to: 'favicon.png' },
    { from: path.resolve(PATHS.node_modules, './bootstrap/dist/css/bootstrap.min.css'), to: 'css/bootstrap.min.css'},
    { from: path.resolve(PATHS.node_modules, './bootstrap/dist/css/bootstrap.min.css.map'), to: 'css/bootstrap.min.css.map'},
    { from: path.resolve(PATHS.node_modules, './bootstrap/dist/fonts/'), to: 'fonts/'},
    { from: path.resolve(PATHS.node_modules, './designmodo-flat-ui/dist/css/flat-ui.min.css'), to: 'css/flat-ui.min.css'},
    { from: path.resolve(PATHS.node_modules, './designmodo-flat-ui/dist/fonts/'), to: 'fonts/'}
  ]),
  new HtmlWebpackPlugin({
    template: path.resolve(PATHS.src, 'index.html'),
    filename: 'index.html',
    chunks: ['vendor', 'main'],
    inject: 'body'
  })
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
    filename: 'js/[name].js',
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
    ]
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://0.0.0.0:3000',
        secure: false
      }
    },
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    outputPath: PATHS.build
  }
}