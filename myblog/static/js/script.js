/*-- open navigation menu --*/
$(".Meun-Button").on("click", function(e) {
    $(this).parent().toggleClass("is-Open");
});

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

/*-- like button --*/
/*
Reference Code
title: Periscope Likes Tutorial
date: Jun 6, 2015
author: Zan Ilic
available at: http://zanilic.com/periscope-likes-tutorial-jquery-css3
*/

$(document).ready(function() {
$('button').on('click', function() {
  // change button type by clicking
  $('.heart-shaped').toggle();

  // initailize
  var rand = Math.floor((Math.random() * 100) + 1);
  var flows = ["flows"];
  var colors = ["heart-particle-col"];
  var timing = (1.3).toFixed(1);

  // Animate Particle
  $('<div class="heart-particle part-' + rand + ' ' + colors[Math.floor((Math.random()))] + '" style="font-size:' + Math.floor(Math.random() * (28 - 12)) + 'px;"><i class="fa fa-heart"></i><i class="fa fa-heart"></i></div>').appendTo('.heart-particle-box').css({
    animation: "" + flows[Math.floor((Math.random()))] + " " + timing + "s linear"
  });
  $('.part-' + rand).show();
  // Remove Particle
  setTimeout(function() {
    $('.part-' + rand).remove();
  }, timing * 1000 - 100);
});
});


/* like counting */
$(document).ready(function() {
    $('.post-likes').click(function() {
        var id;
        id = $(this).attr('data-post-id');
        $.get('/like-blog/', {
            post_id: id
        }, function(data) {
            $('.like_count_blog').html(data);
        });
    });
});

$(document).ready(function() {
    $('.project-likes').click(function() {
        var id;
        id = $(this).attr('data-project-id');
        $.get('/like-project/', {
            project_id: id
        }, function(data) {
            $('.like_count_project').html(data);
        });
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

/*-- click button --*/
/*
title: Rippleria Plugin
date: Aug 4, 2013
author: Nsept
available at: https://github.com/nsept/rippleria
*/
(function($, window, document, undefined) {
    function Rippleria(element, options) {
        var base = this;
        this.$element = $(element);
        this.options = $.extend({}, Rippleria.Defaults, this._getOptionsFromElementAttributes(),
            options);
        this._prepare();
        this._bind();
    };
    Rippleria.prototype._bind = function() {
        var elem = this.$element,
            options = this.options,
            ink, d, x, y, isTouchSupported, eventType;
        isTouchSupported = 'ontouchend' in window || window.DocumentTouch &&
            document instanceof DocumentTouch;
        eventType = isTouchSupported == true ? 'touchend.rippleria' :
            'click.rippleria';
        this.$element.bind(eventType, function(e) {
            e.stopPropagation();
            var ink = $("<span class='rippleria-ink'></span>");
            elem.prepend(ink);
            if (options.color != undefined) {
                ink.css('background-color', options.color);
            }
            ink.css('animation', 'rippleria ' + options.duration /
                1000 + 's ' + options.easing);
            setTimeout(function() {
                ink.remove();
            }, parseFloat(options.duration));
            if (!ink.height() && !ink.width()) {
                d = Math.max(elem.outerWidth(), elem.outerHeight());
                ink.css({
                    height: d,
                    width: d
                });
            }
            if (isTouchSupported == true) {
                var touch = e.originalEvent.touches[0] || e.originalEvent
                    .changedTouches[0];
                x = touch.pageX - elem.offset().left - ink.width() /
                    2;
                y = touch.pageY - elem.offset().top - ink.height() /
                    2;
            } else {
                x = e.pageX - elem.offset().left - ink.width() /
                    2;
                y = e.pageY - elem.offset().top - ink.height() /
                    2;
            }
            ink.css({
                top: y + 'px',
                left: x + 'px'
            });
        });
    }
    Rippleria.prototype._prepare = function() {
        var elem = this.$element;
        if (elem.css('position') == 'static') {
            elem.css('position', 'relative');
        }
        elem.css('overflow', 'hidden');
        var disp = elem.css('display') == 'block' ? 'block' :
            'inline-block';
        elem.css('display', disp);
        elem.wrapInner("<div class='rippleria-wrap'></div>");
    };
    Rippleria.prototype._getOptionsFromElementAttributes = function() {
        var base = this;
        attrs = {};
        $.each(Rippleria.Defaults, function(option, val) {
            var attr = base.$element.attr('rippleria-' + option);
            if (attr != null) {
                attrs[option] = attr;
            }
        });
        return attrs;
    };
    Rippleria.prototype.changeColor = function(color) {
        this.options.color = color;
    }
    Rippleria.prototype.changeEasing = function(easing) {
        this.options.easing = easing;
    }
    Rippleria.prototype.changeDuration = function(duration) {
        this.options.duration = duration;
    }
    Rippleria.Defaults = {
        duration: 750,
        easing: 'linear',
        color: undefined
    };
    $.fn.rippleria = function(option) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var $this = $(this),
                data = $this.data('rippleria');
            if (!data) {
                data = new Rippleria(this, typeof option ==
                    'object' && option);
                $this.data('rippleria', data);
            }
            if (typeof option == 'string' && option.charAt(0) !==
                '_') {
                data[option].apply(data, args);
            }
        });
    };
    $(function() {
        $('[rippleria]').rippleria();
    });
})(window.jQuery, window, document);

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
