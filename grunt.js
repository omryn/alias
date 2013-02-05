module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        lint: {
            all: [
                'grunt.js',
                'src/**/*.js',
                'test/javascript/**/*.js'
            ]
        },

        jshint: '<json:jshint.json>',

        jasmine_node: {
            specNameMatcher: "spec",
            projectRoot: "test/javascript",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath: "./build/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            }
        },

        clean: {
            test: "target"
        },

        'build_test_resources': {
            include: ['*/src/**/*.js'],
            exclude: [],
            base: '../',
            target: 'test/resources/mockSources/'
        },
        alias: {
            mock: {
                include: ['**/*'],
                exclude: [],
                base: 'test/resources/mockSources/',
                target: 'target/test/hashed/'
            }
        }

    });

    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-clean');

// Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

// By default, lint and run all tests.
    grunt.registerTask('default', ['clean', 'lint', 'alias', 'jasmine_node']);
    grunt.registerTask('build-test-resources', 'build_test_resources');
};
