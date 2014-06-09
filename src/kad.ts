﻿/**
 * Copyright 2014 MWC & ZENGMENG
 * https://github.com/zm-kad/kad
 * 
 * kad.js v0.1 - 2014/6/1
 * 
 * Released under the MIT license.
 */

module kad
{
    "use strict";

    var g = window,
        doc = document;

    // 类型字符串映射
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

    export var type =
        /**
         * 获得指定对象的类型
         * 
         * @param obj 指定获取类型的对象
         */
        ( obj: any ): string =>
        {
            if ( typeof obj === "undefined" )
                return "undefined";

            if ( typeof obj === null )
                return "null";

            if ( typeof obj === "object" || typeof obj === "function" )
                return types[Object.prototype.toString.call( obj )] || "object";

            return typeof obj;
        }
    
    export var merge =
        /**
         * 将 src 对象合并到 dest 中，合并后返回 dest 对象。
         * 
         * @param dest  目标对象，将作为返回结果。
         * @param src   合并源
         * @param deep  [可选] 是否进行深拷贝
         */
        ( dest: Object, src: Object, deep?: boolean ) =>
        {
            if ( type( dest ) === "object" && type( src ) === "object" )
            {
                for ( var prop in src )
                {
                    if ( deep && type( dest[prop] ) === "object" && type( src[prop] ) === "object" )
                    {
                        dest[prop] = merge( dest[prop], src[prop], deep );
                    }
                    else
                    {
                        dest[prop] = src[prop];
                    }
                }
            }

            return dest;
        }

    export var extend: {
        /**
         * 扩展指定对象，将从右向左扩展，支持同时给出多个对象
         * 
         * @param args 指定要扩展的对象，从右向左合并，若仅提供一个对象，则扩展 kad 自身
         */
        ( ...args: Object[] ): Object;

        /**
         * 扩展指定对象，将从右向左扩展，支持同时给出多个对象
         * 
         * @param deep 是否进行深拷贝
         * @param args 指定要扩展的对象，从右向左合并，若仅提供一个对象，则扩展 kad 自身
         */
        ( deep: boolean, ...args: Object[] ): Object;
    } = () =>
        {
            var first = arguments[0],       // 获得首个参数
                len = arguments.length,     // 参数总数
                isFirstBoolean = ( type( first ) === "boolean" ),   // 首个参数是否为布尔值
                deep = false,               // 是否进行深拷贝
                start = 1,                  // 开始位置
                dest = first || {};       // 合并目标

            if ( isFirstBoolean )
            {
                deep = first;
                start = 2;
                dest = arguments[1] || {};
            }

            // 若仅有一个参数，则使该参数的对象扩展 kad 自身；
            // 或有两个参数，第一个是布尔值 (判断是否深拷贝)，则使用第二个参数扩展 kad 自身。
            if ( len === start )
            {
                dest = kad;
                start--;
            }

            for ( ; start < len; start++ )
            {
                var src = arguments[start];

                if ( src )
                {
                    merge( dest, src, deep );
                }
            }

            return dest;
        }

    export var each =
        /**
         * 遍历指定对象，当回调返回 false 将停止遍历。
         * 
         * @param obj       遍历的指定对象的每个元素。若 obj 为对象，则遍历所有属性；若为数组，则遍历每个元素。
         * @param callback  每次遍历的回调
         */
        ( obj: Object, callback: ( index: number, element: any ) => any ) =>
        {
            if ( type( obj ) === "object" )
            {
                for ( var i in obj )
                {
                    if ( callback.call( obj[i], i, obj[i] ) === false )
                    {
                        break;
                    }
                }
            }
        }

    extend( {
        version: 0.1,
        prefix: "zm-",
        noop: () => { }
    });

}