function RaiseWords() {
    $(".main-info-word").each(function(i) {
        var $item = $(this);
        setTimeout(function(){
            $item.animate({
                opacity: "1",
                paddingTop: "0px"
            }, 1000);
        }, i * 100);
    });
}

function RaiseCards(){
    $(".content-card-half").animate({
        marginTop: "0px",
    }, 200, () => {
        $(".card-cover").animate({
            marginTop: "0px",
        }, 1000, () => {
            $(".card-picture img").animate({
                opacity: "1"
            }, 1000, () => {
                $(".card-cover").animate({
                    marginTop: "85%"
                }, 1000);
            });
        });
    });
}

function NewRaise(){
    $(".content-card-half").each(function(i) {
        var $item = $(this);
        setTimeout(function(){
            newRaiseCards($item, "125%");
        }, i * 200);
    });
}

function newRaiseCards(card, percent){
    var image = card.children(".card-picture").children("img");
    var cover = card.children(".card-picture").children(".card-cover");
    card.animate({
        marginTop: "0px"
    }, 1000, "swing",);
    image.animate({
        marginTop: "0px"
    }, 1500, "swing");
    cover.animate({
        marginTop: "0px",
    }, 1500, "swing", () => {
        cover.animate({
            marginTop: percent,
        }, 1500, "swing", () =>{
            image.css("scale", "1");
            if(percent == "85%"){
                AddHoverAbility();
            }
        });
    });
}

function fullSizeRaise(){
    $(".content-card-full").each(function(i) {
        var $item = $(this);
        setTimeout(function(){
            newRaiseCards($item, "85%");
        }, i * 200);
    });
}



var scrollPosition = 0;
var raised = false;
var fullRaised = false;
$.fx.interval = 100;

$(document).on("scroll", () => {
    var newScrollPosition = window.scrollY;
    if(newScrollPosition > scrollPosition){
        scrollPosition = newScrollPosition;
        $(".main-logo-container").fadeOut();
    }
    else{
        scrollPosition = newScrollPosition;
        $(".main-logo-container").fadeIn();
    }
    if(scrollPosition > 300 && !raised){
        NewRaise();
        raised = true;
    }
    else if(scrollPosition > 1000 && !fullRaised){
        fullSizeRaise();
        fullRaised = true;
    }
});

function AddHoverAbility(){
    $(".content-card-full").mouseenter(function() {
        var $fade = $(this).children(".picture-fade");
        var $picture = $(this).children(".card-picture").children("img");
        var $hiddenText = $(this).children(".card-picture").children(".picture-text-hidden-container");
        $fade.animate({
            opacity: .35,
        }, 500, "swing");
        $picture.animate({
            scale: 1.2,
        }, 500, "swing");
        $hiddenText.animate({
            opacity: 1,
        }, 500, "swing");
    });
    $(".content-card-full").mouseleave(function() {
        var $fade = $(this).children(".picture-fade");
        var $picture = $(this).children(".card-picture").children("img");
        var $hiddenText = $(this).children(".card-picture").children(".picture-text-hidden-container");
        console.log($picture);
        $fade.animate({
            opacity: 0,
        }, 500, "swing");
        $picture.animate({
            scale: 1,
        }, 500, "swing");
        $hiddenText.animate({
            opacity: 0,
        }, 500, "swing");
    });
}


RaiseWords();