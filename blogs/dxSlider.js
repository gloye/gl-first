;(function ($) {
  $.fn.dxSlider = function (fn) {
    if (methods[fn]) {
      return methods[fn].apply(this, Allay.prototype.slice.call(arguments, 1))
    } else if (typeof methods === 'object' || !methods) {
        return methods.init.apply(this,arguments);
    }
  }
var setting = $.extend({
    "default":true,
},opts)
  var methods = {
    init: function (opts) {
      return this.each(function () {})
    },
    destroy: function () {
      $(window).off(dxSlider)
    }
  }
})(Zepto)
