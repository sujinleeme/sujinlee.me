/*
UPDATE : 2017.02.
AUTHOR : SUJIN LEE (sujinlee.me@gmail.com)
*/

/*-- Image Preloading Effect --*/
function loadPreImage() {
  var placeholder = document.querySelector('.placeholder'),
      small = placeholder.querySelector('.img-small');
  // 1. Load small image and show it
  var img = new Image();
  
  img.src = small.src;
  img.onload = function () {
   small.classList.add('_loaded');
  };
  
  // 2. Load large image
  var imgLarge = new Image();
  imgLarge.src = placeholder.dataset.large; 
  imgLarge.onload = function () {
    imgLarge.classList.add('_loaded');
  };
  placeholder.appendChild(imgLarge);
}

/*-- Check Device Type ---*/
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

/*-- facebook OG Tag --*/
window.fbAsyncInit = function() {
    FB.init({
        appId: '1081681621896558',
        xfbml: true,
        version: 'v2.3'
    });
};
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

