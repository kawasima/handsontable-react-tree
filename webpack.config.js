const webpack = require('webpack')

const BASE_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

module.exports = {
  entry: process.env.NODE_ENV === 'production'
    ? [
      './example/app.js'
    ]
    : [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3355',
      'webpack/hot/only-dev-server',
      './example/app.js'
    ],
  output: {
    path: __dirname + '/example',
    filename: 'bundle.js',
    publicPath: '/example/'
  },
  plugins: process.env.NODE_ENV === 'production'
    ? BASE_PLUGINS
    : BASE_PLUGINS.concat([
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]),
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      { test: /\.css$/, use: [{loader: 'style-loader!css-loader'}] }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    redux: 'Redux',
    'react-redux': 'ReactRedux',
    handsontable: 'Handsontable'
  }
};
