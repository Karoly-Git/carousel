import config from "./config.js";

const slidingTime = config.slidingTime;
const timeGap = config.timeGap;
const numOfSlides = config.numOfSlides;

let currentLayout = numOfSlides; //Number of possible currentLayouts.
let images = [];          //List of images, will be filled up automatically with the file names later.

// * Building the carousel * //
const carousel = document.querySelector(".carousel");
carousel.innerHTML = `
  <div class="controls">
    <button class="btnL controlBtn">&lsaquo;</button>
    <button class="btnR controlBtn">&rsaquo;</button>
  </div>
  <div class="slideBox"></div>
  <div class="indicatorBox"></div>`;
// *** Building the carousel *** //

// * Building the indicatorBox * //
const indicatorBox = document.querySelector(".indicatorBox");
for (let i = 0; i < numOfSlides; i++) {
  indicatorBox.innerHTML += `<button class="indicator"></button>`;
}
// *** Building the indicatorBox *** //

// * Filling up the images list * //
images.push(`img${numOfSlides}.jpg`);
for (let i = 0; i < numOfSlides; i++) {
  images.push(`img${i + 1}.jpg`);
}
// *** Filling up the images list *** //

// * Building the slideBox * //
const slideBox = document.querySelector(".slideBox");
for (let i = 0; i < numOfSlides; i++) {
  slideBox.innerHTML += `<div class="slide"></div>`;
}
// *** Building the slideBox *** //

// * Setting the background images and transition of the slides * //
const slides = [...document.querySelectorAll(".slide")];
slides.forEach((slide, i) => {
  slide.style.backgroundImage = `url(./img/${images[i]})`;
  slide.style.transition = `all ${slidingTime}ms ease-in-out`;
});
// *** Setting the background images and transition of the slides *** //

// * Setting the style properties of the slides * //
slides.forEach((slide, i) => {
  slide.style.left = `${-100}%`;
  slide.style.transition = `all ${slidingTime}ms esae-in-out`;
});
// *** Setting the style properties of the slides *** //

let indexOfDisplayed = 0;  //The index of the active indicator.

// * Setting the style properties of the indicators * //
const indicators = document.querySelectorAll(".indicator");
function setIndicator() {
  /**
   * 1. Iterates through the all indicators and sets the style properties to same on all.
   * 2. Sets different style on the active indicator.
   */

  //1.
  indicators.forEach((indi) => {
    indi.style.backgroundColor = "transparent";
    indi.style.transition = `all ${slidingTime * 0.5}ms ease-in-out`;
  });

  //2.
  indicators[indexOfDisplayed].style.backgroundColor = "white";
}
// *** Setting the style properties of the indicators *** //

setIndicator();

/*To prevent the cross clicking and messing up the animation,
the left and right control buttons are suspended while image is sliding.
*/
let isClickSuspended = false;

function slideToRight() {
  /**
   * Remember: Initially the dispayed slide is the second slide in the queue.
   * 1. Click is suspended while sliding is in progress, nothing happens when clicking on the control buttons.
   * 2. Click is enabled again when sliding has finished.
   * 3. Set the transition of the first slide of the queue to unset, and the others to set. 
   * 4. Increase the index of the displayed slide by 1, however,
   *    if the displayed slide is the last slide of the initial queue,
   *    then set the displayed index back to zero.
   * 5. Synchronize the indicator to the displayed slide.
   * 6. Jump the first slide of the queue to the last position, then slide the whole queue to the left. 
   * 7. Decrease the current layout by 1, however,
   *    if it is 1, then set it to the value of the number of the slides.
   */

  //1.
  if (!isClickSuspended) {
    isClickSuspended = true;

    //2.
    setTimeout(() => {
      isClickSuspended = false;
    }, slidingTime);

    //3.
    slides.forEach((slide, i) => {
      if (i === indexOfDisplayed) {
        slide.style.transition = "unset";
      } else {
        slide.style.transition = `all ${slidingTime}ms ease-in-out`;
      }
    });

    //4.
    indexOfDisplayed === numOfSlides - 1 ? (indexOfDisplayed = 0) : indexOfDisplayed++;

    //5.
    setIndicator();

    //6.
    slides.forEach((slide, i) => {
      if (currentLayout === numOfSlides - i) {
        slide.style.left = `${-200 + (numOfSlides - i) * 100}%`;
      } else {
        let newLeft = Number(slide.style.left.split('%').join('')) - 100;
        slide.style.left = `${newLeft}%`;
      }
    });

    //7.
    currentLayout === 1 ? (currentLayout = numOfSlides) : currentLayout--;
  }
}

function slideToLeft() {
  if (!isClickSuspended) {
    isClickSuspended = true;

    setTimeout(() => {
      isClickSuspended = false;
    }, slidingTime);

    slides.forEach((slide, i) => {
      slide.style.transition = `all ${slidingTime}ms ease-in-out`;
    });

    indexOfDisplayed === 0
      ? (slides[numOfSlides - indexOfDisplayed - 1].style.transition = "unset")
      : (slides[indexOfDisplayed - 1].style.transition = "unset");

    indexOfDisplayed === 0 ? (indexOfDisplayed = numOfSlides - 1) : indexOfDisplayed--;

    setIndicator();

    for (let i = 0; i < numOfSlides; i++) {
      for (let j = 0; j < numOfSlides - 1; j++) {
        if (currentLayout === numOfSlides - j - 1) {
          slides[j].style.left = `${-(numOfSlides + -(numOfSlides - 2) + j) * 100}%`;
        }
        if (currentLayout === numOfSlides) {
          slides[numOfSlides - 1].style.left = `${-(numOfSlides + 1) * 100}%`;
        }
      }
    }

    slides.forEach((slide, i) => {
      let newLeft = Number(slide.style.left.split('%').join('')) + 100;
      slide.style.left = `${newLeft}%`;
    });

    currentLayout === numOfSlides ? (currentLayout = 1) : currentLayout++;
  }
}

const btnL = document.querySelector(".btnL");
const btnR = document.querySelector(".btnR");

btnL.addEventListener("click", () => {
  slideToLeft();
});

btnR.addEventListener("click", () => {
  slideToRight();
});

function autoRun() {
  /**
   * 1. Sliding starts automatically when page is loading.
   * 2. Sliding stoppes when mouse is over the carousel.
   * 3. Sliding starts again when mouse leaves the carousel.
   * 4. Sliding stoppes when windows is not active.
   * 5. Sliding starts again when window is active again.
   */

  //1.
  let autoRun = setInterval(() => {
    slideToRight();
  }, timeGap + slidingTime);
  //console.log(autoRun, "STARTED");

  let id = autoRun;

  //2.
  carousel.addEventListener("mouseover", () => {
    clearInterval(id);
    //console.log(id, "STOPPED");
  });

  //3.
  carousel.addEventListener("mouseout", () => {
    let runAgain = setInterval(() => {
      slideToRight();
    }, timeGap + slidingTime);
    id = runAgain;
    //console.log(id, "STARTED");
  });

  //4.
  window.addEventListener("blur", () => {
    clearInterval(id);
    //console.log(id, "STOPPED");
  });

  //5.
  window.addEventListener("focus", () => {
    let runAgain = setInterval(() => {
      slideToRight();
    }, timeGap + slidingTime);
    id = runAgain;
    //console.log(id, "STARTED");
  });
}

autoRun();