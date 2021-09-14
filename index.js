'use strict';

var render = require('./utils/render.js');
var colorFunctions = require('./utils/color.js');
var parseColorFunction = require('./utils/parse-color-function.js');
var Color = require('./utils/tree/color.js');
var calcColorValue = require('./utils/calc-color-function.js');

var exportObj = {
    render: render,
};

Object.keys(colorFunctions).forEach(function (funcName) {
    exportObj[funcName] = function () {
        return parseColorFunction(colorFunctions[funcName], arguments, funcName);
    };
});

exportObj.color = function (value) {
    if (value instanceof Color) {
        return value;
    }
    if (value && typeof value === 'string') {
        value = calcColorValue(value);
    }
    if (value && typeof value === 'string') {
        var funcNameMatches = value.match(/^\s*([a-zA-Z]+?)\((.+)\)/);
        if (funcNameMatches) {
            var funcName = funcNameMatches[1];
            if (exportObj[funcName]) {
                return exportObj[funcName].apply(null, funcNameMatches[2].split(','));
            }
        }
    }
    return new Color(value);
};

module.exports = exportObj;
