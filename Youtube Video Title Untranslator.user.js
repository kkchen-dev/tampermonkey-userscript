// ==UserScript==
// @name         Youtube Video Title Untranslator
// @namespace    https://github.com/kkchen-dev/tampermonkey-userscript
// @version      0.5
// @description  Translate the auto-translated Youtube video titles back to original languages
// @author       Kevin Chen
// @match        https://*.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';
    let persistedId = '';
    setInterval(setTitle, 10);

    function setTitle() {
        let originalTitle = document.getElementsByClassName('ytp-title-text')?.[0]?.innerText;
        let translatedTitle = JSON.parse(document.getElementById('scriptTag')?.innerText ?? "{}")?.name;
        let displayedElement = document.getElementsByClassName('title ytd-video-primary-info-renderer')?.[0]?.getElementsByTagName('yt-formatted-string')?.[0];
        let currentId = document.getElementsByTagName('ytd-watch-flexy')?.[0]?.getAttribute('video-id');

        if (persistedId !== currentId && displayedElement && originalTitle && translatedTitle) {
            persistedId = currentId;
            displayedElement.innerText = (originalTitle === translatedTitle) ? originalTitle : `${originalTitle} (${translatedTitle})`;
        }
    }
})();