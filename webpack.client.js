var path = require('path');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base');

var config = {

    // Tell webpack the root file of our server application
    entry: './src/client/index.js',

    // Tell webpack where to put the output file that is generated
    output: {
        filename: 'bundle.js',
        chunkFilename: "[name].client.chunk.js",
        path: path.resolve(__dirname, 'public')
    }
};

module.exports = merge(baseConfig, config);
