const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?url=false',
                    'sass-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                    }
                }
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: 'DXN Studio',
                template: path.resolve(__dirname, './src/index.html'),
                filename: 'index.html',
            }
        ),
        new HtmlWebpackPlugin(
            {
                title: 'Контакты',
                template: path.resolve(__dirname, './src/contacts.html'), 
                filename: 'contacts.html', 
            }
        ),
        new HtmlWebpackPlugin(
            {
                title: 'Портфолио',
                template: path.resolve(__dirname, './src/portfolio.html'), 
                filename: 'portfolio.html', 
            }
        ),
        new CleanWebpackPlugin(),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/img'),
                    to: path.resolve(__dirname, './dist/img')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
}