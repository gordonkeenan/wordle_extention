// webpack.chrome.config.js
const path = require('node:path')

module.exports = {
    entry: {
        background: './src/background.js',
        content: './src/content.js',
        popup: './src/popup.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.css'],
    },
    devtool: 'source-map',
}
