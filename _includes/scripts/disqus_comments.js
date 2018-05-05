{% raw %}
$(function() {

  var $container = $('#comments').filter('.collapse');

  if ($container.length) {

    window.disqus_config = function () {
      this.page.url = '{{ page.url | absolute_url }}';
      this.page.identifier = '{{ page.url | absolute_url }}';
    };

    $container.one('shown.bs.collapse', function () {
      var d = document, s = d.createElement('script');
      s.src = 'https://{% endraw %}{{ site.disqus.shortname }}{% raw %}.disqus.com/embed.js';
      s.async = true;
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    });

  }

});
{% endraw %}
