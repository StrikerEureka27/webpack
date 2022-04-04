const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DotEnv = require("dotenv-webpack");


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "[name][contenthash].js",
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: "development",
    resolve: {
        extensions: [".js"], 
        alias: {
            "@utils": path.resolve(__dirname, 'src/utils'),
            "@templates": path.resolve(__dirname, 'src/templates'),
            "@styles": path.resolve(__dirname, 'src/styles'),
            "@images": path.resolve(__dirname, 'src/assets/images')
        }
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
            type: "asset/resource",
            generator: {
                filename: "assets/fonts/[hash][ext]",
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
        new DotEnv()
    ], 
    
}