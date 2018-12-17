var Color = require('./tree/color.js');
var Dimension = require('./tree/dimension.js');
var colors = require('./data/colors.js');

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
            if (/a$/.test(funcName)) {
                paramsNum = isColorParam ? 2 : 4;
            }
            paramsNum = Math.min(paramsNum, params.length);
            for (var num = 0; num < paramsNum; num++) {
                if ((num !== 0 || !isColorParam) && typeof params[num] === 'string') {
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
                if (!(params[1] instanceof Dimension)) {
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

module.exports = parseColorFunction;