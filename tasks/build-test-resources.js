module.exports = function (grunt) {
    'use strict';

    var listFiles = require('../utils/listFiles.js');
    var path = require('path');

    grunt.registerTask('build_test_resources', function () {
        this.requiresConfig(this.name);
        var config = grunt.config(this.name);

        grunt.verbose.writeln(JSON.stringify(config, null, 4));
        var sources = listFiles(
            grunt,
            config.include,
            config.exclude,
            config.base
        );

        grunt.log.writeln(process.cwd());
        var target = path.join(process.cwd(), config.target).replace(/\\/g,"/");

        grunt.log.write('Creating '+sources.length+' files in '+target+'...');
        var indicateInterval = sources.length / 20;

        sources.forEach(function (src,index) {
            grunt.file.write(path.join(target,src), src);
            if (index%indicateInterval === 0) {
                grunt.log.notverbose.write('.');
            }

        });
        grunt.log.notverbose.ok();
    });
}