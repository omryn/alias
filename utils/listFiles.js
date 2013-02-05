module.exports = function (grunt, include, exclude, base) {
    'use strict';
    var path = require('path');
    var fs = require('fs');
    var _ = require('grunt').utils._;

    function getFiles(pathsArray) {
        pathsArray = pathsArray || [];
        return _.flatten(
            pathsArray.map(function (pathWithWildCards) {
                grunt.verbose.writeln('Listing files in '+pathWithWildCards);
                grunt.log.notverbose.write('.');
                return grunt.file.expandFiles(pathWithWildCards);
            }));
    }

    var gruntBase = process.cwd();
    grunt.file.setBase(base);

    grunt.log.notverbose.write('Listing files...');
    grunt.verbose.writeln('Listing included files')
    var includedFiles = getFiles(include);
    grunt.verbose.writeln('Listing excluded files')
    var excludedFiles = getFiles(exclude);
    var sources = _.chain(includedFiles)
        .difference(excludedFiles)
        .map(function (file) {
            return file.replace(/\\/g, "/");
        }).value();
    grunt.log.notverbose.ok();
    grunt.verbose.ok(sources.length + " files listed");

    grunt.file.setBase(gruntBase);
    return sources;
}