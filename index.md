---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: home

features:
  card: true
  flipcard: true
  lunr: true
  post_list: true
  social_icons: true

body:
  class: 'pt-0'

top_navbar:
  modules: ['modules/navbar/navbar-brand.html']
  #position: ''

bottom_navbar:
  modules: [modules/nav/comments-toggler.html, modules/nav/tip-link.html, modules/social-icons.html, modules/nav/feed-link.html, modules/nav/settings-toggler.html, modules/nav/back-to-top-link.html]
  #class: 'navbar navbar-light bg-light d-flex flex-row justify-content-between w-100 animated fadeInUp'
  #position: 'fixed-bottom'

sidebar:
  modules: ['modules/sidebar/vertical-primary-nav.html']

post_preview:
  module: 'modules/post-list/post-list-group.html'

jumbotron:
  title: 'Hello, world!'
  lead: 'Here is the most overkilled theme for Jekyll.'
  description:
  class:
  button:
    class: 'btn btn-primary btn-lg'
    text: 'Next'
    href: '#next'
    icon:
      class: 'fas fa-chevron-right fa-lg mr-1'
---
