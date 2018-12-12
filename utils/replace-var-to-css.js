function replaceVar(input, varJs) {
    if (!input || !varJs) {
        return input;
    }
    // remove variables
    input = input.replace(/(^|\n)\s*(@([^:;\}\n]*):[^;\}\n]*;*)/g, '');
    input = input.replace(/([;|\}]\s*)(@([^:;\}\n]*):[^;\}\n]*;*)/g, '$1');

    // repalce variables
    Object.keys(varJs).reverse().forEach(function (varName) {
        input = input.replace(new RegExp(varName + '(\\s|;|,|\\)|\\}|\\n|$)', 'g'), varJs[varName] + '$1');
    });

    return input;
};

module.exports = replaceVar;