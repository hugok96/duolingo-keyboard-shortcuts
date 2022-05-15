// ==UserScript==
// @name         Duolingo keyboard shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Use the CTRL+ALT+NUMPAD_1 and NUMPAD_2 key combos to automaticaly replay a phrase, NUMPAD_3 to speak
// @author       hugomgwtf
// @match        https://www.duolingo.com/*
// @icon         https://www.google.com/s2/favicons?domain=duolingo.com
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    jQuery(document).on('keydown', function(e){
        if(e.ctrlKey !== true || e.altKey !== true) return;

        switch(e.keyCode) {
            case 97: // NUM 1
                jQuery('[data-test="challenge challenge-listenTap"] button, [data-test*="challenge"] button').eq(0).click();
                break;
            case 98: // NUM 2
                jQuery('[data-test="challenge challenge-listenTap"] button, [data-test*="challenge"] button').eq(1).click();
                break;;
            case 99: // NUM 3
                jQuery('[data-test*="challenge"] button, [data-test*="challenge"] button').eq(0).click();
                break;
            default:
                return;
        }

        e.preventDefault();
        if(e.stopPropagation !== undefined)
            e.stopPropagation();
        return false;
    });
})();