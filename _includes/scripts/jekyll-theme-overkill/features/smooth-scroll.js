{% raw %}

/**
* Smooth scroll up to anchors
*/

$(function() {

    var scrollTopDuration = 1000;
    $('a').filter('[href*="#"]').not('[href="#"]').not('[data-toggle="modal"]').not('[data-toggle="collapse"]').not('[data-toggle="tab"]').click(function (e) {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

        var id = decodeURIComponent(this.hash);
        var $target = $(id) || $('[name=' + id.slice(1) +']');

        if ($target && $target.length) {

          var $parents = $target.parents('.card');
          if ($parents && $parents.length) {
            var top = $parents.first().offset().top;
          } else {
            var top = $target.offset().top;
          }

          var paddingTop = parseFloat($('body').css('padding-top')) || 0;

          // Scroll up to target
          $('html, body').stop().animate({
            scrollTop: top - paddingTop
          }, scrollTopDuration, 'swing', function () {

            // Blink target (or section)
            var $sectionItems = $('.card').filter('[data-section="' + $target.attr('id') + '"]');
            if ($sectionItems && $sectionItems.length) {
              var $highlighted = $sectionItems;
            } else if ($target.is('h1, h2, h3, h4, a, p')) {
              var $highlighted = $target;
            }

            if ($highlighted && $highlighted.length) {
              var duration = 300;
              var repeat = 2;
              var interval = setInterval(function () {
                $highlighted.fadeToggle(duration);
              }, duration);
              setTimeout(function () {
                clearInterval(interval);
                $highlighted.fadeIn(duration);
              }, duration * repeat - duration);
            }

          });

          return false;

        }
      }
    });

});
{% endraw %}
