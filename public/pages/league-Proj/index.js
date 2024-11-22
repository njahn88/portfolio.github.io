$(".header-link").on("mouseover", function() {
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
