import config from "./config.js";

const slidingTime = config.slidingTime;
const timeGap = config.timeGap;
const numOfSlides = config.numOfSlides;

let currentLayout = numOfSlides;    //Initial value is the number of the slides/filses.
let images = [];                    //List of images, will be filled up automatically with the file names later.

// * Building the carousel * //
const carousel = document.querySelector(".carousel");
carousel.innerHTML = `
  <div class="controls">
    <button class="btnLeft controlBtn">&lsaquo;</button>
    <button class="btnRight controlBtn">&rsaquo;</button>
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
});
// *** Setting the style properties of the slides *** //

let indexOfDisplayed = 0;  //The index of the active indicator and the displayed slide.

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

function forward() {
  /**
   * Remember: Initially the dispayed slide is the second slide in the queue.
   * 1. Click is suspended while sliding is in progress, nothing happens when clicking on the control buttons.
   * 2. Click is enabled again when sliding has finished.
   * 3. Set the z-index of the first slide to -50, and the others to 50. 
   * 4. Increase the indexOfDisplayed by 1, however, if it is the last index, then set it to 0.
   * 5. Synchronize the indicator to the displayed slide.
   * 6. Move the first slide to the last position, also move all other slides to left. 
   * 7. Decrease the current layout by 1, however, if it is 1, then set it back to the initial value.
   */
  if (!isClickSuspended) {
    //1.
    isClickSuspended = true;
    //2.
    setTimeout(() => {
      isClickSuspended = false;
    }, slidingTime);
    //3.
    slides.forEach((slide, i) => {
      if (i === indexOfDisplayed) {
        slide.style.zIndex = '-50';
      } else {
        slide.style.zIndex = '50';
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

function backward() {
  /**
   * Remember: Initially the dispayed slide is the second slide in the queue.
   * 1. Click is suspended while sliding is in progress, nothing happens when clicking on the control buttons.
   * 2. Click is enabled again when sliding has finished.
   * 3. Set the z-index of the first and last slide to -50, and the others to 50. 
   * 4. Decrease the indexOfDisplayed by 1, however, if it is 0, then set it to the last index.
   * 5. Synchronize the indicator to the displayed slide.
   * 6. Move the last slide to the first position.
   * 7. Move all slides to right. 
   * 8. Increase the current layout by 1, however, if it is the initial value, then set it to 1.
   */
  if (!isClickSuspended) {
    //1.
    isClickSuspended = true;
    //2.
    setTimeout(() => {
      isClickSuspended = false;
    }, slidingTime);
    //3.
    slides.forEach((slide, i) => {
      slide.style.zIndex = '50';
    });
    indexOfDisplayed === 0
      ? (slides[numOfSlides - 1].style.zIndex = "-50")
      : (slides[indexOfDisplayed - 1].style.zIndex = "-50");
    //4.
    indexOfDisplayed === 0 ? (indexOfDisplayed = numOfSlides - 1) : indexOfDisplayed--;
    //5.
    setIndicator();
    //6.
    for (let i = 0; i < numOfSlides; i++) {
      if (currentLayout === numOfSlides - i - 1) {
        slides[i].style.left = `${-(numOfSlides + -(numOfSlides - 2) + i) * 100}%`;
      }
      if (currentLayout === numOfSlides) {
        slides[numOfSlides - 1].style.left = `${-(numOfSlides + 1) * 100}%`;
      }
    }
    //7.
    slides.forEach((slide, i) => {
      let newLeft = Number(slide.style.left.split('%').join('')) + 100;
      slide.style.left = `${newLeft}%`;
    });
    //8.
    currentLayout === numOfSlides ? (currentLayout = 1) : currentLayout++;
  }
}

// * Setting the click event of the control buttons * //
const btnLeft = document.querySelector(".btnLeft");
const btnRight = document.querySelector(".btnRight");
btnLeft.addEventListener("click", () => {
  backward();
});
btnRight.addEventListener("click", () => {
  forward();
});
// *** Setting the click event of the control buttons  *** //

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
    forward();
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
      forward();
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
      forward();
    }, timeGap + slidingTime);
    id = runAgain;
    //console.log(id, "STARTED");
  });
}

autoRun();