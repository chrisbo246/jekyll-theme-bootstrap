---
layout: post-list
title: "Tips"
permalink: /tips/
related:
  collection: tips
filters:
  keys: [categories, tags]

#nav_item:
#  group: "primary-nav"
#  position: 9
#  label: "Tips"
#  icon:
#    class:

features:
  card: true
  flipcard: true
  filters: true
  lunr: true
  select2: true
  disqus: true
  post_list: true

bottom_navbar:
  modules: [modules/nav/comments-toggler.html, modules/nav/back-to-top-link.html]

sidebar:
  modules: ['modules/sidebar/filters.html']

post_preview:
  module: modules/post-list/post-list-accordion.html
---
