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

describe('alias grunt task', function () {
    var includedFiles = getIncludedFiles();
    var hashedFilesWithOriginalPathAsContent = expandFiles('target/test/hashed/*');

    function fileContent(baseDir) {
        return function (filePath) {
            var value =  fs.readFileSync(path.join(baseDir, filePath), 'utf8');
            if (typeof value !== 'string') {
                throw new Error('Wierd');
            }
            return value;
        }
    }


    describe('the included files', function () {
        it('there should be over 1000 files to play with', function () {
            expect(includedFiles.length).toBeGreaterThan(100);
        });
        it('should each contain its path relative to test/resources/mockSources/', function () {
            var content = includedFiles.map(fileContent('test/resources/mockSources/'));

            expect(includedFiles).toEqual(content);
        });
    })


    it('should create a hashed path for each file in resources/mockSources', function () {
        var originalPaths = hashedFilesWithOriginalPathAsContent.map(fileContent('')).sort();

        expect(originalPaths).toEqual(includedFiles);
    });

});