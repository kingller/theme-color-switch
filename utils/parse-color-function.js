var Color = require('./tree/color.js');
var Dimension = require('./tree/dimension.js');
var colors = require('./data/colors.js');

function parseDimension(value) {
    if (value instanceof Dimension) {
        return value;
    } else if (typeof value === 'string') {
        var unit;
        var matchs = value.match(/[^\d\.]*$/);
        if (matchs && matchs.length > 0 && matchs[0]) {
            unit = matchs[0];
        }
        return new Dimension(value, unit);
    }
    return new Dimension(value);
}

function parseParams(value, type) {
    if (typeof value === 'undefined') {
        return value;
    }
    if (type === 'color') {
        if (!(value instanceof Color)) {
            return new Color(value);
        }
    } else if (type === 'dimension') {
        return parseDimension(value);
    }
    return value;
}

function parseColorFunction(colorFunction, params, funcName) {
    var newParams = [];
    if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
            var curParam = params[i];
            if (colors[curParam]) {
                curParam = colors[curParam];
            }
            newParams.push(curParam);
        }
    }
    params = newParams;

    if (['rgb', 'rgba', 'hsl', 'hsla', 'hsv', 'hsva'].indexOf(funcName) >= 0) {
        if (params.length > 0) {
            var isColorParam = params[0] instanceof Color;
            var paramsNum = isColorParam ? 1 : 3;
            var hasOpacity = /a$/.test(funcName);
            if (hasOpacity) {
                paramsNum = isColorParam ? 2 : 4;
            }
            paramsNum = Math.min(paramsNum, params.length);
            if (paramsNum <= 2 && !isColorParam && /^rgb/.test(funcName)) {
                params[0] = new Color(params[0]);
            }
            if (paramsNum >= 3 && !isColorParam && /^rgb/.test(funcName)) {
                for (var pIndex = 0; pIndex <= paramsNum - 1; pIndex++) {
                    if (typeof params[pIndex] === 'string') {
                        params[pIndex] = parseDimension(params[pIndex]);
                    }
                }
            } else if (hasOpacity || !(/^rgb/.test(funcName))) {
                var index = paramsNum - 1;
                if (index > 0 && typeof params[index] === 'string') {
                    params[index] = parseDimension(params[index]);
                }
                if (!(/^rgb/.test(funcName))) {
                    for (var num = 1; num < paramsNum - 1; num++) {
                        params[num] = parseDimension(params[num]);
                    }
                }
            }
        }
    } else {
        if (params.length > 0 && !(params[0] instanceof Color)) {
            params[0] = new Color(params[0]);
        }
        if (params.length > 1) {
            for (var j = 1; j < Math.min(params.length, 4); j++) {
                var parseType = '';
                if (j === 1) {
                    parseType = funcName === 'mix' || funcName === 'contrast'? 'color': 'dimension';
                } else if (j === 2) {
                    parseType = funcName === 'mix'? 'dimension': funcName === 'contrast'? 'color': '';
                } else if (j === 3 && funcName === 'contrast') {
                    parseType = 'dimension';
                }
                params[j] = parseParams(params[j], parseType);
            }
        }
    }
    return colorFunction.apply(null, params);
}

module.exports = parseColorFunction;