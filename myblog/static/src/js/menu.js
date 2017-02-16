/*
UPDATE : 2017.02.
AUTHOR : SUJIN LEE (sujinlee.me@gmail.com)
*/

/*-- check Device ---*/
function chkDeviceType(){
    let device;
    let ismobile=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    if (ismobile) {
        device = "mobile";
        return device;
    }
    device = "pc";
    return device;
}

/*-- Show Navigation Menu --*/
const menuIcon = document.getElementsByClassName("ico_menu")[0];
const gnb = document.getElementsByClassName("gnb")[0];

let useDevice = chkDeviceType();
let mouseEventName;
if (useDevice === "mobile") {
    mouseEventName = "click";
    menuIcon.addEventListener(mouseEventName, function(evt){
        menuIcon.classList.toggle("_active");
        gnb.classList.toggle("_show");
    });
}
else {
    mouseEventName = "mouseenter";
    menuIcon.addEventListener(mouseEventName, function(evt){
        overMenu(evt);
    });
}

function overMenu(evt){
    let target = evt.target;
    if (target.tagName === "UL") {target = menuIcon;}
        menuIcon.classList.add("_active");
        gnb.classList.add("_show");
}

gnb.addEventListener("mouseleave", function(evt){
   let target = evt.target;
   tags = ["UL", "LI", "A"];
   if (target.tagName.indexOf !== undefined){
       target = gnb;
   }
   hideMenu();
});

function hideMenu(){
    if (menuIcon.classList.contains("_active")) {
        menuIcon.classList.remove("_active");
        gnb.classList.remove("_show");
    }
}

/*-- Spend Textarea by enter key --*/
var textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', function(evt){
    let target = evt.target;
    setTimeout(function(){
        target.style.cssText = 'height:auto; padding:0';
        target.style.cssText = 'height:' + target.scrollHeight + 'px';
    },0);
    
});
    