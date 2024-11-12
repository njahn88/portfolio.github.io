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
const imageMarginTopRatios = ["20%", "30%", "50%"]
const images = $("img");
var previousMargin;
console.log(images);

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
UpdateItemImages();
itemCount.text(`(${currentItemIndex})`);
itemSource.text(`${$(items[currentItemIndex]).children(".carousel-item-source").text()}`);
itemDescription.text(`${$(items[currentItemIndex]).children(".carousel-item-description").text()}`);

items.each(function(index, element){
    $(element).on("mouseenter", function(event) {
        const img = $(this).children(".carousel-image").children("img");
    
        // Store the original margin-top before changing it
        previousMargin = img.css("margin-top");
    
        // Animate to margin-top: 0%
        img.animate({
            "margin-top": "0%"
        }, 500, "swing");
        
        itemCount.text(`(${index})`);
        itemSource.text(`${$(items[index]).children(".carousel-item-source").text()}`);
        itemDescription.text(`${$(items[index]).children(".carousel-item-description").text()}`);
    
        console.log("Mouseover fired");
    });
    $(element).on("mouseleave", function() {
        const img = $(this).children(".carousel-image").children("img");
    
        // Animate back to the previous margin
        img.animate({
            "margin-top": previousMargin
        }, 500, "swing");

        itemCount.text(`(${currentItemIndex})`);
        itemSource.text(`${$(items[currentItemIndex]).children(".carousel-item-source").text()}`);
        itemDescription.text(`${$(items[currentItemIndex]).children(".carousel-item-description").text()}`);
    
        console.log("Mouseout fired");
    });
})



carouselContainer.css({
    transform: `translateX(${windowCenterX - centers[0]}px)`,
    "-webkit-transform": `translateX(${windowCenterX - centers[0]}px)`
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

function UpdateItemImages(){
    $(images[currentItemIndex]).animate({
        "margin-top": "0%"
    }, 500, "swing");
    UpdateImage(currentItemIndex, 1);
    UpdateImage(currentItemIndex, 2);
    UpdateImage(currentItemIndex, 3)
}

function UpdateImage(currentIndex, spread){
    if(!(currentIndex + spread > images.length - 1)){
        $(images[currentIndex + spread]).animate({
            "margin-top": imageMarginTopRatios[spread - 1]
        }, 500, "swing");
    }
    if(!(currentIndex + spread < 0))
    {
        $(images[currentIndex - spread]).animate({
            "margin-top": imageMarginTopRatios[spread - 1]
        }, 500, "swing");
    }
}



function lerp(a, b, t) {
    return a + (b - a) * t;
}

function smoothTranslate() {
    animating = true;
    currentTranslateX = lerp(currentTranslateX, targetTranslateX, 0.05);

    carouselContainer.css({
        transform: `translateX(${currentTranslateX}px)`,
        "-webkit-transform": `translateX(${currentTranslateX}px)`
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
   if(animating) return;
   const scrollAmount = event.originalEvent.wheelDelta > 0 ? -1 : 1;

   if(scrollAmount == 1){
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
   if (Math.abs(targetTranslateX - currentTranslateX) > 0.5) {
       smoothTranslate();
    }
    UpdateItemImages();
});