const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "[name][contenthash].js",
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: [".js"]
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }, 
        {
            test: /\.(png|svg|jpg|jpeg|gif)/, 
            type: "asset/resource",
        }, 
        {
            test: /\.(woff|woff2)$/, 
            use: {
                loader: 'url-loader', 
                options: {
                    limit: 10000, 
                    mimetype: "application/font-woff",
                    name: "[name][contenthash].[ext]",
                    outputPath: "./assets/fonts/",
                    publicPath: "./assets/fonts", 
                    esModule: false
                }
            }
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, 
            template:'./public/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin({
            filename: "assets/[name][contenthash].css"
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, "src", "assets/images"), 
        //             to: "assets/images"
        //         }
        //     ]
        // })
    ], 
    optimization: {
        minimize: true, 
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()           
        ]
    }
}