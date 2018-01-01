var webpack = require('webpack');

module.exports = {

    // Tell webpack to run babel on every file it runs through
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        'syntax-dynamic-import'
                    ],
                    presets: [
                        'react',
                        'stage-0',
                        [
                            'env',
                            {
                                targets: {
                                    browsers: ['last 2 versions']
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'DEBUG': JSON.stringify(process.env.DEBUG)
            }
        })
    ]
};
