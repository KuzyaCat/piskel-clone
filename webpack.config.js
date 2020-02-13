const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['file-loader?limit=30000&name=images/[name].[ext]'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/screens/canvas/index.html',
            filename: 'index.html',
        }),
        new CopyPlugin([
            { from: 'node_modules/gif.js//dist/gif.worker.js', to: 'dist' },
        ]),
    ],
};
