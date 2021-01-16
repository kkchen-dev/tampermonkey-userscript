// ==UserScript==
// @name         Youtube Video Title Untranslator
// @namespace    https://github.com/kkchen-dev/tampermonkey-userscript
// @version      0.1
// @description  Translate the auto-translated Youtube video titles back to original languages
// @author       Kevin Chen
// @match        https://www.youtube.com/watch?v=*
// ==/UserScript==

(function() {
    'use strict';
    let originalTitle = document.querySelector("[name='title']").getAttribute("content");
    let translatedTitleContainers = document.getElementsByClassName('title ytd-video-primary-info-renderer');
    var checkExist = setInterval(function() {
        if (translatedTitleContainers.length) {
            let translatedElement = translatedTitleContainers[0].getElementsByTagName('yt-formatted-string')[0];
            if (translatedElement.innerHTML !== originalTitle) {
                translatedElement.innerHTML = `${originalTitle} (${translatedElement.innerHTML})`
            }
            clearInterval(checkExist);
        }
    }, 100);
})();