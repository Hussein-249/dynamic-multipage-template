const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/js/index.js', './src/js/search-form.js'],
    },
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            include: [
                path.resolve(__dirname, 'src/js'),
              ],
            exclude: /node_modules/,
          },
        ],
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
}
