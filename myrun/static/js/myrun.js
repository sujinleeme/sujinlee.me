
/* Preloader */
$(window).load(function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(150).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(150).css({
    'overflow': 'hidden'
  });
  $('.goog-te-combo').removeAttr('checked');
})

/* navigation */
var Nav = (function() {
  
  var
  	nav 		= $('.nav'),
  	burger	= $('.burger'),
    section = $('.section'),
    section__wrapper = $('.section__wrapper')
    section__map = $('.section__map')
    page = $('.page'),
    link		= nav.find('.nav__link'),
    navH		= nav.innerHeight(),
    isOpen 	= true,
    hasT 		= false;
  
  var toggleNav = function() {
    nav.toggleClass('nav--active');
    burger.toggleClass('burger--close');
    section__wrapper.toggleClass('section__wrapper--close')
    section__map.toggleClass('section__map-close')
    shiftPage();
  };
  
  var shiftPage = function() {
    if (!isOpen) {
      page.css({
        'transform': 'translateY(' + navH + 'px)',
        '-webkit-transform': 'translateY(' + navH + 'px)'
      });
      isOpen = true;
    } else {
      page.css({
        'transform': 'none',
        '-webkit-transform': 'none'
      });
    
      isOpen = false;
    }
  };
  
  var switchPage = function(e) {
    var self = $(this);
    var i = self.parents('.nav__item').index();
    var s = section.eq(i);
    var a = $('section.section--active');
    var t = $(e.target);
    
    if (!hasT) {
      if (i == a.index()) {
        return false;
      }
      a
      .addClass('section--hidden')
      .removeClass('section--active');

      s.addClass('section--active');

      hasT = true;

      a.on('transitionend webkitTransitionend', function() {
        $(this).removeClass('section--hidden');
        hasT = false;
        a.off('transitionend webkitTransitionend');
      });
    }

    return false;
  };
  
  var keyNav = function(e) {
    var a = $('section.section--active');
    var aNext = a.next();
    var aPrev = a.prev();
    var i = a.index();
    
    
    if (!hasT) {
      if (e.keyCode === 37) {
      
        if (aPrev.length === 0) {
          aPrev = section.last();
        }

        hasT = true;

        aPrev.addClass('section--active');
        a
          .addClass('section--hidden')
          .removeClass('section--active');

        a.on('transitionend webkitTransitionend', function() {
          a.removeClass('section--hidden');
          hasT = false;
          a.off('transitionend webkitTransitionend');
        });

      } else if (e.keyCode === 39) {

        if (aNext.length === 0) {
          aNext = section.eq(0)
        } 


        aNext.addClass('section--active');
        a
          .addClass('section--hidden')
          .removeClass('section--active');

        hasT = true;

        aNext.on('transitionend webkitTransitionend', function() {
          a.removeClass('section--hidden');
          hasT = false;
          aNext.off('transitionend webkitTransitionend');
        });

      } else {
        return
      }
    }  
  };
    
  var bindActions = function() {
    burger.on('click', toggleNav);
    link.on('click', switchPage);
    $(document).on('ready', function() {
       page.css({
        'transform': 'translateY(' + navH + 'px)',
         '-webkit-transform': 'translateY(' + navH + 'px)'
      });
    });
    $('body').on('keydown', keyNav);
  };
  
  var init = function() {
    bindActions();
  };
  
  return {
    init: init
  };
  
}());

Nav.init();

/* scroll for mobile app */
$(document).ready(function() {
		$("#mobile_scroll").smoothDivScroll({
			hotSpotScrolling: false,
			touchScrolling: true,
			manualContinuousScrolling: true,
			mousewheelScrolling: false
		});
});

/* open new window */
$(document).ready(function() {
    $(".NewTab").attr("target", "_blank");
});

