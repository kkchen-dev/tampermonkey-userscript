// ==UserScript==
// @name         Youtube Video Info Change Line
// @namespace    https://github.com/kkchen-dev/tampermonkey-userscript
// @version      0.1
// @description  Change the video info to a new line so it won't collide with the buttons
// @author       Kevin Chen
// @match        https://*.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';
    let persistedId = '';
    setInterval(setTitle, 10);

    function setTitle() {
        let containerElement = document.querySelector("#info-contents")?.querySelector("#container");
        let infoElement = containerElement?.querySelector("#info");
        let infoTextElement = infoElement?.querySelector("#info-text");
        if(infoTextElement)
        {
            containerElement?.insertBefore(infoTextElement, infoElement);
        }
    }
})();