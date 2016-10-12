#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
var program = require('commander');
var template = require('lodash.template');
var fse = require('fs-extra');
var camelCase = require('camel-case')
var path = require('path');

var github = require('github-download');


var source = __dirname + '/template';

var replaceList = [
    'src/index.js',
    'src/vue-component.vue',
    'test/vue-component.spec.js',
    'index.html',
    'index.js',
    'package.json',
    'webpack.base.config.js',
    'webpack.prod.config.js',
    'README.md'
];
var renameList = [
    'src/vue-component.vue',
    'test/vue-component.spec.js'
];

var generateCommponent = function (name) {
    var dest = path.resolve('./' + name);
    fse.mkdirsSync(dest);
    console.log('Directory ' + dest + ' create success!');
    console.log('Download from https://github.com/lakb248/vue-component-seed.git...');
    github('https://github.com/lakb248/vue-component-seed.git', dest)
        .on('end', function () {
            console.log('Download complete!');
            replaceList.forEach(function (file) {
                var data = fse.readFileSync(dest + '/' + file);
                var content = template(data)({
                    name: name,
                    bigName: camelCase(name)
                });
                fse.writeFileSync(dest + '/' + file, content, {flag : 'w'});
                console.log('Generate ' + file + ' success!');
            });
            renameList.forEach(function (file) {
                var newFile = file.replace('vue-component', name);
                fse.rename(dest + '/' + file, dest + '/' + newFile);
                console.log(newFile + ' create success!');
            });
        });
};

program
    .arguments('<name>')
    .version('0.0.1')
    .action(function(name) {
        generateCommponent(name);
    })
    .parse(process.argv);
//
// var github = require('github-download');
//
// github('https://github.com/lakb248/vue-component-seed.git', './github')
//     .on('dir', function (dir) {
//         console.log(dir);
//     })
//     .on('file', function (file) {
//         console.log(file);
//     })
//     .on('zip', function(zipUrl) { //only emitted if Github API limit is reached and the zip file is downloaded
//         console.log(zipUrl)
//     })
//     .on('error', function(err) {
//         console.error(err)
//     })
//     .on('end', function() {
//         console.log('end');
//     });
