var calcColorValue = require('./calc-color-function.js');

function calcVarColor(varJs) {
    if (!varJs) {
        return varJs;
    }
    Object.keys(varJs).forEach(function (varName) {
        var curVarValue = varJs[varName];
        varJs[varName] = calcColorValue(curVarValue);
    });
    return varJs;
}

module.exports = calcVarColor;
