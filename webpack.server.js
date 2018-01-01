var path = require('path');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base');
var webpackNodeExternals = require('webpack-node-externals');

var config = {

    // Inform webpack that we are building a bundle for nodeJS, rather then for the browser
    target: 'node',

    // Tell webpack the root file of our server application
    entry: './src/server/index.js',

    // Tell webpack where to put the output file that is generated
    output: {
        filename: 'bundle.js',
        chunkFilename: "[name].server.chunk.js",
        path: path.resolve(__dirname, 'build')
    },

    externals: [
        webpackNodeExternals()
    ]
};

module.exports = merge(baseConfig, config);
