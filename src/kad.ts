/**
 * Copyright 2014 MWC & ZENGMENG
 * https://github.com/zm-kad/kad
 * 
 * kad.js v0.1 - 2014/6/1
 * 
 * Released under the MIT license.
 */

( ( g, doc: Document, undefined?) =>
{
    if ( g.kad && g.kad.zmwc )
        return;

    var kd: any = g.kad = { zmwc: 1 };
    
    // 扩展指定对象
    kd.mix = ( dest: Object, src: Object, deep?: boolean ) =>
    {
        for ( var item in src )
        {
            dest[item] = src[item];
        }

        return dest;
    };

})( window, document );