const prevButton = document.querySelector("#arrow_prev");
const nextButton = document.querySelector("#arrow_next");
const exitArea = document.querySelector("#exit");
const reel = document.querySelector("#slides");

//-------------------
// animation related
//-------------------

const interval= 3000;
const slideDuration = 0.5;
const slideWidth = 300;

//-------------------
// start position
//-------------------

const startingX = slideWidth * -1; // start point is offset by a slide width
let snapX;
let gotoIndex;
let current = 1;

//-------------------
// slides related
//-------------------

const jsonPath = "data.json"; // easiler to change path at the top
let lastNode; 
let reelLength;

var slideData = [];

//-------------------
// Data
//-------------------

function getData() {
  var dataArray = [];
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      toObject(data);
    }
  };
  xmlhttp.open("GET", jsonPath, true);
  xmlhttp.send();

}

function toObject(data) {
  var data_import= []
  for (var key in data) {
    let obj = {};
    obj.name = key;
    obj.imgURL = data[key].img_url;
    obj.clickURL = data[key].click_url;
    data_import.push(obj)
  }
  slideData = data_import
  lastNode = data_import.length;
  preloader();
}

//-------------------
// Stage
//-------------------

function setStage() {
  loadSlideIntoReel()
}

function loadSlideIntoReel(){
  reelLength = lastNode + 2;

  // add last image as fist slide
  // array is smaller by a number
  addSlide(lastNode - 1);
  
  // add the slides from Json chronologically
  for (i = 0; i <lastNode; i++) {
    addSlide(i);
  }

  // add 1st image as last slide
  addSlide(0);

  dynamic_slides = document.querySelectorAll(".slide");

  TweenLite.set(reel, {
      x: startingX
  });
  addExitHandler();
  autoplay();
}

prevButton.addEventListener("click", function() {
  moveBackward()
});

nextButton.addEventListener("click", function() {
  moveForward()
});

function addSlide(num) {
  //add li with .slide class & slidename as another class 
  let li = document.createElement('li');
  li.setAttribute('class', "slide " + slideData[num].name);
  li.style.backgroundImage = "url('" + slideData[num].imgURL + "')";
  document.getElementById('slides').appendChild(li)
}

function moveBackward() {
  gotoIndex = current-1;
  animateSlides(gotoIndex);
  checkConsoleIndex
}

function moveForward() {
  gotoIndex = current+1;
  animateSlides(gotoIndex);
  checkConsoleIndex
}

function checkConsoleIndex() {
  // console.log("gotoIndex " + gotoIndex + ",current " + current)
}

function autoplay() {
  setInterval(() => {moveForward()},interval)
}

function animateSlides(gotoIndex) {
  checkConsoleIndex
  snapX = -(gotoIndex) * slideWidth;
  TweenLite.to(reel, slideDuration, {
      x: snapX,
      onComplete: checkEnd
  });
}

function checkEnd() {
    if (gotoIndex > lastNode) {
        TweenLite.killTweensOf(reel, true)
        TweenLite.set(reel, {
            x: startingX
        });
        gotoIndex = 1;
    } else if (gotoIndex <= 0) {
        TweenLite.killTweensOf(reel, true)
        TweenLite.set(reel, {
            x: lastNode * slideWidth * -1
        });
        gotoIndex = lastNode;
    }
  current = gotoIndex;
  checkConsoleIndex
}

function addExitHandler() {
  exitArea.addEventListener('click', function () {
    Enabler.exit('exit', slideData[current-1].clickURL);
  });
}
