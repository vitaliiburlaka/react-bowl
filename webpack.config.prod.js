/* eslint-disable object-shorthand */
/* eslint-disable global-require */

const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const publicPath = '/'
const appBuild = path.resolve(__dirname, 'dist')
const appSrc = path.resolve(__dirname, './src')
const appIndexJs = './src/index.js'
const appIndexHtml = 'public/index.html'
const shouldUseSourceMap = process.env.NODE_ENV !== 'production'
const isEnvProduction = process.env.NODE_ENV === 'production'

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'json',
  'web.jsx',
  'jsx',
]

// Style files regexes
const cssRegex = /\.css$/
const sassRegex = /\.(scss|sass)$/

// Common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: shouldUseSourceMap,
      },
    },
  ]
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: shouldUseSourceMap,
      },
    })
  }
  return loaders
}

module.exports = env => ({
  mode: 'production',
  // Stop compilation early in production
  bail: isEnvProduction,
  devtool: shouldUseSourceMap ? 'source-map' : false,
  entry: appIndexJs,
  output: {
    path: appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            // Turned on because emoji and regex is not minified properly using default
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: shouldUseSourceMap,
      }),
      // This is only used in production mode
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap
            ? {
                // Forces the sourcemap to be output into a separate file
                inline: false,
                // Appends the sourceMappingURL to the end of the css file
                annotation: true,
              }
            : false,
        },
      }),
    ],
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), appSrc],
    extensions: moduleFileExtensions.map(ext => `.${ext}`),
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      // First, run the linter before Babel processed the JS.
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              ignore: false,
            },
          },
        ],
        include: appSrc,
      },
      {
        test: /\.(js|mjs|jsx)$/,
        include: appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true,
        },
      },
      {
        test: cssRegex,
        loader: getStyleLoaders({
          importLoaders: 1,
          sourceMap: shouldUseSourceMap,
        }),
        sideEffects: true,
      },
      {
        test: sassRegex,
        loader: getStyleLoaders(
          {
            importLoaders: 2,
            sourceMap: shouldUseSourceMap,
          },
          'sass-loader'
        ),
        sideEffects: true,
      },
      {
        test: /\.(jpg?g|png|gif|svg)$/i,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: appIndexHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    env &&
      env.analyze &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
  ].filter(Boolean),
})
