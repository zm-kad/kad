/**
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
            for ( var prop in src )
            {
                if ( deep )
                {
                    dest[prop] = merge( dest[prop], src[prop], deep );
                }

                dest[prop] = src[prop];
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
            if ( arguments.length === 1 )
            {
                return merge( kad, arguments[0] );
            }
        }
}