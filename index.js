const sidePanel = $(".side-bar-container");
const sidePanelLinks = $(".side-bar-link");
const openIcon = $(".top-level-header-burger-icon#open");
const closeIcon = $(".top-level-header-burger-icon#close");
var $firstOutterDiv = $(".grey#first");
var $firstInnerDiv = $(".blue#first");
var $secondOutterDiv = $(".grey#second");
var $secondInnerDiv = $(".blue#second");
var $thirdOutterDiv = $(".specialGrey#first");
var $text = $("#text");
var $classText = $(".light-blue");
var $equals = $(".specialGrey#last");
var $className = $(".orange");
var $textInput = $(".text-input");
var $classTextInfo = $(".main-content-container#classText");
const $commentText = $(".main-content-container#comment");
const transitionCover = $(".transition-cover");

const indexPage = "./index.html"
const aboutPage = "./public/pages/about/about.html"
const contactPage = "./public/pages/contact/contact.html"
const workPage = "./public/pages/work/work.html"


const programmerText = "HTML, CSS, Javascript, C, C#, Python, Unity Engine, Unreal Engine, Electron, Express, Node."
const interestText = "Love watching movies, playing games, writing stories, and learning. Also... Interstellar is the best movie of all time."
const developerText = "Developed several websites, games, and applications."
const sharonText = "Love you baby! <3"
const youtubeText = "EagerDev on Youtube! I post my game development works here!"

const orangeTick = $(".orange-tick");
orangeTick.css("opacity", "0");


const text = [["<", $firstOutterDiv, "p"], 
            ["d", $firstInnerDiv, "a"], 
            ["i", $firstInnerDiv, "a"], 
            ["v", $firstInnerDiv, "a"], 
            [">", $firstOutterDiv, "a"], 
            ["<", $secondOutterDiv, "p"], 
            ["/", $thirdOutterDiv, "a"], 
            ["d", $secondInnerDiv, "a"], 
            ["i", $secondInnerDiv, "a"], 
            ["v", $secondInnerDiv, "a"], 
            [">", $secondOutterDiv, "a"], 
            ["N", $text, "a"], 
            ["a", $text, "a"], 
            ["t", $text, "a"], 
            ["h", $text, "a"], 
            ["a", $text, "a"], 
            ["n", $text, "a"], 
            [" ", $text, "a"], 
            ["J", $text, "a"], 
            ["a", $text, "a"], 
            ["h", $text, "a"], 
            ["n", $text, "a"], 
            ["&nbsp;", $classText, "a"], 
            ["c", $classText, "a"], 
            ["l", $classText, "a"], 
            ["a", $classText, "a"], 
            ["s", $classText, "a"], 
            ["s", $classText, "a"], 
            ["=", $equals, "a"], 
            ["&quot;", $className, "p"],
            ["&quot;", $className, "a"]]

transitionCover.animate({
    marginTop: "51%",
}, 750, "swing");

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
ScrollText();



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

function ScrollText(){
    PlaceText(0);
}

function PlaceText(index){
    if(index >= text.length){
        $(document).on("keydown", function(event){
            if(event.key == "Backspace"){
                $textInput.text($textInput.text().slice(0, -1));
            }
            else{
                $textInput.append(event.key);
            }
            CheckClass();
        });
        $commentText.animate({
            opacity: 1,
        }, 500, "swing");
        setInterval(ToggleTick, 1000);
        return;
    }
    var textToPlace = text[index][0];
    var element = text[index][1];
    setTimeout(() => {
        if(text[index][2] == "p"){
            element.prepend(textToPlace);
        }
        else{
            element.append(textToPlace);
        }
        PlaceText(index+1);
    }, 100);
}

function ToggleTick(){
    orangeTick.animate({
        opacity: 1,
    }, 500, "swing", () => {
        orangeTick.animate({
            opacity: 0,
        }, 500, "swing");
    })
}

function CheckClass(){
    var textToUse = ""
    switch($textInput.text().trim()){
        case "programmer":
            textToUse = programmerText;
            break;
        case "interests":
            textToUse = interestText;
            break;
        case "development":
            textToUse = developerText;
            break;
        case "sharon":
            textToUse = sharonText;
            break;
        case "youtube":
            textToUse = youtubeText;
            break;
        default:
            textToUse = ""
            break;
    }
    if(textToUse != ""){
        $classTextInfo.text(textToUse);
            $classTextInfo.animate({
                opacity: 1,
            }, 500, "swing");
    }
    else{
        if($classTextInfo.css("opacity") == "0"){
            return;
        }
        else{
            $classTextInfo.animate({
                opacity: 0,
            }, 500, "swing");
        }
    }
}

