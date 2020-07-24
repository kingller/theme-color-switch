'use strict';

var render = require('./utils/render.js');
var colorFunctions = require('./utils/color.js');
var parseColorFunction = require('./utils/parse-color-function.js');
var Color = require('./utils/tree/color');

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
        if (/^rgba?/.test(value)) {
            var funcName = 'rgb';
            if (/^rgba/.test(value)) {
                funcName = 'rgba';
            }
            return exportObj[funcName].apply(null, value.match(/(\d+\.*\d*|\d*\.*\d+)/g));
        }
    }
    return new Color(value);
};

module.exports = exportObj;
