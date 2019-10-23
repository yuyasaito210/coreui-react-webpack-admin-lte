const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonPaths = require('./paths');

module.exports = {
  mode: 'production',
  output: {
    filename: `${commonPaths.jsFolder}/[name].js`,
    path: commonPaths.outputPath,
  },
  // optimization: {
  //   minimizer: [
  //     new TerserPlugin({
  //       // Use multi-process parallel running to improve the build speed
  //       // Default number of concurrent runs: os.cpus().length - 1
  //       parallel: true,
  //       // Enable file caching
  //       cache: true,
  //       sourceMap: true,
  //     }),
  //     new OptimizeCSSAssetsPlugin(),
  //   ],
  //   // Automatically split vendor and commons
  //   // https://twitter.com/wSokra/status/969633336732905474
  //   // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'initial',
  //       },
  //       async: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'async',
  //         chunks: 'async',
  //         minChunks: 4,
  //       },
  //     },
  //   },
  //   // Keep the runtime chunk seperated to enable long term caching
  //   // https://twitter.com/wSokra/status/969679223278505985
  //   runtimeChunk: true,
  // },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: `${commonPaths.cssFolder}/${commonPaths.cssFileName}`,
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
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
      // SVG
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
      // Image
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
      },
      // JSON
      {
        test: /\.(json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: `${commonPaths.cssFolder}/[name].css`,
    //   chunkFilename: `${commonPaths.cssFolder}/[name].css`,
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devtool: 'source-map',
};
