{% raw %}

/**
* Show/hide the scroll-to-top button according to scrollbar position
*/

$(function() {

  //console.log('document height', $(document).height());
  //console.log('window height', window.innerHeight);
  //console.log('window scrollTop', $(window).scrollTop());

  var scrollTopOffset;
  var scrollTopButtonFadeDuration = 300;
  //var $links = $('a').filter('[href="#top"]');
  var $targets = $('.reveal');

  if ($targets && $targets.length) {
    //if ($(document).height() > window.innerHeight) {

      // If the link is in a navbar, use the navbar instead
      /*var $navbar = $targets.closest('.navbar').parent('div');
      if ($navbar.length) {
        $targets = $navbar;
        //$(window).resize(function() {
        //  if ($(document).height() > window.innerHeight) {
        //    $targets.show();
        //  } else {
        //    $targets.hide();
        //  }
        //});
      }*/

      $targets.fadeOut();

      $(window).on('scroll', function() {
        var scrollHeight = $(document).height();
        if (scrollHeight > 0) {
          var scrollTop = $(this).scrollTop();
          var viewportHeight = $(window).height();
          //console.log('document height', $(document).height());
          //console.log('window height', viewportHeight);
          //console.log('window scrollTop', scrollTop);
          var opacity = 1 - (scrollHeight - viewportHeight - scrollTop) / (scrollHeight - viewportHeight);
          if (scrollTop > (scrollTopOffset || viewportHeight)) {
            $targets.stop().fadeTo(scrollTopButtonFadeDuration, opacity);
          } else {
            $targets.stop().fadeOut(scrollTopButtonFadeDuration);
          }
        }
      });

    //} else {
    //  $targets.hide();
    //}
  }

});
{% endraw %}
