{% raw %}
(function ($, window, document) {
  'use strict';


  /**
  * Force the flipcard to close when user click a checked radio
  */

  $('.flipcard-toggler').on('click', function() {
    var $input = $(this).parents('.flipcard').prev('input');
    console.log('input', $input);
    if ($input) {
      var $uncheck = $('input[name="' + $input.attr['name'] + '"]').filter('[value=""], [value="none"]');
      console.log($uncheck);
      if ($uncheck.length) {
        $uncheck.prop('checked', true).trigger('change');
      } else {
        var checked = $input.prop('checked');
        //$(this).parents('.flipcard').find('[title], [data-toggle="tooltip"]').tooltip('hide');
        //$tooltips.tooltip('hide');
        $input.prop('checked', !checked).trigger('change');
      }
    }
  });


})(window.jQuery, window, document);
{% endraw %}
