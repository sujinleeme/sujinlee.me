$('.title').fadeIn(1000,function() {
    $('.index-title').fadeIn(1500,function() {
      $('.large-header').fadeIn(1900)
      $('.footer').fadeIn(1900);
    });
});


/*-- mouse effect --*/
/*
title: Connections with JavaScript
date: Aug 4, 2013
author: Matheus Marsiglio
available at: http://codepen.io/matmarsiglio/pen/Avmxb
*/

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  console.log('mobile is working')
  var canvasDots = function() {
      var canvas = document.querySelector('canvas'),
          ctx = canvas.getContext('2d'),
          colorDot = '#6200ea',
          color = '#fff';
      canvas.width = window.innerWidth;
      canvas.height = (window.innerHeight) - 120;
      canvas.style.display = 'block';
      ctx.fillStyle = colorDot;
      ctx.lineWidth = 0.15;
      ctx.strokeStyle = color;
      var mousePosition = {
          x: 10 * canvas.width / 100,
          y: 10 * canvas.height / 100
      };
      var dots = {
          nb: 150,
          distance: 30,
          d_radius: 20,
          array: []
      };

      function Dot() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = -0.5 + Math.random();
          this.vy = -0.5 + Math.random();
          this.radius = 1 + Math.random();
      }
      Dot.prototype = {
          create: function() {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,
                  false);
              ctx.fill();
          },
          animate: function() {
              for (i = 0; i < dots.nb; i++) {
                  var dot = dots.array[i];
                  if (dot.y < 0 || dot.y > canvas.height) {
                      dot.vx = dot.vx;
                      dot.vy = -dot.vy;
                  } else if (dot.x < 0 || dot.x > canvas.width) {
                      dot.vx = -dot.vx;
                      dot.vy = dot.vy;
                  }
                  dot.x += dot.vx;
                  dot.y += dot.vy;
              }
          },
          line: function() {
              for (i = 0; i < dots.nb; i++) {
                  for (j = 0; j < dots.nb; j++) {
                      i_dot = dots.array[i];
                      j_dot = dots.array[j];
                      if ((i_dot.x - j_dot.x) < dots.distance && (
                              i_dot.y - j_dot.y) < dots.distance && (
                              i_dot.x - j_dot.x) > -dots.distance &&
                          (i_dot.y - j_dot.y) > -dots.distance) {
                          if ((i_dot.x - mousePosition.x) < dots.d_radius &&
                              (i_dot.y - mousePosition.y) < dots.d_radius &&
                              (i_dot.x - mousePosition.x) > -dots.d_radius &&
                              (i_dot.y - mousePosition.y) > -dots.d_radius
                          ) {
                              ctx.beginPath();
                              ctx.moveTo(i_dot.x, i_dot.y);
                              ctx.lineTo(j_dot.x, j_dot.y);
                              ctx.stroke();
                              ctx.closePath();
                          }
                      }
                  }
              }
          }
      };

      function createDots() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (i = 0; i < dots.nb; i++) {
              dots.array.push(new Dot());
              dot = dots.array[i];
              dot.create();
          }
          dot.line();
          dot.animate();
      }
      window.onmousemove = function(parameter) {
          mousePosition.x = parameter.pageX;
          mousePosition.y = parameter.pageY;
      }
      mousePosition.x = window.innerWidth / 2;
      mousePosition.y = window.innerHeight / 2;
      setInterval(createDots, 1000 / 40);
  };
  window.onload = function() {
      canvasDots();
  };
}else
{
var canvasDots = function() {
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        colorDot = '#6200ea',
        color = '#fff';
    canvas.width = window.innerWidth;
    canvas.height = (window.innerHeight) - 120;
    canvas.style.display = 'block';
    ctx.fillStyle = colorDot;
    ctx.lineWidth = .15;
    ctx.strokeStyle = color;
    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };
    var dots = {
        nb: 200,
        distance: 40,
        d_radius: 500,
        array: []
    };

    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = -0.5 + Math.random();
        this.vy = -0.5 + Math.random();
        this.radius = 1 + Math.random();
    }
    Dot.prototype = {
        create: function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,
                false);
            ctx.fill();
        },
        animate: function() {
            for (i = 0; i < dots.nb; i++) {
                var dot = dots.array[i];
                if (dot.y < 0 || dot.y > canvas.height) {
                    dot.vx = dot.vx;
                    dot.vy = -dot.vy;
                } else if (dot.x < 0 || dot.x > canvas.width) {
                    dot.vx = -dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        },
        line: function() {
            for (i = 0; i < dots.nb; i++) {
                for (j = 0; j < dots.nb; j++) {
                    i_dot = dots.array[i];
                    j_dot = dots.array[j];
                    if ((i_dot.x - j_dot.x) < dots.distance && (
                            i_dot.y - j_dot.y) < dots.distance && (
                            i_dot.x - j_dot.x) > -dots.distance &&
                        (i_dot.y - j_dot.y) > -dots.distance) {
                        if ((i_dot.x - mousePosition.x) < dots.d_radius &&
                            (i_dot.y - mousePosition.y) < dots.d_radius &&
                            (i_dot.x - mousePosition.x) > -dots.d_radius &&
                            (i_dot.y - mousePosition.y) > -dots.d_radius
                        ) {
                            ctx.beginPath();
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }
    };

    function createDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
            dot = dots.array[i];
            dot.create();
        }
        dot.line();
        dot.animate();
    }
    window.onmousemove = function(parameter) {
        mousePosition.x = parameter.pageX;
        mousePosition.y = parameter.pageY;
    }
    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;
    setInterval(createDots, 1000 / 40);
};
window.onload = function() {
    canvasDots();
};
}
