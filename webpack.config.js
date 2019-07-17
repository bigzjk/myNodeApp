const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.join(__dirname, 'dist')
    },
    // mode: 'none',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: 3005,
        host: "0.0.0.0",
        open: true,
        // progress: true
        // compress: true // 启动gzip压缩
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader','css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            filename: 'index.html',
            inject: true,
            hash: true
          }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]

}