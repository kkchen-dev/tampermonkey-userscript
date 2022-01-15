// ==UserScript==
// @name         Youtube Video Title Untranslator
// @namespace    https://github.com/kkchen-dev/tampermonkey-userscript
// @version      0.7
// @description  Translate the auto-translated Youtube video titles back to original languages
// @author       Kevin Chen
// @match        https://*.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';
    let persistedId = '';
    setInterval(setTitle, 10);

    function setTitle() {
        let titleText = document.getElementsByTagName("title")?.[0]?.innerText;
        let trimmedTitle = titleText?.substring(0, titleText.lastIndexOf('-'))?.trim();

        let originalTitle = document.getElementsByClassName('ytp-title-text')?.[0]?.innerText;
        let translatedTitle = JSON.parse(document.getElementById('scriptTag')?.innerText ?? "{}")?.name;
        let displayedElementContainer = document.getElementsByClassName('title ytd-video-primary-info-renderer')?.[0];
        let displayedElement = displayedElementContainer?.getElementsByTagName('yt-formatted-string')?.[0];
        let currentId = document.getElementsByTagName('ytd-watch-flexy')?.[0]?.getAttribute('video-id');

        if (persistedId !== currentId && displayedElement && originalTitle && translatedTitle) {
            persistedId = currentId;
            if (originalTitle === translatedTitle && trimmedTitle)
            {
                originalTitle = trimmedTitle;
            }
            if (originalTitle !== translatedTitle)
            {
                let node = document.createElement("yt-formatted-string");
                let text = document.createTextNode(`${originalTitle} || 🇹🇱: `);

                displayedElementContainer.insertBefore(node, displayedElement);
                node.appendChild(text);
            }
        }
    }
})();