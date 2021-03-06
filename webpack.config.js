const path = require('path')
const webpack = require('webpack')

const config = {
  mode: 'development',
  entry: [
    './src/frontend/pair_pressure.js',
    'webpack-hot-middleware/client'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'react-hot-loader/babel',
              'transform-class-properties'
            ],
            presets: ['env', 'react', 'flow']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = config
