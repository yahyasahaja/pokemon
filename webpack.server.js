/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  const mode = argv.mode;

  return {
    entry: './server.ts',
    externals: [nodeExternals()],
    target: 'node',
    watch: mode === 'development',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      path: path.join(__dirname, '/build-server'),
      filename: 'index.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /(node_modules)/,
          loader: 'awesome-typescript-loader',
        },
        {
          test: /\.css$/,
          use: ['node-style-loader', 'css-loader'],
        },
        {
          test: /\.(jpe?g|ico|txt|gif|png|svg|woff|ttf|wav|mp3)$/,
          loader: 'file-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: 'public/index.html',
          },
          mode === 'production'
            ? {
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
              }
            : undefined
        )
      ),
    ],
  }
};
