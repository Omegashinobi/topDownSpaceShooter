const path = require('path');
const BuildMainifestPlugin = require("./webpack-manifest/app");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/app.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'file-loader',
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback : {
            path: require.resolve('path-browserify'),
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Top Down Shooter'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' }
            ]
        }),
        new BuildMainifestPlugin({
            path : "src/assets",
            manifest : "assetManifest.json",
            groups : [
                {
                    name : "sprites",
                    fileMap : {
                        atlas : ["json"],
                        images : ["png"]
                    },
                }
            ]
        })
    ],
    devServer: {
        host: 'localhost',
        port: '8000',
        hot: false,
    },
};