/*
 ** 插件开发简单说明
 *  1. 匿名函数传参避免$冲突
 *  2. this指向的原型为对象本身
 *  3. 返回this保持插件的链式结构
 *  4. 使用$.extend修改默认设置
 *  5. 使用一个对象包裹所有方法避免多个命名空间
 */
'use strict';

(function($) {
  $.fn.dxSlider = function(mfn) {

    //插件方法
    var methods = {
      init: function(opts) {
        // 默认选项
        var options = $.extend({
          mode: "default", //定义模式，默认垂直
          points: false, //是否添加指示点，默认false
          arrow: true, // 是否添加上滑箭头，默认为true
          change:function(e){}, //翻页时回调函数
          afterChange:function(e){} //翻页完成时回调函数
        }, opts)

        //定义全局事件
        var xStart = null,
          yStart = null,
          xEnd = null,
          yEnd = null;

        //返回值
        return this.each(function() {
          var pageWrap = $(this); //容器
          var pages = pageWrap.children(".page"); //所有子页面；
          $(pages[0]).addClass("current");

          if (options.arrow) {
            pages.append('<div class="dx-arrow animated infinite fadeInUp"></div>');
            $(pages[pages.length - 1]).find(".dx-arrow").remove();
          }

          //下一页
          function nextPage() {
            var cPage = pageWrap.children(".current");
            var index = cPage.index();
            if (index === (pages.length - 1)) return false;
            cPage.parent().removeClass().addClass("go2next")
            cPage.removeClass('current').next().addClass("current");
            animation();
          }
          //上一页
          function prevPage() {
            var cPage = pageWrap.children(".current");
            var index = cPage.index();
            if (index === 0) return false;
            cPage.parent().removeClass().addClass('go2prev')
            cPage.removeClass('current').prev().addClass("current");
            animation();
          }

          //touch开始事件
          function tStart(e) {
            if (options.mode === 'default') {
              yStart = e.pageY;
            }
          }
          //touch结束事件
          function tEnd(e) {
            if (options.mode === 'default') {
              yEnd = e.pageY;
              if (Math.abs(yEnd - yStart) > 50) {
                if (yEnd < yStart) nextPage();
                if (yEnd > yStart) prevPage();
              }
            }
          }
          // 绑定动画
          function animation() {
            $(".current .animated").each(function() {
              var $this = $(this);
              var name = $this.data("animation"); //动画动作
              var delay = $this.data("delay") ? $this.data("delay") : 0; //动画延时
              var loop = $this.data("infinite"); //动画循环
              if (name) {
                setTimeout(function() {
                  $this.addClass(name);
                  if (loop) $(this).addClass("infinite");
                }, parseInt(delay, 10))
              }
            })
          }
          animation();
          // 全局绑定事件
          $(document)
            .on('touchstart', '.page', function(e) {
              tStart(e.changedTouches[0]);
            })
            .on('touchmove', '.page', function(e) {
              e.preventDefault(); //禁止touchmove默认事件
            })
            .on('touchend', '.page', function(e) {
              tEnd(e.changedTouches[0]);
            })

        })
      },
      destroy: function() {
        $(window).off(".dxSlider")
      }
    }

    if (methods[mfn]) {
      return methods[mfn].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methods === 'object' || methods) {
      return methods.init.apply(this, arguments);
    }
  }

})(Zepto)