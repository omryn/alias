module.exports = function (grunt, include, exclude, base) {
    'use strict';
    var path = require('path');
    var fs = require('fs');
    var _ = grunt.utils._;

    function getFiles(pathsArray) {
        pathsArray = pathsArray || [];
        return _.flatten(
            pathsArray.map(function (pathWithWildCards) {
                return grunt.file.expandFiles(pathWithWildCards);
            }));
    }

    var gruntBase = grunt.file.userDir();

    grunt.file.setBase(base);
    var includedFiles = getFiles(this.data.include);
    var excludedFiles = getFiles(this.data.exclude);
    var sources = _.chain(includedFiles)
        .difference(excludedFiles)
        .map(function (file) {
            return file.replace(/\\/g, "/");
        }).value();

    grunt.file.setBase(gruntBase);
    return sources;
}