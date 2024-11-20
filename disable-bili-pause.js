// ==UserScript==
// @name         Disable Bilibili popup and video pause when not logged in
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Prevent Bilibili from pausing your video with a popup
// @author       cyphersept
// @match        https://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?domain=bilibili.com
// @grant          GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('.bilibili-player-popup-area, .bili-mini-mask *, .bili-mini-mask { display: none !important; }');

    let isUserPause = false;
    let mediaElement;

    // Find the video player
    mediaElement = document.querySelector('.bpx-player-video-area video');

    // Click play immediately if pause was not triggered by user
    mediaElement.addEventListener('pause', () => {
        if (!isUserPause) {
            // Artificially click play
            document.getElementsByClassName("bpx-player-ctrl-btn bpx-player-ctrl-play")[0].click();
        }
        isUserPause = false;
    })

    // Mark pauses as triggered by user on clicking pause button or pressing spacebar
    window.__onKey__ = (event) => {
        if (event.code !== "Space") return;
        isUserPause = (document.getElementsByClassName("bpx-state-paused").length === 0);
    };

    document.addEventListener('keydown', window.__onKey__, true);

/*
    document.querySelector('.bpx-player-video-area').addEventListener('click', (e) => {
        // Only respond to clicks by user, not scripted clicks
        if (e.isTrusted) isUserPause = true;
    }, true);*/

})();
