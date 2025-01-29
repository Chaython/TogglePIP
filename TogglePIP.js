// ==UserScript==
// @name         Toggle Picture-in-Picture Mode
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Toggle Picture-in-Picture mode for any video on any website using a keyboard shortcut (Left Alt + P).
// @author       Chaython
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Function to toggle Picture-in-Picture mode
  function togglePiP() {
    const video = document.querySelector('video'); // Find the first video element on the page

    if (video) {
      if (document.pictureInPictureElement) {
        // If PiP is already active, exit PiP mode
        document.exitPictureInPicture();
      } else if (!video.disablePictureInPicture) {
        // If PiP is not active, request PiP mode
        video.requestPictureInPicture().catch((error) => {
          console.error('Failed to enter PiP mode:', error);
        });
      }
    } else {
      console.warn('No video element found on the page.');
    }
  }

  // Add a keyboard shortcut to toggle PiP (Left Alt + P)
  document.addEventListener('keydown', (event) => {
    if (event.altKey && !event.ctrlKey && !event.shiftKey && event.key === 'p') {
      togglePiP();
    }
  });

  console.log('Tampermonkey script loaded. Press Left Alt + P to toggle PiP mode.');
})();
