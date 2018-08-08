{% raw %}
$(function() {

  if (!window.disqusConfig && !window.disqusConfig.shortname) {
    console.warn('Disqus username is not defined.');
    return false;
  }

  // Define Disqus loading script tag
  var d = document, s = d.createElement('script');
  s.src = 'https://' + window.disqusConfig.shortname + '.disqus.com/embed.js';
  s.async = true;
  s.setAttribute('data-timestamp', +new Date());

  var $container = $('#disqus_thread').parent('.collapse');
  if ($container.length) {
    // If the Disqus thread container is in a collapsible container
    // wait for the first opening before appending Disqus script tag
    $container.one('shown.bs.collapse', function () {
      (d.head || d.body).appendChild(s);
    });
  } else {
    // Else load Disqus script imediatly
    (d.head || d.body).appendChild(s);
  }

  // Append comment count script
  var $container = $('.disqus-comment-count');
  if ($container.length) {
    s.src = 'https://' + window.disqusConfig.shortname + '.disqus.com/count.js';
    (d.head || d.body).appendChild(s);
  }

});
{% endraw %}
