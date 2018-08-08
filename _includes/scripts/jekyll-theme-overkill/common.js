{% raw %}
(function ($, window, document) {
  'use strict';

  $(function() {

    /**
    * Page leave transition with local URLs
    */

    $('a').filter('[href^="/"]').on('click', function () {
      $('.fadeInRight').addClass('fadeOutLeft');
      $('.fadeInLeft').addClass('fadeOutRight');
      $('.fadeInUp').addClass('fadeOutDown');
      $('.fadeInDown').addClass('fadeOutUp');
      var href = $(this).attr('href');
      window.setTimeout(function () {
        window.location = href;
      }, 1000);
      return false;
    });



    /**
    * Inject SVG icons
    */
    /*
    if (typeof SVGInjector !== 'undefined') {
      var injectorOptions = {
        evalScripts: 'once',
        pngFallback: 'assets/png',
        each: function (svg) {

        }
      };
      var mySVGsToInject = document.querySelectorAll('img.oi');
      SVGInjector(mySVGsToInject, injectorOptions, function (totalSVGsInjected) {

      });
    }
    */



    /**
    * Add a class to the html tag when Lazysizes is ready
    */

    $(document).one('lazybeforeunveil', function () {
      $('html').addClass('lazysizes-active');
    })



    /**
    * Uncheck checked radio
    */

    //$('label').filter('[for]').on('mousedown', function(e) {
    //  var $label = $(this);
    //  var id = $label.attr('for');
    //  var $input = $('#' + id).first();
    //  if ($input.is(':radio')) {
    //    var checked = $input.prop('checked');
    //    var name = $input.attr('name');
    //    if (checked && name) {
    //      $(':radio').filter('[name="' + name + '"][value="none"]').first().prop('checked', true).trigger('change');
    //    }
    //  }
    //});



  });

})(window.jQuery, window, document);
{% endraw %}
