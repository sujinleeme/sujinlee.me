/*
UPDATE : 2017.02.
AUTHOR : SUJIN LEE (sujinlee.me@gmail.com)
*/


/*-- Like Button Counting : AJAX with Django --*/
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
const sideNav = document.getElementById("snb_left_box");

buttonExpand.addEventListener("click", function(evt) {
    let target = evt.target;
    if (target.tagName === "BUTTON") {
        main.classList.toggle("_expand-main");
        sideNav.classList.toggle("_expand-nav");
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


/*-- Disqus Comment --*/
(function() {
    var d = document,
        s = d.createElement('script');
    s.src = '//sujinlee.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
