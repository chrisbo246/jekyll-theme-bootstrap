{% raw %}

window.addEventListener("load", function(){
  window.cookieconsent.initialise(window.cookieConsentConfig)
});

var d = document, s = d.createElement('script');
s.src = '{% endraw %}{{ "/node_modules/cookieconsent/build/cookieconsent.min.js" | relative_url }}{% raw %}';
s.async = true;
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);

{% endraw %}
