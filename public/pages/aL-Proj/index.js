const carouselContainer = $(".carousel-container");
const items = $(".carousel-container .carousel-item");
const centers = []
const windowCenterX = window.innerWidth / 2;
let currentItemIndex = 0;
let currentTranslateX; // Track the current translation
var translationAmount;
var animating = false;
const itemCount = $(".top-info-box#count");
const itemSource = $(".top-info-box#source");
const itemDescription = $(".top-info-box-bottom");

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
GetCenterOfItems();
itemCount.text(`(${currentItemIndex})`);
itemSource.text(`${$(items[currentItemIndex]).children(".carousel-item-source").text()}`);
itemDescription.text(`${$(items[currentItemIndex]).children(".carousel-item-description").text()}`);


carouselContainer.css({
    transform: `translateX(${windowCenterX - centers[0]}px)`,
    "-webkit-transform": `translateX(${windowCenterX - centers[0]}px)` // for compatibility
});

function GetCenterOfItems(){
    const items = $(".carousel-container .carousel-item");
    items.each(function(index, element){
        const $element = $(element);
        centers.push(GetPosition($element));
    })
    translationAmount = centers[0] - centers[1];
    currentTranslateX = windowCenterX - centers[0];
}

function GetPosition(element){
    const offset = element.offset();
    const width = element.outerWidth();
    return offset.left + width / 2;
}



function lerp(a, b, t) {
    return a + (b - a) * t;
}

function smoothTranslate() {
    animating = true;
    // Apply the smooth scroll using lerp
    currentTranslateX = lerp(currentTranslateX, targetTranslateX, 0.1); // 0.1 is the smoothing factor

    // Apply the new translateX value
    carouselContainer.css({
        transform: `translateX(${currentTranslateX}px)`,
        "-webkit-transform": `translateX(${currentTranslateX}px)` // for compatibility
    });

    // Continue the animation if we're not close enough to the target
    if (Math.abs(targetTranslateX - currentTranslateX) > 0.5) {
        requestAnimationFrame(smoothTranslate);
    } else {
        currentTranslateX = targetTranslateX; // Snap to the target position
        animating = false;
    }
}

$(window).on("mousewheel", (event) => {
    // Determine scroll direction and scroll amount
   // Determine scroll direction and scroll amount
   if(animating) return;
   const scrollAmount = event.originalEvent.wheelDelta > 0 ? -1 : 1;

   if(scrollAmount == 1){
    console.log("scroll down");
    if(currentItemIndex == centers.length - 1) return;
    currentItemIndex++;
    targetTranslateX = currentTranslateX + translationAmount;
   }
   else{
    if(currentItemIndex == 0) return;
    currentItemIndex--;
    targetTranslateX = currentTranslateX + -translationAmount;
   }
   itemCount.text(`(${currentItemIndex})`);
   itemSource.text(`${$(items[currentItemIndex]).children(".carousel-item-source").text()}`);
   itemDescription.text(`${$(items[currentItemIndex]).children(".carousel-item-description").text()}`);
   console.log(currentItemIndex);
   // Limit the translation within bounds

   // Start the smooth scroll animation if it's not already running
   if (Math.abs(targetTranslateX - currentTranslateX) > 0.5) {
       smoothTranslate();
   }
});