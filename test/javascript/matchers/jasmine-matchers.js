'use strict';
beforeEach(function () {
    this.addMatchers(
        {
            toEqual: function (expected) {
                var messages = '';
                var visitedObjects = [];

                function addMismatch(messagePrefix, message) {
                    messagePrefix = messagePrefix || '';
                    messages = messages + messagePrefix + ": " + message + '\n';
                    return false;
                }

                function isEqual(actual, expected, messagePrefix) {
                    if (typeof actual !== typeof expected) {
                        return addMismatch(messagePrefix, "type mismatch: actual is " + typeof actual + " expected " + typeof expected);
                    }
                    if (actual instanceof Array) {
                        if (!(expected instanceof Array)) {
                            return addMismatch(messagePrefix, "type mismatch: actual is Array, expected other type");
                        }
                        return isEqualArray(actual, expected, messagePrefix);
                    }
                    if (typeof actual === 'object') {
                        return isEqualObject(actual, expected, messagePrefix);
                    }
                    if (actual !== expected) {
                        return addMismatch(messagePrefix, 'value mismatch: actual is "' + actual + '", expected: "' + expected + '"');
                    }
                    return true;
                }

                function preventLoops(actual) {
                    if (visitedObjects.indexOf(actual) >= 0) {
                        return true;
                    } else {
                        visitedObjects.push(actual);
                    }
                }

                function isEqualArray(actual, expected, messagePrefix) {
                    if (preventLoops(actual)) {
                        return true;
                    }

                    if (actual.length !== expected.length) {
                        return addMismatch(messagePrefix,
                            "array size mismatch: actual length is " + actual.length + ", expected length: " + expected.length
                        );
                    }
                    var pass = true;
                    actual.forEach(function (item, index) {
                        pass = pass && isEqual(actual[index], expected[index], messagePrefix + '[' + index + ']');
                    });
                    return pass;
                }

                function isKeysMatching(actual, expected, messagePrefix) {
                    var pass = true;
                    var aKeys = Object.keys(actual);
                    var bKeys = Object.keys(expected);
                    aKeys.forEach(function (key) {
                        if (bKeys.indexOf(key) === -1) {
                            addMismatch(messagePrefix, 'key mismatch: "' + key + '" is missing from expected');
                            pass = false;
                        }
                    });
                    bKeys.forEach(function (key) {
                        if (aKeys.indexOf(key) === -1) {
                            addMismatch(messagePrefix, 'key mismatch: "' + key + '" is missing from actual');
                            pass = false;
                        }
                    });
                    return pass;
                }

                function isEqualObject(actual, expected, messagePrefix) {
                    if (preventLoops(actual)) {
                        return true;
                    }

                    if (!isKeysMatching(actual, expected, messagePrefix)){
                         return false;
                    }

                    var keys = Object.keys(actual);
                    var pass = true;
                    keys.forEach(function (key) {
                        pass = pass && isEqual(actual[key], expected[key], messagePrefix + '.' + key);
                    });
                    return pass;
                }

                this.message = function () {
                    return messages;
                };
                return isEqual(this.actual, expected, '{root}');
            },

            toHaveEntriesWithLengthInRange: function(min, max){
                var self=this;
                return this.actual.every(function(item, index){
                    if (item.length >= min && item.length <=max) {
                        return true;
                    } else {
                        self.message = function(){
                            return 'Item out of range: ['+index+'] = '+item+' (length: '+item.length+')';
                        }
                    }
                })
            }

        }
    );
});
