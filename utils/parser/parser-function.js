function generateTreeNodes(input) {
    if (!input || typeof input !== 'string') {
        return null;
    }

    var treeNodes = [];
    var funcStartValue = '';
    var funcParamsValue = '';
    var beginNum = 0;
    var endNum = 0;
    for (var index = 0; index < input.length; index++) {
        var chr = input[index];
        if (chr === '(') {
            if (beginNum) {
                funcParamsValue += chr;
            }
            beginNum++;
        } else if (chr === ')') {
            endNum++;
            if (endNum >= beginNum) {
                var name = '';
                var nameMatchs = funcStartValue.match(/((.*[^a-zA-Z]+)([a-zA-Z]+))|([a-zA-Z]+)$/);
                if (nameMatchs) {
                    if (nameMatchs[3]) {
                        name = nameMatchs[3];
                        funcStartValue = nameMatchs[2];
                    } else if (nameMatchs[4]) {
                        name = nameMatchs[4];
                        funcStartValue = '';
                    }
                }
                treeNodes.push({
                    name: name,
                    start: funcStartValue,
                    params: funcParamsValue,
                    end: ''
                });
                funcStartValue = '';
                funcParamsValue = '';
                beginNum = 0;
                endNum = 0;
            } else {
                if (beginNum) {
                    funcParamsValue += chr;
                }
            }
        } else {
            if (beginNum) {
                funcParamsValue += chr;
            } else {
                funcStartValue += chr;
            }
        }
    }
    if (funcStartValue || funcParamsValue) {
        treeNodes.push({
            name: '',
            start: '',
            params: '',
            end: funcStartValue + (beginNum ? '(' : '') + funcParamsValue
        });
    }
    if (treeNodes.length > 0) {
        treeNodes.forEach(function (node) {
            if (node.params) {
                node.children = generateTreeNodes(node.params);
            }
        });
    }
    return treeNodes;
}

function parser(input) {
    if (!input || typeof input !== 'string') {
        return null;
    }

    return generateTreeNodes(input);
}

module.exports = parser;
