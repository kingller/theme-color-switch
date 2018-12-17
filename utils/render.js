'use strict';

var varsToJs = require('./vars-to-js.js');
var replaceVarColor = require('./replace-color-in-var.js');
var calcColorFunction = require('./calc-color-function.js');
var replaceVarToCss = require('./replace-var-to-css.js');

function render(input, options, callback) {
    if (!callback) {
        return;
    }

    if (!input) {
        callback(null, {css: ''});
        return;
    }

    if (typeof input !== 'string') {
        callback('The first argument must be string');
        return;
    }

    try {
        var varJs = varsToJs(input);
        var modifyVars = {};

        if (options && typeof options === 'object') {
            modifyVars = options.modifyVars || {};
        }

        Object.keys(varJs).forEach(function (varName) {
            if (modifyVars[varName]) {
                varJs[varName] = modifyVars[varName];
            }
        });

        varJs = replaceVarColor(varJs);
        varJs = calcColorFunction(varJs);

        // replace variables
        input = replaceVarToCss(input, varJs);

        callback(null, {
            css: input
        });
    } catch (err) {
        return callback(err);
    }
}

module.exports = render;
