/*
UPDATE : 2017.02.
AUTHOR : SUJIN LEE (sujinlee.me@gmail.com)
*/

/*-- Image Preloading Effect --*/
function loadPreImage() {
    let placeholder = document.querySelectorAll('.placeholder'),
        imgSmall = document.querySelectorAll('.img-small');

    for (let i=0; i < placeholder.length; i++) {
         // 1. Load small image and show it
        let img = new Image();
        img.src = imgSmall[i].src;
        img.onload = function () {
            imgSmall[i].classList.add('_loaded');
        };

        // 2. Load large image
        let imgLarge = new Image();
        imgLarge.src = placeholder[i].dataset.large;
        imgLarge.onload = function () {
            imgLarge.classList.add('_loaded');
        };
        placeholder[i].appendChild(imgLarge);
    };
}



/*-- Check Device Type ---*/
var isMobile = {
    Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

function chkDeviceType(){
    const browserType = isMobile.any()?"mobile":"not mobile";
    return browserType;
}

/*-- Show Navigation Menu --*/
const menuIcon = document.getElementsByClassName("ico_menu")[0];
let gnb = document.getElementsByClassName("gnb")[0];

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

/*-- Disqus Comment --*/
(function() {
    var d = document,
        s = d.createElement('script');
    s.src = '//sujinlee.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();