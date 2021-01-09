const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const fs = require('fs')

// Our function that generates our html plugins
function generateHtmlPluginsViews(pathViews, pathIncludes) {
    // Read files in template directory
    let filesViews = fs.readdirSync(path.resolve(__dirname, pathViews))
    return filesViews.map(item => {
        // Split names and extension
        let parts = item.split('.')
        let name = parts[0]
        // Create new HTMLWebpackPlugin with options
        return new HtmlWebpackPlugin({
            inject: false,
            filename: `./${name}.php`,
            template: path.resolve(__dirname, `${pathViews}/${name}.pug`),
        })
    })
}

// Our function that generates our html plugins
function generateHtmlPluginsIncludes(pathIncludes) {
    // Read files in template directory
    let filesIncludes = fs.readdirSync(path.resolve(__dirname, pathIncludes))
    return filesIncludes.map(item => {
        // Split names and extension
        let parts = item.split('.')
        let name = parts[0]
        // Create new HTMLWebpackPlugin with options
        return new HtmlWebpackPlugin({
            inject: false,
            filename: `./includes/${name}.php`,
            template: path.resolve(__dirname, `${pathIncludes}/${name}.pug`),
        })
    })
}


// Call our function on our views directory.
const htmlPluginsViews = generateHtmlPluginsViews('./src/pug/views')
const htmlPluginsIncludes = generateHtmlPluginsIncludes('./src/pug/includes')

module.exports = {
    mode: 'development', //most important
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'app.bundle.js'
    },


    // ------------------  RULES
    // ------------------  RULES
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },

            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.pug$/,
                use: 'pug-loader'
            },

            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },

            {
                test: /\.js$/,
                loader: "imports-loader?define=>false"
            }

        ]
    },

    // ------------------  DEV SERVER
    // ------------------  DEV SERVER
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        stats: 'errors-only',
        open: true
    },


    // ------------------  PLUGINS
    // ------------------  PLUGINS
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            title: 'INDEX PAGE',
            filename: 'index.php',
            template: './src/pug/index.pug',
        }),
        //new HtmlWebpackPlugin({
        //    title: 'CONTACT PAGE',
        //    filename: 'contact.html',
        //    template: './src/contact.pug'
        //}),
        new ExtractTextPlugin({ //important: use: npm i -D extract-text-webpack-plugin@next
            filename: './css/app.css'
        }),
        new OptimizeCssnanoPlugin({
            cssnanoOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                }],
            },
        }),
        new WriteFilePlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ].concat(htmlPluginsViews).concat(htmlPluginsIncludes),




    resolve: {
        alias: { //Seção Alias
            "ScrollMagicGSAP": "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap",
            "barba": path.resolve('node_modules', 'barba.js/dist/barba.min'),
        }
    }

} //close module exports