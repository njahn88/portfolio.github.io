const carouselContainer = $(".carousel-container");

const animateDot = (linkSelector, dotSelector) => {
    const dot = $(dotSelector);

    $(linkSelector).on("mouseover", () => {
        dot.animate({ scale: 1 }, 300, "swing");
    });

    $(linkSelector).on("mouseout", () => {
        dot.animate({ scale: 0 }, 300, "swing");
    });
};

animateDot(".top-header-link#about", ".dot#about");
animateDot(".top-header-link#archive", ".dot#archive");

let currentTranslateX = 0; // Track the current translation
const itemWidth = $(".carousel-container .carousel-item").outerWidth(true); // Width of each item, including margin
const totalItems = $(".carousel-container .carousel-item").length;
const containerWidth = carouselContainer.width();
const maxTranslateX = itemWidth * totalItems - containerWidth; // 

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function smoothTranslate() {
    // Apply the smooth scroll using lerp
    currentTranslateX = lerp(currentTranslateX, targetTranslateX, 0.1); // 0.1 is the smoothing factor

    // Apply the new translateX value
    carouselContainer.css({
        transform: `translateX(${currentTranslateX}px)`,
        "-webkit-transform": `translateX(${currentTranslateX}px)` // for compatibility
    });

    // Continue the animation if we're not close enough to the target
    if (Math.abs(targetTranslateX - currentTranslateX) > 0.5) { // tolerance for stopping
        requestAnimationFrame(smoothTranslate);
    }
}

$(window).on("mousewheel", (event) => {

    // Determine scroll direction and scroll amount
   // Determine scroll direction and scroll amount
   const scrollAmount = event.originalEvent.wheelDelta > 0 ? -100 : 100;

   // Calculate the new target translateX
   targetTranslateX = currentTranslateX + scrollAmount;

   // Limit the translation within bounds
   if (targetTranslateX > 0) {
       targetTranslateX = 0; // Prevent scrolling past the start
   } else if (targetTranslateX < -maxTranslateX) {
       targetTranslateX = -maxTranslateX; // Prevent scrolling past the end
   }

   // Start the smooth scroll animation if it's not already running
   if (Math.abs(targetTranslateX - currentTranslateX) > 0.5) {
       smoothTranslate();
   }
});