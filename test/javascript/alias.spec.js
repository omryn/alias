'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('grunt').utils._;
var expandFiles = require('grunt').file.expandFiles;
require('./matchers/jasmine-matchers.js');

function getIncludedFiles() {
    var cwd = process.cwd();
    process.chdir('test/resources/mockSources/');
    var includedFiles = expandFiles('**/*').map(function (path) {
        return path.replace(/\\/g, "/"); // windows paths
    }).sort();
    process.chdir(cwd);

    return includedFiles;
}

function fileContent(baseDir) {
    return function (filePath) {
        return fs.readFileSync(path.join(baseDir, filePath), 'utf8');
    }
}

describe('alias grunt task', function () {
    var includedFiles = getIncludedFiles();
    var hashedFilesWithOriginalPathAsContent = expandFiles('target/test/hashed/*');

    describe('the included files', function () {
        it('there should be over 1000 files to play with', function () {
            expect(includedFiles.length).toBeGreaterThan(100);
        });

        it('each file\'s content should be its path relative to test/resources/mockSources/', function () {
            var content = includedFiles.map(fileContent('test/resources/mockSources/'));

            expect(includedFiles).toEqual(content);
        });
    })


    it('should create a hashed path for each file in resources/mockSources', function () {
        var originalPaths = hashedFilesWithOriginalPathAsContent.map(fileContent('')).sort();

        expect(originalPaths).toEqual(includedFiles);
    });

});