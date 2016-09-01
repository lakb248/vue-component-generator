#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
var program = require('commander');
var template = require('lodash.template');
var fse = require('fs-extra');
var camelCase = require('camel-case')
var path = require('path');


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
    fse.copy(source, dest, function (err) {
        if (err) return console.error(err)
        console.log('Copy from template success!');

        replaceList.forEach(function (file) {
            var data = fse.readFileSync(source + '/' + file);
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
