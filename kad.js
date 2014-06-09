﻿var kad;
(function (kad) {
    "use strict";

    var g = window, doc = document;

    var types = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regexp",
        "[object Object]": "object",
        "[object Error]": "error"
    };

    kad.type = function (obj) {
        if (typeof obj === "undefined")
            return "undefined";

        if (typeof obj === null)
            return "null";

        if (typeof obj === "object" || typeof obj === "function")
            return types[Object.prototype.toString.call(obj)] || "object";

        return typeof obj;
    };

    kad.merge = function (dest, src, deep) {
        if (kad.type(dest) === "object" && kad.type(src) === "object") {
            for (var prop in src) {
                if (deep && kad.type(dest[prop]) === "object" && kad.type(src[prop]) === "object") {
                    dest[prop] = kad.merge(dest[prop], src[prop], deep);
                } else {
                    dest[prop] = src[prop];
                }
            }
        }

        return dest;
    };

    kad.extend = function () {
        var first = arguments[0], len = arguments.length, isFirstBoolean = (kad.type(first) === "boolean"), deep = false, start = 1, dest = first || {};

        if (isFirstBoolean) {
            deep = first;
            start = 2;
            dest = arguments[1] || {};
        }

        if (len === start) {
            dest = kad;
            start--;
        }

        for (; start < len; start++) {
            var src = arguments[start];

            if (src) {
                kad.merge(dest, src, deep);
            }
        }

        return dest;
    };

    kad.each = function (obj, callback) {
        if (kad.type(obj) === "object") {
            for (var i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        }
    };

    kad.extend({
        version: 0.1,
        prefix: "zm-",
        noop: function () {
        }
    });
})(kad || (kad = {}));