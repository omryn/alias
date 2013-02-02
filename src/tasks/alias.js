var path = require('path');
var hash = require('../utils/FNV.js');

module.exports = function (grunt) {
    'use strict';
    var listFiles = require('../utils/listFiles.js');

    function createAliases(base, sources, target) {
        sources.forEach(function (src) {
            grunt.file.copy(
                path.join(base, src),
                path.join(target, hash(src, 30)));
        });
    }

    grunt.registerMultiTask('alias', 'generate file aliases', function () {
        var sources = listFiles(
            grunt,
            this.data.include,
            this.data.exclude,
            this.data.base
        );

        createAliases(this.data.base, sources, this.data.target);
    })
}