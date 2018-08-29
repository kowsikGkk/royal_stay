/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const base = require('./webpack.base.config');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const os = require('os');
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
    devtool: 'cheap',
    context: path.resolve(__dirname, '../'),
    entry: {
        main: [// the entry point of our app
            './src/index.js'],
        vendor1: 'moment',
        vendor2: 'lodash',
        vendor3: 'react-ace',
        vendor: [
            'whatwg-fetch',
            'babel-polyfill',
            'immutable',
            'react-dom',
            'react-redux',
            'react-router',
            'redux-saga',
            'redux',
            'react',
        ],
    },
    externals: [
        'css-loader',
        'postcss-loader',
        'precss',
    ],
    output: {
        path: `${__dirname}/../__build__`,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        publicPath: '/',
    },
    cache: true,
    module: base,
    resolve: {
        extensions: ['.js'],
        alias: {
            src: path.resolve(__dirname, '../src'),
        },
        modules: [
            'node_modules',
            path.join(__dirname, '../src'),
        ],
        cacheWithContext: false,
    },
    parallelism: 10,
    performance: {
        hints: 'warning',
    },
    target: 'web',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
            },
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        //     new MinifyPlugin({}, {
        //       test: /\.js/,
        //       babel: require('babel-core'),
        //       minifyPreset: require('babel-preset-minify'),
        //     }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/, /lodash/, /immutable/, /react/),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'vendor1', 'vendor2', 'vendor3'],
            minChunks(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
            maxSize: 50000,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest', // Specify the common bundle's name.
            minChunks: Infinity,
        }),
        new ExtractTextPlugin({
            filename: '[name].[id].css',
            //      allChunks: true,
            ignoreOrder: true,
        }),
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            workers: os.cpus().length,
            uglifyJS: {
                output: {
                    comments: false,
                },
                compress: {
                    warnings: false,
                },
            },
        }),
        // new UglifyJSPlugin({
        //   sourceMap: false,
        //   parallel: {
        //     cache: true,
        //     workers: 2,
        //   },
        //   uglifyOptions: {
        //     ie8: false,
        //     ecma: 8,
        //     output: {
        //       comments: false,
        //       beautify: false,
        //     },
        //     compress: {
        //       warnings: false,
        //       screw_ie8: true,
        //     },
        //     warnings: false,
        //   },
        // }),
        /*new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|html|css|md|ttf|txt|eot|ico|otf|svg|png|gif|woff2|woff|jpeg)$/,
            // threshold: 10240,
            minRatio: 0.7,
            deleteOriginalAssets: true,
        }),*/
        new HtmlWebpackPlugin({
            template: 'index.html',
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
            inject: true,
        }),
        new CopyWebpackPlugin([
            { from: 'src/images/logo.png', to: 'logo-16x16.png' },
            { from: 'src/images/logo.png', to: 'logo-32x32.png' },
        ], { copyUnmodified: true }),
        // new BundleAnalyzerPlugin()
    ],

};
