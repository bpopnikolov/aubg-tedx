/* globals __dirname */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: './assets/css/app.css',
});

const config = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        app: './app.js',
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './assets/js/[name].bundle.js',
    },
    module: {
        rules: [
            // babel-loader with 'env' preset
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                    },
                },
            },
            // html-loader
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // publicPath: '/src/img',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                // sourceMap: true,
                                url: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // sourceMap: true,
                            },
                        },
                    ],
                }),
            },
            // file-loader(for images)
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/img/',
                    },
                },
            },
            // file-loader(for fonts)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/fonts/',
                    },
                },
            },
        ],
    },
    plugins: [
        // cleaning up only 'dist' folder
        new CopyWebpackPlugin([{
                from: 'assets/js/vendor',
                to: 'assets/js/vendor/[name].[ext]',
                toType: 'template',
            },
            {
                from: 'assets/img',
                to: 'assets/img/[path][name].[ext]',
                toType: 'template',
            },
            {
                from: 'assets/fonts',
                to: 'assets/fonts/[path][name].[ext]',
                toType: 'template',
            },
        ]),
        // new ImageminPlugin({
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //     optipng: {
        //         optimizationLevel: 9,
        //     },
        // }),
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        extractPlugin,
    ],

    devServer: {
        // static files served from here
        contentBase: path.resolve(__dirname, './build/assets/'),
        compress: true,
        // open app in localhost:2000
        port: 2000,
        stats: 'errors-only',
        open: true,
    },
    devtool: 'inline-source-map',
    stats: {
        colors: true,
    },
};

module.exports = config;
