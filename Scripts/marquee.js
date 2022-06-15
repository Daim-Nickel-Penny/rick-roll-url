const configs = {
  duration: 30,
  ease: "none",
};

const lines = {
  first: {
    direction: "right",
    element: document.querySelector("#marquee-first-line"),
  },
  second: {
    direction: "left",
    element: document.querySelector("#marquee-second-line"),
  },
  third: {
    direction: "right",
    element: document.querySelector("#marquee-third-line"),
  },
};

let timeline = gsap.timeline();
let sentenceWidth = document.querySelector(".marquee__sentence").clientWidth;

// Init timeline and register events.
function init() {
  setTimeline();
  const marqueeImage = document.querySelector("#maquee-image");
  marqueeImage.addEventListener("mouseenter", flipDirection);
  marqueeImage.addEventListener("mouseout", flipDirection);
  window.addEventListener("resize", handleResize);
}

// Add marquee animations to timeline.
function setTimeline() {
  timeline
    .add(createMarquee(lines.first.element, lines.first.direction), 0)
    .add(createMarquee(lines.second.element, lines.second.direction), 0)
    .add(createMarquee(lines.third.element, lines.third.direction), 0);
}

// Create single marquee animation.
function createMarquee(element, direction) {
  const distance = sentenceWidth * 2;
  return gsap.timeline().to(element, {
    ...configs,
    x: direction === "left" ? distance : -distance,
    onComplete() {
      timeline.play(0);
    },
    onReverseComplete() {
      timeline.reverse(0);
    },
  });
}

// Reverse the timeline direction.
function flipDirection() {
  timeline.reversed(!timeline.reversed());
}

// Reset timeline on resize.
function handleResize() {
  sentenceWidth = document.querySelector(".marquee__sentence").clientWidth;
  timeline.seek(0);
  timeline.clear();
  setTimeline();
}

init();
