﻿var kad;
(function (kad) {
    "use strict";

    var g = window, doc = document;

    kad.merge = function (dest, src, deep) {
        for (var prop in src) {
            if (deep) {
                dest[prop] = kad.merge(dest[prop], src[prop], deep);
            }

            dest[prop] = src[prop];
        }

        return dest;
    };

    kad.extend = function () {
        if (arguments.length === 1) {
            return kad.merge(kad, arguments[0]);
        }
    };
})(kad || (kad = {}));
