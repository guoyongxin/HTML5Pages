const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: "./build",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  entry: {
    app: path.resolve(__dirname, 'app', 'main.js')
  },
  output: {
    path: __dirname + "/build",
    filename: "bundle.[hash].js",
    chunkFilename: '[name].[chunkhash].js'
  },
  optimization: {
    // runtimeChunk: {
    //     name: "manifest"
    // },
    // minimizer: [
    //   new UglifyJsPlugin({ /* your config */ })
    // ],
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: { // 将第三方模块提取出来
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10, // 优先
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' }
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'app'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        include: path.resolve(__dirname, 'app/assets/img'),
        loader: 'url-loader?limit=8192&name=[path][name].[ext]',
        // loader: 'url-loader?name=[path][name].[ext]',
      },
      // {
      //   test: /\.(png|jpg|gif|jpeg)$/,
      //   include: path.resolve(__dirname, 'app/assets/img'),
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[path][name].[ext]'
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.mp3$/,
        include: [
          path.resolve(__dirname, 'app/assets/audio')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }, {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }, {
          loader: 'expose-loader',
          options: 'jQuery'
        }]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, 'build/**/*.*')),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html",
      filename: 'index.html'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        warnings: false,
        output: {
          comments: false,
          beautify: false
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      }
    }),
    new ExtractTextPlugin('main.[hash].css')
  ]
}

module.exports = (env, argv) => {
  config.mode = argv.mode ? argv.mode : config.mode;
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  } else if (argv.mode === 'production') {
    //...
    config.devtool = '';
  } else {
    config.devtool = 'eval-source-map';
  }

  return config;
};