/**
 * @file webpack base config file
 */
var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist') + '/',
        filename: '${name}.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }]
    }
};
