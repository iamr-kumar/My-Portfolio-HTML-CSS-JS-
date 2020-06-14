
var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

$(document).ready(function () {
  $(document).on("scroll", onScroll);
  
  //smoothscroll
  $('#mySidenav .nav-link, #hire-button, .back-to-top a').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");


      $('a').each(function () {
          $(this).removeClass('active');
      })
      $(this).addClass('active');
    
      var target = this.hash,
          menu = target;
      $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top+2
      }, 800, 'swing', function () {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
      });
  });

  $('#mySidenav .nav-link').on("click", () => {
    $('.sidenav').removeClass('show-on-smallscreen');
    $('#ham-menu').toggleClass('fa-times');
    $('#ham-menu').toggleClass('fa-bars');
  });

  $('#hamburger-menu').on('click', () => {
    $('.sidenav').toggleClass('show-on-smallscreen');
    $('#ham-menu').toggleClass('fa-times');
    $('#ham-menu').toggleClass('fa-bars');

  });

  var left = $('#main').css("margin-left");
  if(left == "340px"){
    $('.sidenav').addClass('show-on-bigscreen');
  }

  $("#send-message").on("click", () => {
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();
    if(name && email && message && email.includes("@")){
      $('#sent-message').css("display","block");
    }
  });

});

function onScroll(event){
  var scrollPos = $(document).scrollTop();
  $('#mySidenav a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('#mySidenav ul li a').removeClass("active");
          currLink.addClass("active");
      }
      else{
          currLink.removeClass("active");
      }
  });
}