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
    getData();
}

function preloader() {
    let preloader = document.querySelector(".preloader")
    let stageImages = document.querySelectorAll('img');
    let slideImg = new Image();

    let loaded = 0;

    for (let i = 0; i < stageImages.length; i++) {
        stageImages[i].addEventListener("load", trackProgress, true);
        stageImages[i].src = stageImages[i].getAttribute('src');
    }
    for (let i = 0; i < slideData.length; i++) {
        slideImg.src = "./img/" + slideData[i].imgURL;
        trackProgress();
    }

    function trackProgress() {
        loaded++;
        
        let totalImages = stageImages.length+slideData.length
        if (loaded == totalImages) {
            removePreloader();
        }
    }

    function removePreloader() {
        preloader.classList.add("disappear");
        completeHandler();
    }
}

function completeHandler() {
    setStage();
}