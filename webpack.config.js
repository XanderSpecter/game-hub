const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.less/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
        new HtmlWebpackPlugin({
            files: {
                css: ['styles.[hash].css'],
                js: ['app.[hash].js'],
            },
            template: './src/index.html',
            filename: './index.html',
            inject: false,
        }),
    ]
};
