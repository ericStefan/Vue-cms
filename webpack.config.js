const path = require('path')
const HtmlPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const { resolve } = require('path')
const webpack = require('webpack')
const htmlPlugin = new HtmlPlugin({
    template: "./src/index.html",
    filename: "index.html"
})

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'build.js'
    },
    plugins: [
        htmlPlugin,
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ],

    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.jpg|png|bmp|gif|svg|ttf|woff|woff2|eot$/, use: 'url-loader' },
            // { test: /\.svg$/, use: 'svg-sprite-loader' },
            { test: /\.vue$/, use: 'vue-loader' },//处理.vue文件的loader
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,//排除掉node_module目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    devServer: {
        // 开发服务器只在内存中打包，不会生成本地文件
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000
    },

    resolve: {
        alias: {//修改vue被导入时候的包的路径
            // "vue$": "vue/dist/vue.js"
        }
    }
}