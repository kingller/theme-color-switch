var utils = {
    copyArray: function(arr) {
        var i, length = arr.length,
            copy = new Array(length);

        for (i = 0; i < length; i++) {
            copy[i] = arr[i];
        }
        return copy;
    }
};

module.exports = utils;