/* english translation */
$("#google_translate_element").change(function () {
  if ($(this).find('option:selected').val() == 'en'){
    var msg= '<h2 class="notranslate">Even if a person has never ran,<br>no one runs just one time.</h2><h2 class="notranslate">In this year, ' 
    + $('body').data('count_upcoming_events') +' out of total ' + $('body').data('count_total_events')+ ' marathon events left.</h2><h2 class="notranslate">Challenge yourself now!</h2>';
    $('.section:nth-child(1) div.trsl_msg').html(msg);
    $(".city").css("width", "5rem");
    $('table#event tbody tr td:nth-child(1)').attr('data-th', 'DATE');
    $('table#event tbody tr td:nth-child(2)').attr('data-th', 'EVENT TITLTE');
    $('table#event tbody tr td:nth-child(3)').attr('data-th', 'APPLICATION PERIOD');
    $('table#event tbody tr td:nth-child(4)').attr('data-th', 'RACE');
    $('table#event tbody tr td:nth-child(5)').attr('data-th', 'PLACE');
    $('table#event tbody tr td:nth-child(6)').attr('data-th', 'CONTENTS');
    $('table#event tbody tr td:nth-child(7)').attr('data-th', 'HOST');
    $('.section:nth-child(5) div.motivation').html('<p>I love running.</br> In Korea, <a href="http://www.marathon.pe.kr/schedule_index.html" target="_blank">Marathon Online Website</a> \
      is the most famous marathon information for 15 years website and all the runners in Korea use it.</br> \
      However, this site uses old interface design, and has several encoding issues.</br> \
      For these reasons, I have decided to revamp this website.</br> \
      For now, you can check weather forecast, location with map as well as general information and decide where you will go and enjoy next running event!</p>');
    $('.section:nth-child(5) div.development ').html('<p>After I made a simple web crawler built with Python 3.5 \
    for gathering Marathon site data.</br> I developed a data visualization website for it using Django web framework. </br> \
    Since original website has some wrong user input data related to location, time and date, several fields may not have accurate information. </br> \
    As a result, several events may not have weather or map data. </br> You can find source code on \
    <a class="github" href="https://github.com/sujinleeme/official-website/tree/master/myrun" target="_blank">GITHUB</a></p>');
  }
  else{
     var msg= '<h2 class="notranslate">한번도 안 달려본 사람은 있어도<br>한번만 달려본 사람은 없습니다</h2><h2 class="notranslate">올해 2016년, 전국 ' 
     + $('body').data('count_total_events')+'개 마라톤 대회 중</br>' + $('body').data('count_upcoming_events')
     +'개 대회가 남았습니다</h2><h2 class="notranslate">지금 도전해보세요</h2>';
     $('.section:nth-child(1) div.trsl_msg').html(msg)
     $(".city").css("width", "2.9rem");
  }
});

/* table */
var headertext = [],
headers = document.querySelectorAll("#event_title th"),
tablerows = document.querySelectorAll("#event_title th"),
tablebody = document.querySelector("#event tbody");

for(var i = 0; i < headers.length; i++) {
  var current = headers[i];
  headertext.push(current.textContent.replace(/\r?\n|\r/,""));
} 
for (var i = 0, row; row = tablebody.rows[i]; i++) {
  for (var j = 0, col; col = row.cells[j]; j++) {
    col.setAttribute("data-th", headertext[j]);
  } 
}

/*- facebook -*/
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


/* table */
var headertext = [],
headers = document.querySelectorAll(".event_title_past th"),
tablerows = document.querySelectorAll(".event_title th"),
tablebody = document.querySelector(".event_title_past tbody");

for(var i = 0; i < headers.length; i++) {
  var current = headers[i];
  headertext.push(current.textContent.replace(/\r?\n|\r/,""));
} 
for (var i = 0, row; row = tablebody.rows[i]; i++) {
  for (var j = 0, col; col = row.cells[j]; j++) {
    col.setAttribute("data-th", headertext[j]);
  } 
}


/*-- svg image --*/
/*
title: change svg to img
date: Aug 4, 2013
author: Drew Baker (http://stackoverflow.com/users/503546/drew-baker)
available at: http://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement
*/
$(function() {
    jQuery('img.svg').each(function() {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass +
                    ' replaced-svg');
            }
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            // Check if the viewport is set, else we gonna set it if we can.
            if (!$svg.attr('viewBox') && $svg.attr(
                'height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr(
                    'height') + ' ' + $svg.attr(
                    'width'))
            }
            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
});

/* daum map */

function initialize() {
  var myLatlng = new google.maps.LatLng(37, 126),
  mapOptions = {
    backgroundColor: 'tomato',
    zoom: 16,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    streetViewControl: false
  }
var map = new google.maps.Map(document.getElementById('map'), mapOptions),
contentString = '<b>FortyTwo Studio</b>,<br> Suite 1, Ground Floor<br> Provender House,<br> Waterloo Quay<br> Aberdeen<br> AB11 5BS',
infowindow = new google.maps.InfoWindow({
  content: contentString,
  maxWidth: 200
});

var marker = new google.maps.Marker({
  position: myLatlng,
  map: map
});

google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map,marker);
});

google.maps.event.addDomListener(window, "resize", function() {
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);