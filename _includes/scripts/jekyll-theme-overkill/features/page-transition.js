{% raw %}
(function ($, window, document) {
  'use strict';

  var transitionDuration = 1000;

  /**
  * Add the page leave transition class (opposite transition) and delay page leave when user click a local link
  */

  $('a').filter('[href^="/"]').on('click', function () {

    $('.fadeInRight').addClass('fadeOutLeft');
    $('.fadeInLeft').addClass('fadeOutRight');
    $('.fadeInUp').addClass('fadeOutDown');
    $('.fadeInDown').addClass('fadeOutUp');
    var href = $(this).attr('href');

    window.setTimeout(function () {
      window.location = href;
    }, transitionDuration);
    return false;
    
  });

})(window.jQuery, window, document);
{% endraw %}
