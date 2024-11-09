const sidePanel = $(".side-bar-container");
const sidePanelLinks = $(".side-bar-link");
const openIcon = $(".top-level-header-burger-icon#open");
const closeIcon = $(".top-level-header-burger-icon#close");
const transitionCover = $(".transition-cover");
const $email = $(".main-content-box#email");


const indexPage = "../../../index.html"
const aboutPage = "../about/about.html"
const contactPage = "./contact.html"
const workPage = "../work/work.html"

transitionCover.animate({
    marginTop: "51%",
}, 750, "swing");

$email.click(() => {
    const email = "nathanjahn8@gmail.com"
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied clipboard");
    });
})

$(".top-level-header-burger").click(() => {
    if(sidePanel.css("visibility") == "hidden"){
        ShowSideBar();
        openIcon.animate({
            opacity: 0,
        }, 250, "swing", () => {
            closeIcon.animate({
                opacity: 1,
            }, 250, "swing");
        })
    }
    else{
        HideSideBar();
        closeIcon.animate({
            opacity: 0,
        }, 250, "swing", () => {
            openIcon.animate({
                opacity: 1,
            }, 250, "swing");
        })
    }
});
HighlightPage();

function ShowSideBar(){
    sidePanel.css("visibility", "visible");
    sidePanel.animate({
        width: "100%",
    }, 750, "swing"); 
    sidePanelLinks.animate({
        opacity: 1,
    }, 1000, "swing");
}

function HideSideBar(){
    sidePanel.animate({
        width: "0%",
    }, 750, "swing", () => {
        sidePanel.css("visibility", "hidden");
    }); 
    sidePanelLinks.animate({
        opacity: 0,
    }, 1000, "swing");
}

function HighlightPage(){
    sidePanelLinks.each((index, element) => {
        if($(element).text().trim() == $("title").text()){
            $(element).css("color", "rgb(221, 221, 221)");
        }
        var pageToChange = "";
        switch($(element).text().trim()){
            case "Home":
                pageToChange = indexPage;
                break;
            case "About":
                pageToChange = aboutPage;
                break;
            case "Contact":
                pageToChange = contactPage;
                break;
            case "Work":
                pageToChange = workPage;
                break;
        }
        $(element).click(() => {
            transitionCover.animate({
                marginTop: "0%",
            }, 750, "swing", () => {
                window.location.href = pageToChange;
            })
        });
    })
}