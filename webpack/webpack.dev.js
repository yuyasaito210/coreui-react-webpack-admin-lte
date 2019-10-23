const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonPaths = require('./paths');

module.exports = {
  mode: 'development',
  output: {
    filename: `${commonPaths.jsFolder}/[name].js`,
    path: commonPaths.outputPath,
    publicPath: commonPaths.publicPath
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: `${commonPaths.cssFileName}`,
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      // JS | JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // CSS
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // SCSS
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // // CSS
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true
      //       }
      //     },
      //     // {
      //     //   loader: MiniCssExtractPlugin.loader,
      //     //   options: {
      //     //     publicPath: commonPaths.cssFolder,
      //     //     hmr: true,
      //     //   },
      //     // },
      //   ]
      // },
      // // SASS support - compile all .scss files and pipe it to style.css
      // {
      //   test: /\.(scss|sass)$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true,
      //         // modules: true,
      //         // importLoaders: 1,
      //         // localIdentName: '[name]__[local]__[hash:base64:5]'
      //       }
      //     },
      //     {
      //       loader: 'sass-loader'
      //     }
      //   ]
      // },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
            outputPath: commonPaths.imagesFolder,
          }
        }
      },
      {
        test: /\.(gif|png|jpg|jpeg|webp)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: '[name].[ext]',
              outputPath: commonPaths.imagesFolder,
            }
          }
        ]
      }
    ],
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    // compress: true,
    // hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // all options are optional
    //   filename: '[name].[hash].css', //'stylesheets.css'
    //   // chunkFilename: '[id].[hash].css',
    //   ignoreOrder: false, // Enable to remove warnings about conflicting order
    // }),
    new MiniCssExtractPlugin({
      // filename: '[name].css',
      filename: `${commonPaths.cssFolder}/[name].css`
    }),
  ],
};
