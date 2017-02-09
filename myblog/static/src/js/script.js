
/*-- open navigation menu --*/
const menuIcon = document.getElementsByClassName("ico_menu")[0];
const gnb = document.getElementsByClassName("gnb")[0];
menuIcon.addEventListener("mouseenter", function(evt){
    overMenu(evt);
});

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



/*-- like button --*/
/*
Reference Code
title: Periscope Likes Tutorial
date: Jun 6, 2015
author: Zan Ilic
available at: http://zanilic.com/periscope-likes-tutorial-jquery-css3
*/

/* like counting */
const buttonLike = document.getElementsByClassName("btn_like")[0];
const likeData = document.getElementsByClassName("like_count")[0];
let icon = buttonLike.getElementsByClassName("icon-heart");

console.log(icon);
buttonLike.addEventListener("click", function(evt){
   let id = this.getAttribute('data-post-id');
   var xhr = new XMLHttpRequest();
    xhr.open('GET', '/like_count_blog/?post_id='+id);
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



// $('.btn_like').click(function() {
//         var id;
//         id = $(this).attr('data-post-id');
//         $.get('/like-blog/', {
//             post_id: id
//         }, function(data) {
//             $('.like_count_blog').html(data);
//         });
//     $('.icon-heart').toggle();
//     });
    
$(document).ready(function() {
    $('.project-likes').click(function() {
        var id;
        id = $(this).attr('data-project-id');
        $.get('/like-project/', {
            project_id: id
        }, function(data) {
            $('.like_count_project').html(data);
        });
    $('.btn_like').toggle();
    });
});

/*-- Disqus Comment --*/
(function() {
    var d = document,
        s = d.createElement('script');
    s.src = '//sujinlee.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();


/* open new window */
$(document).ready(function() {
    $(".newtab").attr("target", "_blank");
});


/* sticky back to the top button */
$(document).ready(function() {
    // Show or hide the sticky footer button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.go-top').fadeIn(200);
        } else {
            $('.go-top').fadeOut(200);
        }
    });
    // Animate the scroll to top
    $('.go-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    })
});
