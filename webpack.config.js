const path = require('path');
const webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const publicPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'lib');
// const env  = require('yargs').argv.env;

var isProduction = process.env.NODE_ENV === 'production';

let libraryName = 'ng-spreadsheet';

let plugins = [], outputFile;

// if (env === 'build') {
//     plugins.push(new UglifyJsPlugin({ minimize: true }));
//     outputFile = libraryName + '.min.js';
// } else {
// }
outputFile = libraryName + '.js';

const config = {
  entry: path.join(publicPath, '/index.ts'),
  devtool: 'source-map',
  output: {
    path: distPath,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [
    '@angular/core',
    '@angular/common',
    '@angular/platform-browser',
    'rxjs'
  ],
  module: {
    rules: [
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader',
        exclude: [
          /Style/,
          /node_modules/,
          /Gemain\.css/,
        ]
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: 'tslint.json',
        }
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,//!isProduction,
            },
          }, {
            loader: 'angular2-template-loader',//?keepUrl=true
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'src': path.resolve('./src'),
    },
  },
  plugins: plugins
};

if (isProduction) {
  plugins.push(new CleanWebpackPlugin([distPath], {
    verbose: true,
  }));
  plugins.push(new UglifyJSPlugin({
    compress: true,
    mangle: false,
    sourceMap: true,
  }));
}

module.exports = config;