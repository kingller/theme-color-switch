function varsToJs(sheet) {
    var lessVars = {};
    var matches = sheet.match(/(^|\n|;|})\s*(@(.*):[^;\}\n]*)/g) || [];

    matches.forEach(function (variable) {
        variable = variable.match(/^[^@]*(@.*)/)[1];
        var definition = variable.split(/:\s*/);
        var value = definition.splice(1).join(':');
        value = value.trim().replace(/^["'](.*)["']$/, '$1');
        lessVars[definition[0].replace(/['"]+/g, '').trim()] = value;
    });

    return lessVars;
};

module.exports = varsToJs;