function replaceKnownValue (varJs, knownVarJs, unknownVarJs) {
    if(!knownVarJs || !Object.keys(knownVarJs).length) {
        return;
    }
    Object.keys(knownVarJs).forEach(function (varName) {
        var varValue = knownVarJs[varName];
        Object.keys(unknownVarJs).forEach(function (unKnownVarName) {
            var unKnownValue = unknownVarJs[unKnownVarName];
            unKnownValue = unKnownValue.replace(new RegExp(varName + '(,|;|\\s|\\)|\\n|$)', 'g'), varValue + '$1');
            if (!/@/.test(unKnownValue)) {
                knownVarJs[unKnownVarName] = unKnownValue;
                varJs[unKnownVarName] = unKnownValue;
                delete unknownVarJs[unKnownVarName];
            }
        });
        delete knownVarJs[varName];
    });
    replaceKnownValue(varJs, knownVarJs, unknownVarJs);
}

function setVarColor(varJs) {
    if (!varJs) {
        return varJs;
    }
    var knownVarJs = {};
    var unknownVarJs = {};
    Object.keys(varJs).forEach(function (varName) {
        var curVarValue = varJs[varName];
        if (/@/.test(curVarValue)) {
            unknownVarJs[varName] = curVarValue;
        } else {
            knownVarJs[varName] = curVarValue;
        }
    });
    replaceKnownValue(varJs, knownVarJs, unknownVarJs);
    return varJs;
};

module.exports = setVarColor;