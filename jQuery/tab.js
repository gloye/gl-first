$(function () {
  $.fn.extend({
    tab: function (arg) {
      if (arg == 'show') {
        this.parent('li').addClass('active').siblings().removeClass('active');
        var href = this.attr('href');
        $(href).addClass('active').siblings().removeClass('active')
      }
    }
  })
})