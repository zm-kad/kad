var kad;
(function (kad) {
    "use strict";

    var g = window, doc = document;

    kad.merge = function (dest, src, deep) {
        for (var prop in src) {
            dest[prop] = src[prop];
        }

        return dest;
    };
})(kad || (kad = {}));
