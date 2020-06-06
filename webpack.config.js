module.exports = {
    entry: __dirname + '/src/index.jsx',
    output: {
        path: __dirname + "/public/js/",
        filename: 'bundle.js'
    },
    mode: 'development',
    devtool: '#sourcemap',
    devServer: {
       // contentBase: './server/public',
       // publicPath: './server/public',
        hot: true,
        port: 3000,
        open: true,
        historyApiFallback: true
    },
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            //importLoaders: 1,
                            modules: true
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babel/react', {
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }]
                }

            }
        ]
    }
}