'use strict';
var fnvHash = require('../../utils/fnvHash.js');
var fs = require('fs');
var _ = require('grunt').utils._;

describe('fnvHash', function () {
    var rawInput = fs.readFileSync('test/resources/longText.txt', 'utf8');
    var inputs = _.union(
        rawInput.split("\n"),
        rawInput.split(" "),
        rawInput.split("."),
        rawInput.split("+"),
        rawInput.split(":"),
        rawInput.split("#"),
        rawInput.split("a"),
        rawInput.split("b"),
        rawInput.split("c"),
        rawInput.split("d"),
        rawInput.split("e"),
        rawInput.split("f"),
        rawInput.split("g"),
        rawInput.split("h"),
        rawInput.split("i"),
        rawInput.split("k"),
        rawInput.split("l"),
        rawInput.split("x")
    )
    var outputs = inputs.map(function (line) {
        return fnvHash(line);
    });


    describe('for ' + inputs.length + ' unique inputs of variant length', function () {
        it('should return a unique hash for each input', function () {
            var compacted = _.compact(outputs);

            expect(compacted).toEqual(outputs);
        });

        it('should return hash strings of 1-4 characters', function () {
            expect(outputs).toHaveEntriesWithLengthInRange(1,4);
        });

    })
});

describe('reduceHash', function () {
    it('should xor the high binary digits with the low ones. high being digits over the reduced size', function () {
        // high digits: left 16 bits = 0xffff
        // low digits: right 16 bits = 0xffff
        // 0xffff ^ 0xffff = 0
        // a 16 bit integer with 1's at the left 8 bits,
        // that's because 1^1 = 0, and the high digits (16 bits, all 1) are xored with the right digits (16 bits, all 1)
        expect(fnvHash.reduceHash(0xffffffff, 16).toString(16)).toBe('0');

        // high digits: left 20 bits (default value) = 0xfffff
        // low digits: right 12 bits =   0xfff
        // 0xfffff ^ 0xfff = 0xff000 (a 20 bit integer with 1's at the left 8 bits , since 20<the left bits of 32>-12<the rest>=8 and 1^1 = 0)
        expect(fnvHash.reduceHash(0xffffffff,20).toString(16)).toBe('ff000');

        // high digits: left 28 bits = 0xfffffff
        // low digits: right 4 bits = 0xf
        // 0xfffffff ^ 0xf0 = 0xffffff0   (a 20 bit integer with 1's at the left 24 bits , since 20-12=8 and 1^1 = 0)
        expect(fnvHash.reduceHash(0xffffffff, 28).toString(16)).toBe('ffffff0');
    });
});
