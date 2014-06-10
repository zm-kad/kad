var kad;
(function (kad) {
    "use strict";
})(kad || (kad = {}));
var kad;
(function (kad) {
    "use strict";

    var g = window, doc = document, _toString = Object.prototype.toString, _trim = String.prototype.trim, _regexp_trim = /^[\s\u3000\uFEFF\xA0]+|[\s\u3000\uFEFF\xA0]+$/g, _regexp_trim_start = /^[\s\u3000\uFEFF\xA0]+/, _regexp_trim_end = /[\s\u3000\uFEFF\xA0]+$/;

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
            return types[_toString.call(obj)] || "object";

        return typeof obj;
    };

    kad.merge = function (dest, src, deep) {
        if (kad.type(dest) === "object" && kad.type(src) === "object") {
            for (var prop in src) {
                if (src.hasOwnProperty(prop)) {
                    if (deep && kad.type(dest[prop]) === "object" && kad.type(src[prop]) === "object") {
                        dest[prop] = kad.merge(dest[prop], src[prop], deep);
                    } else {
                        dest[prop] = src[prop];
                    }
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
                if (obj.hasOwnProperty(i) && callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        }
    };

    kad.trim = function (text) {
        if (text == null)
            return "";

        return _trim ? _trim.call(text) : text.replace(_regexp_trim, "");
    };

    kad.trimStart = function (text) {
        if (text == null)
            return "";

        return text.replace(_regexp_trim_start, "");
    };

    kad.trimEnd = function (text) {
        if (text == null)
            return "";

        return text.replace(_regexp_trim_end, "");
    };

    kad.extend({
        version: 0.1,
        prefix: "zm-",
        noop: function () {
        }
    });
})(kad || (kad = {}));
