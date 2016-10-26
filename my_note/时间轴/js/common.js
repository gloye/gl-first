var Common = function () {
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i) ? true : false;
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    any: function () {
      return (isMobile.Android() || isMobile.iOS() );
    }
  };
  var searchBar = function () {
    $(".search-a").click(function (e) {
      e.preventDefault();
      $(this).addClass("faded");
      $(".navbar-nav>li>a").addClass("faded");
      $(".navbar-form").addClass("in");
    });
    $(".search-cls").click(function () {
      $(".navbar-form").removeClass("in");
      function removeAim() {
        $(".navbar-nav>li>a,.search-a").removeClass("faded")
      }

      setTimeout(removeAim, 300);
    })
  };

  var follow = function(){
    $(".wechat").hover(function(){
      $(".code-wrap").addClass("in");
    },function(){
      $(".code-wrap").removeClass("in");
    })
  }
  var tab = function () {
    $(".j_tab a").click(function (e) {
      e.preventDefault();
      $(this).tab("show");
    })
  }
  var banner = function () {
    $(".banner-list").bxSlider({
      mode: "fade" ,
      nextSelector: ".banner-next",
      nextText: "&#xe615;",
      prevSelector: ".banner-prev",
      prevText: "&#xe615;",
      auto:true
    });
  }
  var productSlider= function(){
    window.onload = function(){
      $(".item-show-list").bxSlider({
        slideWidth: 110,
        slideMargin: 10,
        moveSlides: 1,
        minSlides: 4,
        maxSlides: 4,
        pager: false,
        infiniteLoop:false,
        nextSelector: ".show-next",
        nextText: "&#xe610;",
        prevSelector: ".show-prev",
        prevText: "&#xe611;"
      })
    }
  }
  var commendSlider = function(){
    if(isMobile.any()) {
      $(".commend-list").bxSlider({
        pager: false,
        nextSelector: ".commend-next",
        nextText: "&#xe610;",
        prevSelector: ".commend-prev",
        prevText: "&#xe611;"
      })
      return;
    }
    $(".commend-list").bxSlider({
      slideWidth: 288,
      slideMargin: 15,
      moveSlides: 4,
      minSlides: 4,
      maxSlides: 4,
      pager: false,
      nextSelector: ".commend-next",
      nextText: "&#xe610;",
      prevSelector: ".commend-prev",
      prevText: "&#xe611;"

    })
  }
  return {
    init: function () {
      searchBar();
      banner();
      tab();
      productSlider();
      commendSlider();
      follow();
    }
  }

}();
