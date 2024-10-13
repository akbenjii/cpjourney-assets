/************* When collapse button is pressed, show/hide the dropdown. *************/
var isHeaderVisible = false;
var isDisclaimerVisible = false;
function dropdown() {
    if(!isHeaderVisible) {
        document.getElementById("headerthing").classList.add("visible");
        document.getElementById("collapse-btn").classList.add("arrowrotate");
        isHeaderVisible = true;
    } else {
        document.getElementById("headerthing").classList.remove("visible");
        document.getElementById("collapse-btn").classList.remove("arrowrotate");
        isHeaderVisible = false;
    }
}
function disclaimer() {
    if(!isDisclaimerVisible) {
        document.getElementById("disclaimer").classList.add("disclaimer-visible");
        isDisclaimerVisible = true;
    } else {
        document.getElementById("disclaimer").classList.remove("disclaimer-visible");
        isDisclaimerVisible = false;
    }
}

/************* When Shift + Tab is pressed, hide the dropdown entirely *************/
var isArrowHidden = false;
var keys = {};
window.addEventListener("keydown", function(e) {
    if(e.key == "Shift") {
        keys.shift = true;
    }
    if(e.key == "Tab") {
        keys.tab = true;
    }
    if(keys.shift && keys.tab) {
        if(!isArrowHidden) {
            document.getElementById("headerthing").style.display = "none";
            isArrowHidden = true;
        } else {
            document.getElementById("headerthing").style.display = "inline-block";
            isArrowHidden = false;
        }
    }
}, false)
window.addEventListener("keyup", function(e) {
    if(e.key == "Shift") {
        keys.shift = false;
    }
    if(e.key == "Tab") {
        keys.tab = false;
    }
}, false)

/************* Detect if the collapse button and the game window are overlapping *************/
function getMargin(element) {
    var style = window.getComputedStyle(element);
    var marginLeft = parseInt(style.marginLeft);
    var marginRight = parseInt(style.marginRight);
    var marginTop = parseInt(style.marginTop);
    var marginBottom = parseInt(style.marginBottom);
    return marginLeft + marginRight + marginTop + marginBottom;
}

function areElementsOverlapping(element1, element2) {
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();

    var rect1Width = rect1.width - getMargin(element1);
    var rect1Height = rect1.height - getMargin(element1);
    
    var rect2Width = rect2.width - getMargin(element2);
    var rect2Height = rect2.height - getMargin(element2);

    var overlap = rect1.left < rect2.left + rect2Width &&
    rect1.left + rect1Width > rect2.left &&
    rect1.top < rect2.top + rect2Height &&
    rect1.top + rect1Height > rect2.top;

    return overlap;
}

function checkOverlap() {
    var canvasthing = document.querySelector('#game-area canvas')
    if(canvasthing) {
      var isArrowOverlapping = areElementsOverlapping(document.getElementById("collapse"),canvasthing);
      document.getElementById("headerthing").style.visibility = isArrowOverlapping ? "hidden" : "visible"
      clearInterval(loadInterval);
    }
}

//window.addEventListener("resize",checkOverlap);

//for when the page first loads and arrow is overlapping
//var loadInterval = setInterval(checkOverlap,100);