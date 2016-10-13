#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
var program = require('commander');
var template = require('lodash.template');
var fse = require('fs-extra');
var camelCase = require('camel-case')
var path = require('path');
var github = require('github-download');

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

var generateCommponent = function (name, options) {
    // create dest directory
    var dest = path.resolve('./' + name);
    fse.mkdirsSync(dest);
    console.log('Directory ' + dest + ' create success!');
    // get repo url
    var repo = '';
    if (options.next) {
        repo = 'https://github.com/lakb248/vue-component-seed.git#vue2';
    } else {
        repo = 'https://github.com/lakb248/vue-component-seed.git';
    }
    // get port
    var port = 8888;
    if (options.port && !isNaN(+options.port)) {
        port = options.port;
    }
    console.log('Download from ' + repo + '...');
    // download project from github
    github(repo, dest)
        .on('end', function () {
            console.log('Download complete!');
            // replace component name and port
            replaceList.forEach(function (file) {
                var data = fse.readFileSync(dest + '/' + file);
                var content = template(data)({
                    name: name,
                    bigName: camelCase(name),
                    port: port
                });
                fse.writeFileSync(dest + '/' + file, content, {flag : 'w'});
                console.log('Generate ' + file + ' success!');
            });
            // rename component file
            renameList.forEach(function (file) {
                var newFile = file.replace('vue-component', name);
                fse.rename(dest + '/' + file, dest + '/' + newFile);
                console.log(newFile + ' create success!');
            });
        });
};

// cli
program
    .arguments('<name>')
    .version('0.0.1')
    .option('-n, --next', 'Use vue2.0')
    .option('-p, --port <port>', 'The port will be used by webpack-dev-server, default to 8888')
    .action(generateCommponent);
program.parse(process.argv);
