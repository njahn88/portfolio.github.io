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

$(window).on("mousewheel", (event) => {

    // Determine scroll direction and scroll amount
    const scrollAmount = event.originalEvent.wheelDelta > 0 ? -100 : 100;
    
    // Calculate the new translation
    let newTranslateX = currentTranslateX + scrollAmount;

    // Limit the translation within bounds
    if (newTranslateX > 0) {
        newTranslateX = 0; // Prevent scrolling past the start
    } else if (Math.abs(newTranslateX) >= maxTranslateX) {
        newTranslateX = -maxTranslateX; // Prevent scrolling past the end
    }

    // Apply the new translation
    currentTranslateX = newTranslateX;
    carouselContainer.css({
        transform: `translateX(${currentTranslateX}px)`,
        "-webkit-transform": `translateX(${currentTranslateX}px)` // for compatibility
    });
});