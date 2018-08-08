{% raw %}
$(function () {

  var selector = "{% endraw %}{{ include.selector | default: '.select2' }}{% raw %}";

  if ($().select2) {

    {% endraw %}
    {%- if page.features.bootstrap != false -%}
    console.log('Select2 default theme', 'bootstrap4');
    $.fn.select2.defaults.set('theme', 'bootstrap4');
    {%- endif -%}
    {%- if lang -%}
    console.log('Select2 default language', '{{ lang }}');
    $.fn.select2.defaults.set('language', '{{ lang }}');
    {%- endif -%}
    {% raw %}

    $(selector).select2();

  } else {
    throw new Error('Select2 must be loaded before this script.');
  }

});
{% endraw %}
