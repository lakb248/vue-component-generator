#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
var program = require('commander');
var template = require('lodash.template');
var fse = require('fs-extra');
var camelCase = require('camel-case')
var path = require('path');

var replaceList = [
    'src/index.js',
    'src/vue-component.vue',
    'test/vue-component.spec.js',
    'package.json',
    'webpack.base.config.js',
    'webpack.prod.config.js',
    'README.md'
];
var dest = path.resolve('.');
var source = __dirname + '/template';

var generateCommponent = function (name) {
    fse.copy(source, dest, function (err) {
        if (err) return console.error(err)
        console.log("Copy from template success!");
        replaceList.forEach(function (file) {
            fse.readFile(source + '/' + file, function (err, data) {
                var content = template(data)({
                    name: name,
                    bigName: camelCase(name)
                });
                fse.writeFile(dest + '/' + file, content, {flag : 'w'}, function (err) {
                    if (err != null) {
                        console.log(err);
                    } else {
                        console.log('generate ' + file + ' success!');
                    }
                });
            });
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
