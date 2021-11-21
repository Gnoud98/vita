(function ($) {
  window.onload = function () {
    $(document).ready(function () {
      menuMobile();
      backToTop();
      activityHover();
      activitySlider();
      duplicateSlides();
      showQuestion();
      if ($(window).width() < 992) {
        $(".menu-mobile").css("display", "block");
      }
    });
  };
})(jQuery);
new WOW().init();
function menuMobile() {
  if (
    $(".bar__mb").length ||
    $(".menu-mobile").length ||
    $(".overlay").length
  ) {
    $(".bar__mb").click(function () {
      $(this).toggleClass("active");
      $(".overlay").addClass("overlay-active");
      $(".menu-mobile").addClass("menu-mobile-active");
      $("body").addClass("hidden");
    });
    $(".overlay").click(function () {
      $(".overlay").removeClass("overlay-active");
      $(".menu-mobile").removeClass("menu-mobile-active");
      $("body").removeClass("hidden");
      $(".bar__mb").removeClass("active");
    });
    $(".menu-mobile-close").click(function () {
      $(".overlay").removeClass("overlay-active");
      $(".menu-mobile").removeClass("menu-mobile-active");
    });
  }

  $(".menu-mobile ul li.menu-item-has-children>ul").before(
    `<span class="li-plus"></span>`
  );
  $(
    ".menu-mobile ul li.current-menu-parent.menu-item-has-children .li-plus"
  ).addClass("clicked");

  if ($(".li-plus").length) {
    $(".li-plus").click(function (e) {
      if ($(this).hasClass("clicked")) {
        $(this).removeClass("clicked").next("ul").slideUp(500);
      } else if ($(this).not(".clicked")) {
        $(".menu-mobile ul li > ul").slideUp(500);
        $(".li-plus").removeClass("clicked");
        $(this).addClass("clicked").next("ul").slideDown(500);
      } else if ($(this).parents().siblings("a").hasClass("clicked")) {
        $(".clicked").slideDown();
        $(".menu-mobile ul li > ul").slideUp(500);

        $(this).addClass("clicked").next("ul").slideDown(500);
      } else {
        $("#nav li a").removeClass("clicked").next("ul").slideUp(500);

        $(this).addClass("clicked").next("ul").slideDown(500);
      }
    });
  }
}

function backToTop() {
  var $backToTop = $(".back-to-top");
  $backToTop.hide();

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $backToTop.fadeIn();
    } else {
      $backToTop.fadeOut();
    }
  });

  $backToTop.on("click", function (e) {
    $("html, body").animate({ scrollTop: 0 }, 50);
  });
}

function activityHover() {
  $(document).on("mouseover", ".activity-item", function () {
    $(this).addClass("show");
    $(this).find(".activity-bottom").show(300);
  });
  $(document).on("mouseleave", ".activity-item", function () {
    $(this).find(".activity-bottom").hide(300);
    $(this).removeClass("show");
  });
}

function activitySlider() {
  var $carousel = $(".home__activity-slider").flickity({
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true,
    contain: true,
    cellAlign: "left",
  });
  $(".button-group").on("click", ".button", function () {
    $(".button-group .button").removeClass("is-selected");
    $(this).addClass("is-selected");
    var index = $(this).index();
    $carousel.flickity("select", index);
  });
}

function duplicateSlides(cellSelector) {
  var $slides = $(cellSelector).clone();
  $slides.addClass("show-if-flickity-enabled");
  $(cellSelector).last().after($slides);
}

duplicateSlides(".home__activity .activity-item");

function showQuestion() {
  $(".question-title").click(function () {
    $(this).toggleClass("rotate");
    $(this).siblings(".question-desc").slideToggle();
  });

  $(".question-item:first-child .question-title").addClass("rotate")
}
