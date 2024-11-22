$(".header-link").on("mouseover", function() {
    if($(this).attr("id") === "league-logo") return;
    $(this).children(".header-link-underline").css({
        opacity: 1
    });
    $(this).children("p").css({
        borderRadius: "5px",
        background: "rgba(128, 128, 128, .3)"
    })
})

$(".header-link").on("mouseleave", function() {
    $(this).children(".header-link-underline").css({
        opacity: 0
    });
    $(this).children("p").css({
        background: "none"
    })
})

$(".header-globe").on("mouseover", function() {
    $(this).css({
        background: "rgba(128, 128, 128, .3)"
    })
})

$(".header-globe").on("mouseleave", function() {
    $(this).css({
        background: "none"
    })
})

$("#play-now").on("mouseover", function() {
    $(this).css({
        background: "rgb(11, 196, 226)"
    })
})

$("#play-now").on("mouseleave", function() {
    $(this).css({
        background: "linear-gradient(315deg, rgb(11, 196, 226) 0%, rgb(44, 140, 194) 100%)"
    })
})

$(".header-link#riot-games-logo").on("mouseover", function() {
    $(this).children("svg").css({
        fill: "red"
    })
})

$(".header-link#riot-games-logo").on("mouseleave", function() {
    $(this).children("svg").css({
        fill: "white"
    })
})
