/*
UPDATE : 2017.02.
AUTHOR : SUJIN LEE (sujinlee.me@gmail.com)
*/


/* Disqus Comment */
// (function() {
//     var d = document,
//         s = d.createElement('script');
//     s.src = '//sujinlee.disqus.com/embed.js';
//     s.setAttribute('data-timestamp', +new Date());
//     (d.head || d.body).appendChild(s);
// })();



/* Like Button Counting : AJAX with Django */
const buttonLike = document.getElementsByClassName("btn_like")[0];
const likeData = document.getElementsByClassName("like_count")[0];
let icon = buttonLike.getElementsByClassName("icon-heart");
var url;

buttonLike.addEventListener("click", function(evt){
   let id = this.getAttribute('data-post-id');
   let xhr = new XMLHttpRequest();

    if (buttonLike.classList.contains('blog-like')) {
        var url = '/like_count_blog/?post_id='+id;
    }
    if (buttonLike.classList.contains('project-like')) {
        var url = '/like_count_project/?project_id='+id;
    }

    xhr.open('GET', url);
    xhr.onload = function() {
    if (xhr.status === 200) {
        likeData.innerHTML = xhr.responseText;
        toggleLikeIcon();
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();
});

function toggleLikeIcon(){
    for (let ele of icon){
        if (ele.style.display === 'none') {
            ele.style.display = 'block';
        } else {
            ele.style.display = 'none';
        }
    }
};


/* Open External Links in blog post & social Icons in New Window */
const postBody = document.getElementsByClassName("post_body")[0];
const postBodyLinks = Array.prototype.slice.call(postBody.querySelectorAll('a'));


postBodyLinks.forEach(function(e){
    e.addEventListener("click", function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        window.open(this.href);
    })
});

/* Hide Side bar to shwo wide post */
const buttonExpand = document.getElementsByClassName("btn_expand")[0];
const main = document.querySelectorAll("main")[0];
var container = document.getElementById("container");
let sideNav = document.getElementById("snb_left_box");
let mainBox = document.getElementById("main_box");

buttonExpand.addEventListener("click", function(evt) {
    let target = evt.target;
    if (target.tagName === "BUTTON") {
        container.classList.toggle("_expand-main");
        sideNav.classList.toggle("_expand-nav");
        mainBox.classList.toggle("_expand-main_box");
    }
});


/* Move to page top */
const buttonGoTop = document.getElementsByClassName("btn_gototop")[0];

main.addEventListener("scroll", function(evt){
    let target = evt.target;
    let showPageScrollY = 200;
    if (main.scrollTop > showPageScrollY) {
        buttonGoTop.classList.add('_fadeIn');
    }
    else {
        buttonGoTop.classList.remove('_fadeIn');
    }
});

buttonGoTop.addEventListener("click", function(evt){
    let target = evt.target;
        if (target.tagName === "BUTTON") {
            let pageScrollY = main.scrollTop;
            moveTop(pageScrollY, 30, 4);
        }
    
    function moveTop(from, distance, duration){
        if (from >= 0) {
            let posY = from-distance;
            main.scrollTop = posY;
            setTimeout(function() {
                (moveTop(posY, distance));
            }, duration);
            return
        }
    }
});


const buttonShare = Array.prototype.slice.call(document.getElementsByClassName("btn_share"));



for (let i = 0; i < buttonShare.length; i++) { 
    buttonShare[i].addEventListener("click", function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        let target = evt.target;
        target = buttonShare[i].href;
        popupWindow(target, 100, 100);
});
}


function popupWindow(url, w, h) {
  params = 'width=' + w + ', height=' + h + ', ' + 'left=' + wleft + ', top=' + wtop + ', ' + tools;
  return window.open(url, params);
} 




// function popupwindow(url, title, w, h) {
//   var left = (screen.width/2)-(w/2);
//   var top = (screen.height/2)-(h/2);
//   return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
// } 


/*-- social popup UI --*/
// (function($){
//   $.fn.customerPopup = function (e, intWidth, intHeight, blnResize) {

//     // Prevent default anchor event
//     e.preventDefault();

//     // Set values for window
//     intWidth = intWidth || '500';
//     intHeight = intHeight || '400';
//     strResize = (blnResize ? 'yes' : 'no');

//     // Set title and open popup with focus on it
//     var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
//         strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
//         objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
//   }
//   // pop new window
//   $(document).ready(function ($) {
//     $('.customer.share').on("click", function(e) {
//       $(this).customerPopup(e);
//     });
//   });

// }(jQuery));
