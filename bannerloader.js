window.onload = function() {

    if (Enabler.isInitialized()) {
        init();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
    }
}

function init() {
    if (Enabler.isPageLoaded()) {
        pageLoadedHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
    }
}

function pageLoadedHandler() {
    if (Enabler.isVisible()) {
        adVisibilityHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, adVisibilityHandler);
    }
}

function adVisibilityHandler() {
    preloader();
}

function preloader() {
    var preloader = document.querySelector(".preloader")

    let images = document.querySelectorAll('img');
    let loaded = 0;

    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("load", trackProgress, true);
        images[i].src = images[i].getAttribute('src');
        trackProgress()
        // TO DO : not only the controls, but also include the slide images
    }

    function trackProgress() {
        loaded++;
        if (loaded == images.length) {
            removePreloader();
        }
    }

    function removePreloader() {
        preloader.classList.add("disappear");
        completeHandler();
    }
}

function completeHandler() {
    addExitHandler();
    start();
}