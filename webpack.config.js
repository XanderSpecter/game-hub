const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv = {}) => {
    const isProd = argv.mode === 'production';

    const config = {
        entry: {
            app: './src/index.tsx',
        },
        output: {
            path: path.join(__dirname, './dist'),
            publicPath: '/',
            filename: '[name].[hash].js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: !isProd,
                    uglifyOptions: {
                        warnings: false,
                        mangle: true,
                    },
                }),
                new OptimizeCssAssetsPlugin({
                    cssProcessorOptions: { discardComments: { removeAll: true } },
                    canPrint: true,
                }),
            ],
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
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer(),
                                ],
                                sourceMap: !isProd,
                            },
                        },
                    ],
                },
            ]
        },
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://xspecter.ru/',
                    secure: false,
                    logLevel: 'debug',
                    ignorePath: false,
                    changeOrigin: true,
                },
            },
            contentBase: path.join(__dirname, '/'),
            compress: true,
            https: false,
            host: '0.0.0.0',
            port: 9004,
            overlay: true,
            publicPath: '/',
            historyApiFallback: {
                rewrites: [
                    { from: '/', to: '/index.html' },
                ],
            },
            disableHostCheck: true,
            writeToDisk: true,
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

    return config;
};
