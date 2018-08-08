{% raw %}

// =============================================================================
// Plugins configs
// =============================================================================

// https://help.disqus.com/developer/javascript-configuration-variables
// Page identifier is used in disqus comment count module
window.disqus_config = function () {
  //this.language = '{% endraw %}{{ lang | replace: '-', '_' }}{% raw %}';
  this.language = '{% endraw %}{{ lang | split: '-' | first }}{% raw %}';
  this.page.identifier = '{% endraw %}{{ page.url }}{% raw %}';
  this.page.url = '{% endraw %}{{ page.url | absolute_url }}{% raw %}';
  this.page.title = '{% endraw %}{{ page.title | escape }}{% raw %}';
  this.page.category_id = '{% endraw %}{{ page.disqus.category_id }}{% raw %}';
  this.callbacks.afterRender = [function() {
    // your code here
  }];
};

// https://github.com/aFarkas/lazysizes
window.lazySizesConfig = {% endraw %}{{ site.lazysizes | jsonify }}{% raw %};
/*
window.lazySizesConfig = window.lazySizesConfig || {};
//window.lazySizesConfig.init = false;
window.lazySizesConfig.loadMode = 1;
//window.lazySizesConfig.preloadAfterLoad = true;
*/

// https://cookieconsent.insites.com/documentation/javascript-api/
window.cookieConsentConfig = {% endraw %}{{ site.cookie_consent | jsonify }}{% raw %};
window.cookieConsentConfig.content = {
    "header": "{% endraw %}{{ t.cookieconsent_header }}{% raw %}",
    "message": "{% endraw %}{{ t.cookieconsent_message }}{% raw %}",
    "dismiss": "{% endraw %}{{ t.cookieconsent_dismiss }}{% raw %}",
    "link": "{% endraw %}{{ t.cookieconsent_link }}{% raw %}",
    "allow": "{% endraw %}{{ t.cookieconsent_allow }}{% raw %}",
    "deny": "{% endraw %}{{ t.cookieconsent_deny }}{% raw %}"
  };
window.cookieConsentConfig.window = 'div role="dialog" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window card {{classes}}">{{children}}</div>';
window.cookieConsentConfig.elements = {
    header: '<div class="card-header">{{header}}</div>',
    message: '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
    messagelink: '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a></span>',
    dismiss: '<a role="button" aria-label="dismiss cookie message" tabindex="0" class="btn-secondary cc-dismiss">{{dismiss}}</a>',
    allow: '<a role="button" aria-label="allow cookies" tabindex="0" class="btn btn-secondary cc-allow">{{allow}}</a>',
    deny: '<a role="button" aria-label="deny cookies" tabindex="0" class="btn btn-secondary cc-deny">{{deny}}</a>',
    link: '<a role="button" aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>',
    close: '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close">{{close}}</span>',
  };
window.cookieConsentConfig.compliance = {
    'info': '<div class="cc-compliance">{{dismiss}}</div>',
    'opt-in': '<div class="cc-compliance cc-highlight">{{dismiss}}{{allow}}</div>',
    'opt-out': '<div class="cc-compliance cc-highlight">{{deny}}{{dismiss}}</div>',
  };



// =============================================================================
// Script configs
// =============================================================================

window.soundPlayerConfig = {% endraw %}{{ site.sound_player | jsonify }}{% raw %};
{% endraw %}
{%- for sound in site.sound_player.sounds -%}
{% raw %}
window.soundPlayerConfig.sounds[{% endraw %}{{ forloop.index0 }}{% raw %}].filePath = '{% endraw %}{{ sound.filePath | relative_url }}{% raw %}';
{% endraw %}
{%- endfor-%}
{% raw %}

/*
window.soundPlayerConfig = {
  container: 'body',
  playerAttributes: {
    class: 'sound-player',
    preload: 'none' // auto, metadata, none
  },
  // https://freesound.org/search/?q=&f=license%3A%22Creative+Commons+0%22+type%3A%22ogg%22&s=duration+asc&advanced=0&g=1
  sounds: [
    {
      playerId: 'button-click-sound-player',
      togglerSelector: '.btn:not([data-toggle="dropdown"])',
      togglerEvent: 'mousedown',
      filePath: '{% endraw %}{{ 'assets/sounds/click.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'nav-click-sound-player',
      togglerSelector: '.nav-link',
      togglerEvent: 'click',
      filePath: '{% endraw %}{{ 'assets/sounds/click.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'flip-sound-player',
      togglerSelector: 'input.flipcard-position',
      togglerEvent: 'change',
      filePath: '{% endraw %}{{ 'assets/sounds/flip.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'select-click-sound-player',
      togglerSelector: 'select, .select2',
      togglerEvent: 'click',
      filePath: '{% endraw %}{{ 'assets/sounds/pop-up.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'show-dropdown-sound-player',
      togglerSelector: '[data-toggle="dropdown"]',
      togglerEvent: 'show.bs.dropdown',
      filePath: '{% endraw %}{{ 'assets/sounds/pop-up.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'show-popover-sound-player',
      togglerSelector: '[data-toggle="popup"]',
      togglerEvent: 'show.bs.popover',
      filePath: '{% endraw %}{{ 'assets/sounds/pop-up.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'show-collapse-sound-player',
      togglerSelector: '.collapse',
      togglerEvent: 'show.bs.collapse',
      filePath: '{% endraw %}{{ 'assets/sounds/slide.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'hide-collapse-sound-player',
      togglerSelector: '.collapse',
      togglerEvent: 'hide.bs.collapse',
      filePath: '{% endraw %}{{ 'assets/sounds/slide.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'close-alert-sound-player',
      togglerSelector: '.alert',
      togglerEvent: 'close.bs.alert',
      filePath: '{% endraw %}{{ 'assets/sounds/no.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'show-modal-sound-player',
      togglerSelector: '.modal',
      togglerEvent: 'show.bs.modal',
      filePath: '{% endraw %}{{ 'assets/sounds/slide.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'close-modal-sound-player',
      togglerSelector: '.modal',
      togglerEvent: 'close.bs.modal',
      filePath: '{% endraw %}{{ 'assets/sounds/no.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'memorized-sound-player',
      togglerSelector: 'input.memorized',
      togglerEvent: 'change',
      filePath: '{% endraw %}{{ 'assets/sounds/yes.ogg' | relative_url }}{% raw %}'
    },
    {
      playerId: 'unmemorized-sound-player',
      togglerSelector: 'input.unmemorized',
      togglerEvent: 'change',
      filePath: '{% endraw %}{{ 'assets/sounds/no.ogg' | relative_url }}{% raw %}'
    }
  ]
};
*/

// Custom config
window.disqusConfig = {% endraw %}{{ site.disqus | jsonify }}{% raw %};


{% endraw %}
