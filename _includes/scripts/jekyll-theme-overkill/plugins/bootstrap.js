{% raw %}
(function ($, window, document) {
  'use strict';


  if (typeof $.fn.modal === 'undefined') {
    console.warn('Bootstrap is not loaded!');
    return false;
  }

  /**
  * Convert title attributs into tooltips
  */

  var $tooltips = $('[title]');
  $tooltips.filter(':not(.btn), :not(attr)').tooltip({
    'trigger': 'hover focus',
    'delay': {
      'show': 3000
    }
  });
  $tooltips.filter('.btn').tooltip({
    'trigger': 'hover',
    'delay': {
      'show': 3000
    }
  });



  /**
  * Load Disqus script only if container is shown
  */
  /*
  $('#comments').filter('.collapse').one('shown.bs.collapse', function () {
    var d = document, s = d.createElement('script');
    s.src = 'https://{% endraw %}{{ site.disqus.shortname }}{% raw %}.disqus.com/embed.js';
    s.async = true;
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  });
  */



  /**
  * Add/remove .active class to collapse togglers
  */

  var $collapses = $('.collapse').filter('[id]');
  $collapses.on('shown.bs.collapse', function () {
    $('.btn').filter('button[data-target="#' + this.id + '"], a[href="#' + this.id + '"]').addClass('active');
  });
  $collapses.on('hidden.bs.collapse', function () {
    $('.btn').filter('button[data-target="#' + this.id + '"], a[href="#' + this.id + '"]').removeClass('active');
  });



  /**
  * Hide toggler if target is missing
  */

  /*
  $('a[href*="#"], button[data-toggle][data-target*="#"]').each(function () {
    var $el = $(this);
    console.log('toggler', $el.attr('href'), $el.attr('data-target'), $el);
    var target = $el.attr('href') || $el.attr('data-target');
    if (!target || !target.match(/^#[0-9a-zA-Z_-]*$/g) || !$(target)) {
      $el.hide();
    }
  });
  */


  /**
  * Assorted alert links
  */

  $('.alert a').addClass('alert-link');
  $('.alert p').last().addClass('mb-0 d-inline');



  /**
  * Store / restore with local storage
  */


})(window.jQuery, window, document);
{% endraw %}
