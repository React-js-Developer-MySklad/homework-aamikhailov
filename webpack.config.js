const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './main.tsx',
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                include: [path.resolve(__dirname, 'src')],
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    'postcss-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/inline',
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[contenthash].js",
        clean: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, 'tsconfig.json')
            }
        })
    ]
};