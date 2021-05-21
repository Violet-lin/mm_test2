const prevButton = document.querySelector("#arrow_prev");
const nextButton = document.querySelector("#arrow_next");
const exitArea = document.querySelector("#exit");
const reel = document.querySelector("#slides");

// let data={};
let dynamic_slides;
//-------------------
// animation related
//-------------------

const interval= 3000;
const slideDuration = 0.5;
const slideWidth = 300;

const startingX = slideWidth * -1;
let snapX;
let gotoIndex;
let current = 1;

let lastNode = 5; 
let reelLength; 

start();

function start() {
  //loading from json file
  fetch("data.json")
      .then(response => response.json())
      .then(data => {
        lastNode = Object.keys(data).length;
      })
  //----------------------
  //add last image as fist slide
  //----------------------
  addSlide(lastNode);
  //----------------------
  //add the slides
  //----------------------
  for (i = 1; i < 6; i++) {
      addSlide(i)
  }
  //----------------------
  //add 1st image as last slide
  //----------------------
  addSlide(1)

  dynamic_slides = document.querySelectorAll(".slide");
  reelLength = dynamic_slides.length

  TweenLite.set(reel, {
      x: startingX
  });
}

prevButton.addEventListener("click", function() {
  moveBackward()
});

nextButton.addEventListener("click", function() {
  moveForward()
});

function moveBackward() {
  gotoIndex = current-1;
  animateSlides(gotoIndex);
  checkIndex()
}

function moveForward() {
  gotoIndex = current+1;
  animateSlides(gotoIndex);
  checkIndex()
}

function checkIndex() {
  // console.log("gotoIndex " + gotoIndex + ",current " + current)
}
function autoplay() {
  setInterval(() => {moveForward()},interval)
}

function animateSlides(gotoIndex) {
  checkIndex()
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
  checkIndex()
}

function addSlide(num) {
  //add li with .slide & .slide
    let li = document.createElement('li');
    li.setAttribute('class', 'slide ');
    li.style.backgroundImage = "url('0" + num + ".jpg')";
    document.getElementById('slides').appendChild(li)
}

function getClickTag(i) {
  fetch("data.json")
  .then(response => response.json())
  .then(data => {
    var click_url = "data.slide_0" + i + ".img_url";
    return click_url;
  })
}

function addExitHandler() {
  exitArea.addEventListener('click', function () {
    Enabler.exit('exit', getClickTag[current]);
    // TO DO: Callback function to get the click_url
  });
}
// TO DO: Refactor