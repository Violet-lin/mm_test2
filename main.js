var slide;
var numSlides;
var slideWidth = 300;
var slideDelay = 3;
var slideDuration = 0.3;

var snapX;
var current = 0;

var prevButton = document.querySelector("#arrow_prev");
var nextButton = document.querySelector("#arrow_next");

var slides01 = document.querySelector("#slides");
var slides02 = document.querySelectorAll(".slide");
var slides03 = document.querySelector(".slide");
var logos = document.getElementById("logo");

console.log("current " + current)

prevButton.addEventListener("click", function () {
    current--; 
    animateSlides(1);
  });
  
nextButton.addEventListener("click", function () {
    current++;
    animateSlides(-1);
  });


function animateSlides(direction) {

    snapX = -current * slideWidth;
    console.log("current " + current)
    console.log(snapX)
    TweenLite.to(slides01, 1, { x: snapX });

}