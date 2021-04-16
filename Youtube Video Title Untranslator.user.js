// ==UserScript==
// @name         Youtube Video Title Untranslator
// @namespace    https://github.com/kkchen-dev/tampermonkey-userscript
// @version      0.3
// @description  Translate the auto-translated Youtube video titles back to original languages
// @author       Kevin Chen
// @match        https://*.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';
    let persistedTab = '';
    let setTitleLoop = setInterval(setTitle, 100);
    function setTitle() {
        let originalTitleContainers = document.getElementsByClassName('ytp-title-text');
        let translatedTitleContainers = document.getElementsByClassName('title ytd-video-primary-info-renderer');
        if (elementExists(originalTitleContainers)
                && elementExists(translatedTitleContainers)
                && elementExists(translatedTitleContainers[0].getElementsByTagName('yt-formatted-string'))) {
            let originalTitle = originalTitleContainers[0].innerText;
            let translatedElement = translatedTitleContainers[0].getElementsByTagName('yt-formatted-string')[0];
            let translatedText = translatedElement.innerText;

            if (elementExists(translatedElement.getElementsByTagName('span')) || originalTitle !== persistedTab) {
                if (elementExists(translatedElement.getElementsByTagName('span'))) {
                    translatedText = translatedElement.getElementsByTagName('span')[0].innerText;
                }
                if (originalTitle) {
                    if (translatedText && translatedText !== originalTitle) {
                        translatedElement.innerText = `${originalTitle} (${translatedText})`;
                    }
                    else {
                        translatedElement.innerText = originalTitle;
                    }
                }
                persistedTab = originalTitle;
            }
        }
    }
    function elementExists(element) {
        return !!element && !!element[0]
    }
})();