// ==UserScript==
// @name         Youtube Video Title Untranslator
// @namespace    https://github.com/kkchen-dev/tampermonkey-userscript
// @version      0.2
// @description  Translate the auto-translated Youtube video titles back to original languages
// @author       Kevin Chen
// @match        https://*.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';
    var checkExist = setInterval(function() {
        let originalTitle = document.getElementsByTagName('title')[0].innerHTML;
        if (originalTitle !== 'YouTube') {
            originalTitle = originalTitle.replace(' - YouTube', '');
            let translatedTitleContainers = document.getElementsByClassName('title ytd-video-primary-info-renderer');
            if (translatedTitleContainers.length) {
                let translatedElement = translatedTitleContainers[0].getElementsByTagName('yt-formatted-string')[0];
                if (translatedElement.innerHTML !== originalTitle) {
                    translatedElement.innerHTML = `${originalTitle} (${translatedElement.innerHTML})`;
                }
                clearInterval(checkExist);
            }
        }
    }, 100);
    setTimeout(clearInterval, 1000, checkExist);
})();