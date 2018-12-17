var parserInput = require('./parser/parser-function.js');
var Color = require('./tree/color.js');
var colorFunctions = require('./color.js');
var parseColorFunction = require('./parse-color-function.js');

function dealColorParams(colorFunction, params, funcName) {
    if(typeof params === 'string') {
        params = params.split(',');
    }
    var newParams = [];
    for (var i = 0; i < params.length; i++) {
        var curParam = params[i];
        if (typeof curParam === 'string') {
            curParam = curParam.trim().replace(/^,/, '').replace(/,$/, '');
            curParam = curParam.split(',');
            curParam.forEach(function (c) {
                newParams.push(c.trim());
            });
        } else if (typeof curParam === 'object' && curParam.type === 'function') {
            newParams.push(curParam.value);
        } else {
            newParams.push(curParam);
        }
    }
    return parseColorFunction(colorFunction, newParams, funcName);
}

function convertParams(params, covertColor) {
    if (Array.isArray(params)) {
        var str = '';
        params.forEach(function (p) {
            if (p instanceof Color) {
                str += p.toCSS();
            } else if (typeof p === 'object') {
                str += p.value;
            } else {
                str += p;
            }
        });
        return str;
    }
    return '';
}

function fixValues(node, values) {
    if(!node) {
        return;
    }
    if (node.name) {
        if (node.start) {
            values.push(node.start);
        }
        if (colorFunctions[node.name]) {
            node.function = dealColorParams(colorFunctions[node.name], node.params, node.name);
            values.push(node.function);
        } else {
            node.function = node.name + '(' + convertParams(node.params) + ')';
            values.push({
                value: node.function,
                type: 'function'
            });
        }
        if (node.end) {
            values.push(node.end);
        }
    } else {
        if (node.start || node.params) {
            node.start && values.push(node.start);
            values.push('(');
            node.params && values.push(node.params);
            values.push(')');
        }
        if (node.end) {
            values.push(node.end);
        }
    }
}

function calcColor(treeNodes) {
    if (!treeNodes) {
        return '';
    }
    var values = [];
    treeNodes.forEach(function(node) {
        recursionCalcColor(node, node.children);
        fixValues(node, values);
    });
    return convertParams(values);
}

function recursionCalcColor(parantNode, treeNodes) {
    if (!treeNodes) {
        return '';
    }
    var values = [];
    treeNodes.forEach(function(node) {
        if (node.children && node.children.length >= 0) {
            recursionCalcColor(node, node.children);
        }
        fixValues(node, values);
    });
    parantNode.params = values;
}

function calcVarColor(varJs) {
    if (!varJs) {
        return varJs;
    }
    Object.keys(varJs).forEach(function (varName) {
        var curVarValue = varJs[varName];
        var treeNodes = parserInput(curVarValue);
        varJs[varName] = calcColor(treeNodes);
    });
    return varJs;
};

module.exports = calcVarColor;