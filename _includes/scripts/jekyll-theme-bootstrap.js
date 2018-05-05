
{%- assign lang = page.lang | default: site.lang | default: "en" -%}
{%- assign t = site.data.locales[lang] -%}

{%- include scripts/base64.js -%}

{%- include scripts/index.js -%}

{%- include scripts/filter.js -%}
{%- include scripts/cards.js -%}

{%- include scripts/lunr.js -%}

{%- include scripts/common.js -%}
{%- include scripts/bootstrap.js -%}

{%- raw -%}
//lazySizes.init();
{%- endraw -%}

{%- include scripts/sound-player.js -%}
{%- include scripts/cookieconsent.js -%}

{%- if site.disqus.shortname -%}
  {%- include scripts/disqus.js -%}
{%- endif -%}

{%- if site.google_analytics and jekyll.environment == "production" -%}
{%- include scripts/google-analytics.js -%}
{%- endif -%}

{%- comment -%}{%- include scripts/browser-update.js -%}{%- endcomment -%}
