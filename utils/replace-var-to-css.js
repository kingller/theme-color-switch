function replaceVar(input, varJs) {
    if (!input || !varJs) {
        return input;
    }
    // remove variables
    input = input.replace(/(^|\n)\s*(@([^:;\}\n]*):[^;\}\n]*;*)/g, '');
    input = input.replace(/([;|\}]\s*)(@([^:;\}\n]*):[^;\}\n]*;*)/g, '$1');

    // replace variables
    Object.keys(varJs).reverse().forEach(function (varName) {
        // 碰到 \s ; , ! \ / ) } \n $ 认为变量结束
        input = input.replace(new RegExp(varName + '([\\s;,!\\\\\/\\)\\}\\n|$])', 'g'), varJs[varName] + '$1');
    });

    return input;
};

module.exports = replaceVar;