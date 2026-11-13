
// =====================================
// BIRTHDAY WEBSITE - KANNA ❤️
// =====================================


// PAGE NAVIGATION

const screens = Array.from(
  document.querySelectorAll(".screen")
);

function show(id) {

  screens.forEach((screen) => {

    screen.classList.remove("active");

    screen.setAttribute("aria-hidden", "true");

  });

  const target = document.getElementById(id);

  if (!target) return;

  target.classList.remove("active");

  // Restart page animations
  void target.offsetWidth;

  target.classList.add("active");

  target.removeAttribute("aria-hidden");

}


// BUTTON NAVIGATION

document.querySelectorAll("[data-next]").forEach((button) => {

  button.addEventListener("click", () => {

    const nextPage = button.dataset.next;

    show(nextPage);

  });

});


// =====================================
// BIRTHDAY PAGE FLOATING HEARTS
// =====================================

const birthdayHeartLayer = document.querySelector(
  ".floating-hearts"
);

if (birthdayHeartLayer) {

  const heartSymbols = ["♥", "♡", "❤", "💕"];

  for (let i = 0; i < 18; i++) {

    const heart = document.createElement("span");

    heart.className = "birthday-heart";

    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.animationDelay =
      Math.random() * 7 + "s";

    heart.style.animationDuration =
      6 + Math.random() * 5 + "s";

    heart.style.fontSize =
      14 + Math.random() * 20 + "px";

    birthdayHeartLayer.appendChild(heart);

  }

}


// =====================================
// HEARTS PAGE
// =====================================

const heartsLayer = document.getElementById("hearts-layer");

const flyButton = document.getElementById("fly-btn");

const heartColors = [
  "#e23d52",
  "#c4163a",
  "#ff6b91",
  "#9d1634",
  "#ff4d67",
  "#d66bb5",
  "#c18ae9"
];

const heartSymbols = ["♥", "❤", "💕", "♡"];

let heartsCreated = false;


// CREATE HEARTS

function createHearts() {

  if (heartsCreated) return;

  heartsCreated = true;

  for (let i = 0; i < 38; i++) {

    const heart = document.createElement("span");

    heart.className = "heart";

    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    const x = Math.random() * 90 + 5;

    const y = Math.random() * 85 + 5;

    const size = 18 + Math.random() * 25;

    const drift = Math.random() * 120 - 60;

    heart.style.left = x + "%";

    heart.style.top = y + "%";

    heart.style.fontSize = size + "px";

    heart.style.color =
      heartColors[Math.floor(Math.random() * heartColors.length)];

    heart.style.setProperty("--drift", drift + "px");

    heartsLayer.appendChild(heart);

  }

}


// CREATE HEARTS WHEN PAGE OPENS

const heartsPage = document.getElementById("hearts");

const heartsObserver = new MutationObserver(() => {

  if (heartsPage.classList.contains("active")) {

    createHearts();

  }

});

heartsObserver.observe(heartsPage, {
  attributes: true,
  attributeFilter: ["class"]
});


// FLY HEARTS BUTTON

flyButton.addEventListener("click", () => {

  if (flyButton.disabled) return;

  flyButton.disabled = true;

  flyButton.textContent = "Sending love... ❤️";

  const hearts = Array.from(
    heartsLayer.querySelectorAll(".heart")
  );

  if (hearts.length === 0) {

    show("almost");

    return;

  }

  let completed = 0;

  hearts.forEach((heart) => {

    heart.addEventListener("animationend", () => {

      completed++;

      if (completed === hearts.length) {

        setTimeout(() => {

          show("almost");

        }, 500);

      }

    }, { once: true });

    heart.classList.add("fly");

  });

});


// =====================================
// MEMORIES SLIDER
// =====================================

const viewport = document.getElementById("viewport");

const slides = Array.from(
  viewport.querySelectorAll(".slide")
);

const dotsWrap = document.getElementById("dots");

const previousButton = document.getElementById("prev-slide");

const nextButton = document.getElementById("next-slide");

const finalNextButton = document.getElementById("final-next");

let currentIndex = 0;

let scrollTimer;


// CREATE SLIDER DOTS

slides.forEach((slide, index) => {

  const dot = document.createElement("button");

  dot.type = "button";

  dot.className = "dot";

  dot.setAttribute(
    "aria-label",
    "Go to memory " + (index + 1)
  );

  dot.addEventListener("click", () => {

    scrollToSlide(index);

  });

  dotsWrap.appendChild(dot);

});

const dots = Array.from(dotsWrap.children);


// UPDATE ACTIVE DOT

function updateSlider() {

  const width = viewport.clientWidth || 1;

  currentIndex = Math.max(
    0,
    Math.min(
      slides.length - 1,
      Math.round(viewport.scrollLeft / width)
    )
  );

  dots.forEach((dot, index) => {

    if (index === currentIndex) {

      dot.setAttribute("aria-current", "true");

    } else {

      dot.removeAttribute("aria-current");

    }

  });

  // Show final button only after reaching last memory

  if (currentIndex === slides.length - 1) {

    finalNextButton.hidden = false;

  } else {

    finalNextButton.hidden = true;

  }

}


// GO TO SPECIFIC SLIDE

function scrollToSlide(index) {

  const safeIndex = Math.max(
    0,
    Math.min(slides.length - 1, index)
  );

  viewport.scrollTo({

    left: viewport.clientWidth * safeIndex,

    behavior: "smooth"

  });

  currentIndex = safeIndex;

}


// PREVIOUS SLIDE

previousButton.addEventListener("click", () => {

  scrollToSlide(currentIndex - 1);

});


// NEXT SLIDE

nextButton.addEventListener("click", () => {

  scrollToSlide(currentIndex + 1);

});


// UPDATE WHEN USER SWIPES

viewport.addEventListener("scroll", () => {

  clearTimeout(scrollTimer);

  scrollTimer = setTimeout(() => {

    updateSlider();

  }, 100);

});


// CLICK PHOTO TO SHOW WISH

slides.forEach((slide) => {

  slide.addEventListener("click", (event) => {

    if (event.target.closest(".arrow")) return;

    slide.classList.toggle("show-wish");

  });

});


// FINAL BUTTON

finalNextButton.addEventListener("click", () => {

  show("final");

});


// =====================================
// IMAGE FALLBACK / ERROR HANDLING
// =====================================

// If an image cannot load, show its filename in console
// so you can identify the missing image.

document.querySelectorAll(".photo-frame img, .slide img").forEach((img) => {

  img.addEventListener("error", () => {

    console.error("Image could not be loaded:", img.src);

  });

});


// =====================================
// INITIAL PAGE
// =====================================

show("intro");

updateSlider();
