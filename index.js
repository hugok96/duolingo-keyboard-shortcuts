// ==UserScript==
// @name         Duolingo keyboard shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Use the CTRL+ALT+NUMPAD_1 and NUMPAD_2 key combos to automaticaly replay a phrase, NUMPAD_3 to speak. Hit SHIFT twice to open a quick translation option
// @author       hugomgwtf
// @match        https://www.duolingo.com/*
// @icon         https://www.google.com/s2/favicons?domain=duolingo.com
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    jQuery(document).on('keydown', function(e){
        if(9 === e.keyCode && searchShown) {
			e.preventDefault();
			if(e.stopPropagation !== undefined)
				e.stopPropagation();

            window.open("https://translate.google.com/?sl=auto&op=translate&text=" + encodeURIComponent($('#dks-search-input').val()), '_blank');
            destroySearch();

            return;
        }

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

    let searchBox = '<div id="dks"><div id="dks-search"></div><input id="dks-search-input" type="text" placeholder="enter some text to translate..."><div id="dks-search-hint">hit TAB to open Google Translate, hit ESC to close</div>\
    <style>\
    #dks-search { position: fixed; z-index: 99998; top: 0; left: 0; background: rgba(0,0,0,0.33); width: 100%; height: 100%;}\
    #dks-search-input { position: fixed; z-index: 99999; height: 2rem; width: 90vw; background: #121212; border: 1px solid #3b3b3b; border-radius: 1rem; margin: auto; padding:1.5rem; top: 70vh; left: 0; right: 0; font-size: 1.5rem; color: white; }\
    #dks-search-hint { position: fixed; left: 0; right: 0; top: calc(70vh + 3.5rem); color: #aaaaaa; text-align: center}\
    </style></div>';
    let lastTime = null;
    let lastWindow = null;
    let searchShown = false;
    const timeOut = 500;
    jQuery(document).on('keyup', function(e) {
        if(searchShown) {
			e.preventDefault();
			if(e.stopPropagation !== undefined)
				e.stopPropagation();

            if(27 === e.keyCode) {
                destroySearch();
            }
            return;
        }

        if(16 !== e.keyCode) {
            lastTime = null;
            return;
        }

        const now = new Date().getTime();
        if(null === lastTime || (now - lastTime) > timeOut) {
            lastTime = now;
            return;
        }

        showSearch();
    });

    function showSearch() {
        searchShown = true;
        jQuery('body').append(jQuery(searchBox));
        jQuery('#dks-search-input').focus();
        jQuery('#dks-search').click(destroySearch);
    }

    function destroySearch() {
        jQuery('#dks').remove();
        searchShown = false;
    }
})();