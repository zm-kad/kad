/**
 * Copyright 2014 MWC & ZENGMENG
 * https://github.com/zm-kad/kad
 * 
 * kad.js v0.1 - 2014/6/1
 * 
 * Released under the MIT license.
 */

( ( g, doc, undefined?) =>
{
    if ( g.kad && g.kad.mwc_zm )
        return;

    var kd: any = g.kad = { mwc_zm: 1 };

    // 扩展指定对象
    kd.mix = ( dest: Object, src: Object, deep?: boolean ) =>
    {

    };

})( window, document );