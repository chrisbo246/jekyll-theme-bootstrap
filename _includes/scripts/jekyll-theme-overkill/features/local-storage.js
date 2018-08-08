{% raw %}

/**
* Store / restore input values from the local storage
*/

(function ($, window, document) {
  'use strict';

  if (typeof window.localStorage === 'undefined') {
    console.log('Speech synthesis not supported by this browser.');
    return false;
  }


  var storage = window.localStorage;

  var defaultNamespace = encodeURIComponent(window.location.pathname) + ':';


  // Store / restore checked definitions

  var $inputs = $(':input').not('[data-storage="false"]'); //.filter('[id]');
  if ($inputs && $inputs.length) {
    var $input, $label, name, id, checked, key, value, type, namespace;

    // Restore inputs values from stored values

    $inputs.each(function () {
      $input = $(this);
      $label = $input.parent('.btn');
      name = $input.attr('name');
      id = $input.attr('id');
      namespace = ($input.is('[data-global="false"]')) ? defaultNamespace : '';
      type = $input.attr('type');

      if (type === 'radio') {
        key = name;
      } else {
        key = id || name;
      }

      /*if (type === 'radio') {
        if (name) {
          key = name;
          value = storage.getItem(namespace + key);
          if (value !== null) {
            value = JSON.parse(value);
            if (value !== null) {
              if (value === $input.attr('value')) {
                $input.prop('checked', true).trigger('click');
                $label.addClass('active');
              }
            }
          }
        }
      } else {
        if (id || name) {
          key = id || name;*/
        if (key) {
          value = storage.getItem(namespace + key);
          if (typeof value !== 'undefined' && value !== 'undefined') {
            value = JSON.parse(value);
            //value = $.parseJSON(value);
            if (value !== null) {
              if (type === 'radio' && value === $input.attr('value')) {
                $input.prop('checked', true).trigger('click');
                $label.addClass('active');
              } else if (type === 'checkbox') {
                $input.prop('checked', value).trigger('click');
                $label.addClass('active');
              } else {
                $input.prop('value', value).trigger('change');
              }
            }
          }
        }
      //}

    });


    // Save input value to the local local storage

    $inputs.on('change', function () {

      $input = $(this);
      name = $input.attr('name');
      value = $input.attr('value');
      id = $input.attr('id');
      namespace = ($input.is('[data-global="false"]')) ? defaultNamespace : '';
      type = $input.attr('type');
      checked = $input.prop('checked');

      if (type === 'radio') {
        key = name;
      } else {
        key = id || name;
      }

      /*if (type === 'radio') {
        if (name && value) {
          key = name;
          value = JSON.stringify((checked) ? value : null);
          storage.setItem(namespace + key, value);
        }
      } else {
        if (id || name) {
          key = id || name;*/
        if (key) {
          if (type === 'radio') {
            value = JSON.stringify((checked) ? value : null);
          } else if (type === 'checkbox') {
            value = JSON.stringify(checked);
          } else {
            value = JSON.stringify(value);
          }
          storage.setItem(namespace + key, value);
        }
      //}

    });
  }


  // Check if Bootstrap is loaded before going further

  if (typeof($.fn.modal) === 'undefined') {
    return false;
  }


  var defaultNamespace = encodeURIComponent(window.location.pathname) + ':';


  /**
  * Keep alerts closed
  */

  var $alert, $collapse, $togglers, key, value, namespace;
  var $alerts = $('.alert-dismissible').filter('[id]').not('[data-storage="false"]');
  $alerts.each(function () {
    $alert = $(this);
    namespace = ($alert.is('[data-global="false"]')) ? defaultNamespace : '';
    key = $alert.attr('id');
    value = JSON.parse(storage.getItem(namespace + key));
    if (value === 'closed') {
      $alert.attr('hidden', '');
    } else {
      $alert.removeAttr('hidden');
    }
  });
  $alerts.on('closed.bs.alert', function () {
    $alert = $(this);
    namespace = ($alert.is('[data-global="false"]')) ? defaultNamespace : '';
    key = $alert.attr('id');
    value = JSON.stringify('closed');
    storage.setItem(namespace + key, value);
  });



  /**
  * Close alert animation
  */

  /*$alerts = $('.alert-dismissible');
  $alerts.on('close.bs.alert', function () {
    $(this).addClass('zoomOutUp');
  });*/



  /**
  * Restore collapsed elements states
  */

  var $collapses = $('.collapse').filter('[id]').not('[data-storage="false"]');
  $collapses.on('hidden.bs.collapse', function () {
    $collapse = $(this);
    namespace = ($collapse.is('[data-global="false"]')) ? defaultNamespace : '';
    key = this.id + '_collapse';
    value = false;
    storage.removeItem(namespace + key, JSON.stringify(value));
  });
  $collapses.on('shown.bs.collapse', function () {
    $collapse = $(this);
    namespace = ($collapse.is('[data-global="false"]')) ? defaultNamespace : '';
    key = this.id + '_collapse';
    value = true;
    storage.setItem(namespace + key, JSON.stringify(value));
  });
  $collapses.each(function (index, element) {
    $togglers = $('button[data-target="#' + this.id + '"], a[href="#' + this.id + '"]');
    $collapse = $(this);
    namespace = ($togglers.is('[data-global="false"]')) ? defaultNamespace : '';
    key = this.id + '_collapse';
    value = JSON.parse(storage.getItem(namespace + key));
    if (value === true) {
      $(this).collapse('show');
      $togglers.addClass('active');
    } else {
      $(this).collapse('hide');
      $togglers.removeClass('active');
    }
  });

  $('html').addClass('collapse-active');


  })(window.jQuery, window, document);
  {% endraw %}
