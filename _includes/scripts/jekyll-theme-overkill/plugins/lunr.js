{% raw %}
(function() {
  'use strict';

  var store;

  var itemsContainer;
  var resultsContainer;
  var messageContainer;
  var searchInput;

  var storeName = '{% endraw %}{{ include.store_name | default: 'lunrStore' }}{% raw %}';
  var storePath = '{% endraw %}{{ include.store_path | default: '/assets/data/documents.json' | relative_url }}{% raw %}';
  var refKey = '{% endraw %}{{ include.ref_key | default: 'id' }}{% raw %}';

  var itemsContainerSelector = '{% endraw %}{{ include.items_container_selector | default: '#search-items' }}{% raw %}';
  var resultsContainerSelector = '{% endraw %}{{ include.results_container_selector | default: '#search-results' }}{% raw %}';
  var messageContainerSelector = '{% endraw %}{{ include.message_container_selector | default: '#search-message' }}{% raw %}';
  var searchInputSelector = '{% endraw %}{{ include.search_input_selector | default: '#search-input' }}{% raw %}';


  /**
  *
  */

  var displayResults = function (results) {

    var html = '', items, selector;

    console.log('display lunr results', results);
    if (results) {

      if (results.length) {
        for (var r in results) {
          for (var s in store) {
            if (store[s][refKey] && store[s][refKey] === results[r].ref) {

              selector = itemsContainerSelector + ' [data-ref="' + store[s][refKey] + '"]';
              items = document.querySelectorAll(selector);

              console.log('Display items', selector, items);

              if (items.length) {
                for (var i in items) {
                  html += items[i].outerHTML || '';
                }
              }
            }
          }
        }

        if (messageContainer) {
          messageContainer.setAttribute('hidden', 'hidden');
        }

      } else {

        if (messageContainer) {
          messageContainer.removeAttribute('hidden');
        }

      }

      if (itemsContainer) {
        itemsContainer.setAttribute('hidden', 'hidden');
      }

    } else {

      if (messageContainer) {
        messageContainer.setAttribute('hidden', 'hidden');
      }
      if (itemsContainer) {
        itemsContainer.removeAttribute('hidden');
      }

    }

    if (resultsContainer) {
      resultsContainer.innerHTML = html;
    }

  };



  /**
  * Extract URL parameters
  */

  var getUriParameter = function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  };


  var insertParameter = function (key, value) {

      key = encodeURI(key); value = encodeURI(value);
      var kvp = document.location.search.substr(1).split('&');
      var i=kvp.length; var x; while(i--) {
          x = kvp[i].split('=');
          if (x[0]==key) {
              x[1] = value;
              kvp[i] = x.join('=');
              break;
          }
      }

      if(i<0) {kvp[kvp.length] = [key,value].join('=');}

      //this will reload the page, it's likely better to store this until finished
      //document.location.search = kvp.join('&');
      //history.pushState(null, null, document.location + kvp.join('&'));
  };



  /**
  * Initialize lunr, definine search fields and data
  */

  var getLunrInstance = function (options) {

    return lunr(function () {

      if (options.lang && lunr[options.lang]) {
        this.use(lunr[options.lang]);
        console.log('lunr', options.lang);
      }

      this.ref(refKey);

      this.field('collection');
      //this.field('alias');
      this.field('title', { boost: 10 });
      //this.field('author');
      //this.field('category');
      this.field('categories', { boost: 5 });
      this.field('tags', { boost: 2 });
      this.field('content');
      this.field('description');
      this.field('excerpt');
      //this.field('preview');
      if (options.customFields.length) {
        for (var key in options.customFields) {
          this.field(key);
        }
      }

      for (var key in store) {
        this.add(store[key]);
      }

    });

  };



  var init = function (err, data) {

    document.addEventListener("DOMContentLoaded", function(event) {

      if (data) {

        store = data;

        itemsContainer = document.querySelector(itemsContainerSelector);
        resultsContainer = document.querySelector(resultsContainerSelector);
        messageContainer = document.querySelector(messageContainerSelector);
        searchInput = document.querySelector(searchInputSelector);

        // Initialize lunr, definine search fields and data
        var idx = getLunrInstance({
          lang: '{% endraw %}{{ lang }}{% raw %}',
          collection: '{% endraw %}{{ page.collection }}{% raw %}',
          customFields: []
        });

        var searchFilters = [];
        {% endraw %}
        {%- assign collections = '' | split: ' ' -%}
        {%- for collection in site.collections -%}
        {%- if page[collection.label].length -%}

        {%- endif -%}
        {%- endfor -%}
        {%- if page.collection -%}
        //searchFilters.push('collection:{{ page.collection }}');
        {%- endif -%}
        {% raw %}

        // Display results matching URL parameters
        var searchTerms = getUriParameter('q');
        if (searchTerms) {
          var results = idx.search(searchTerms); // Get lunr to perform a search
          displayResults(results);
          if (searchInput) {
            searchInput.setAttribute('value', searchTerms);
          }
        } else {
          displayResults();
        }

        // Filter from searchbox
        if (searchInput) {
          searchInput.oninput = function (e) {
            var searchTerms = this.value.trim();

            if (searchTerms !== '') {
              var results = idx.search(searchTerms + ' ' + searchFilters.join(' '));
              displayResults(results);
              //insertParameter('q', searchTerms);
              history.pushState(null, null, encodeURI(decodeURI(location.href).replace(/([?&]q=)[^&]*/,'$1' + searchTerms)));
            } else {
              displayResults();
              history.pushState(null, null, encodeURI(decodeURI(location.href).replace(/([?&]q=)[^&]*/,'')));
            }
          };
        }

      }


    });

  };



  /**
  * Load a JSON file
  */

  var getJSON = function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.send();
  };



  if (typeof lunr === 'undefined') {
    throw new Error('Lunr is not present. Please include / require Lunr before this script.');
  } else {
    // Load the custom store stored in a global variable (if defined)
    // else load the site-wide JSON store
    if (window[storeName]) {
      init(null, window[storeName])
    } else if (storePath) {
      getJSON(storePath, init);
    }
  }


})();
{% endraw %}
