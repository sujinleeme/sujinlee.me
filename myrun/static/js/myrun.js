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


/* open new window */
$(document).ready(function() {
    $(".NewTab").attr("target", "_blank");
});

/* Preloader */
$(window).load(function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(350).css({
    'overflow': 'hidden'
  });
})


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

function initialize() {
  var myLatlng = new google.maps.LatLng(57.145711, -2.083082),
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