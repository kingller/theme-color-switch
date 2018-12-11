var parserInput = require('./parser/parser-function.js');
var Color = require('./tree/color.js');
var Dimension = require('./tree/dimension.js');
var colorFunctions = require('./color.js');
var colors = require('./data/colors.js');

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
                c = c.trim();
                if (colors[c]) {
                    c = colors[c];
                }
                newParams.push(c.trim());
            });
        } else if (typeof curParam === 'object' && curParam.type === 'function') {
            newParams.push(curParam.value);
        } else {
            newParams.push(curParam);
        }
    }
    params = newParams;
    if (['rgb', 'rgba', 'hsl', 'hsla', 'hsv', 'hsva'].indexOf(funcName) >= 0) {
        if (params.length > 0) {
            var isColorParam = params[0] instanceof Color;
            var paramsNum = isColorParam? 1: 3;
            if (/a$/.test(funcName)) {
                paramsNum = isColorParam? 2: 4;
            }
            paramsNum = Math.min(paramsNum, params.length);
            for (var num = 0; num < paramsNum; num++) {
                if (num !== 0 || !isColorParam) {
                    params[num] = parseFloat(params[num]);
                }
            }
        }
    } else {
        if (params.length > 0 && !(params[0] instanceof Color)) {
            params[0] = new Color(params[0]);
        }
        if (params.length > 1) {
            if (funcName === 'mix') {
                if (!(params[1] instanceof Color)) {
                    params[1] = new Color(params[1]);
                }
            } else {
                if(!(params[1] instanceof Dimension)) {
                    params[1] = new Dimension(params[1]);
                }
            }
        }
        if (funcName === 'mix' && params.length > 2 && !(params[2] instanceof Dimension)) {
            params[2] = new Dimension(params[2]);
        }
    }
    return colorFunction.apply(null, params);
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