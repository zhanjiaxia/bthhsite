var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var extend = require('extend')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var mockServer = 'http:0.0.0.0:3333'

var env = 'development'
var PATHS = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build')
}

var plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEBUG__: true
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(PATHS.src, 'index.html'),
    filename: 'index.html',
    chunks: ['vendor', 'main'],
    inject: 'body',
    favicon: path.resolve(PATHS.src, 'favicon.ico')
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
    main: path.resolve(PATHS.src, 'main.js'),
    vendor: ['react']
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].[hash:6].js',
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
        //loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
        loader: 'file?name=fonts/[name].[ext]'
      }
    ],
    postcss: () => [autoprefixer({ browsers: ['last 2 versions'] })],
    devServer: {
      proxy: {
        '/api/*': {
          target: mockServer,
          secure: false
        }
      },
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    devtool: 'eval'
  }
}
