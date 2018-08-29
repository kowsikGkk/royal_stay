/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  rules: [
    {
      test: /\.(md|ttf|txt|eot|ico|otf|svg|jpg|png|gif|woff2|woff|pdf|mp4|jpeg(2)?)(\?[a-z0-9]+)?$/,
      exclude: /node_modules/,
      include: [path.resolve(__dirname, '../src')],
      use: [{ loader: 'file-loader' }],
    },
    {
      test: /\.html$/,
      loader: 'url-loader',
      include: [path.resolve(__dirname, '../src')],
      exclude: [/node_modules/, /index.html/],
    },
    {
      test: /\.css$/,
      // include: [path.resolve(__dirname, '../src')],
      exclude: [/global.css/, /flaticon.css/, /dayPicker.css/, /Checkbox.css/],
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: process.env.NODE_ENV === 'production',
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'), // eslint-disable-line,
                require('precss'), // for loading scss coverted to css.
              ],
            },
          },
        ],
      }),
    },
    {
      test: [/global.css/, /flaticon.css/, /dayPicker.css/, /Checkbox.css/],
      exclude: [/node_modules/],
      include: [path.resolve(__dirname, '../src')],
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV === 'production',
            },
          },
          'postcss-loader',
        ],
      }),
    },
    {
      test: /\.js/,
      exclude: [/node_modules/, /\.test\.js/],
      loader: 'babel-loader',
      include: [path.resolve(__dirname, '../src')],
      query: {
        presets: ['es2015', 'react', 'stage-0'],
      },
    },
  ],
};
