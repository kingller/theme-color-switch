'use strict';

var render = require('./utils/render.js');
var colorFunctions = require('./utils/color.js');
var parseColorFunction = require('./utils/parse-color-function.js');

var exportObj = {
    render: render
};

Object.keys(colorFunctions).forEach(function (funcName) {
    exportObj[funcName] = function () {
        return parseColorFunction(colorFunctions[funcName], arguments, funcName);
    }
});

module.exports = exportObj;
