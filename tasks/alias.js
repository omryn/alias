var path = require('path');
var hash = require('../utils/fnvHash.js');

module.exports = function (grunt) {
    'use strict';
    var listFiles = require('../utils/listFiles.js');

    function createAliases(base, sources, target, hashBits) {
        var previouslyHashedPaths = {};
        sources.forEach(function (src) {
            var hashedPath = hash(src, hashBits || 28);
            if (hashedPath in previouslyHashedPaths) {
                throw new Error('Duplicate hashed paths: ' + previouslyHashedPaths[hashedPath] +
                    ' and ' + src + ' have the same path hash (' + hashedPath + ')');
            } else {
                previouslyHashedPaths[hashedPath] = src;
            }

            grunt.file.copy(
                path.join(base, src),
                path.join(target, hashedPath));
        });
    }

    grunt.registerMultiTask('alias', 'generate file aliases', function () {
        var sources = listFiles(
            grunt,
            this.data.include,
            this.data.exclude,
            this.data.base
        );

        createAliases(this.data.base, sources, this.data.target, this.data.hashBits);
    })
}