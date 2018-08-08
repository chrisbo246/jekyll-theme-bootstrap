{% raw %}
var filtersModule = (function () {
    'use strict';

    var data = {},
    $reset,
    $collectionFilters,
    $searchFilter,
    $items;


    /**
     * Filter items using selected collections
     */
    var filterCollections = function ($visibleItems) {

        var $inputs = $collectionFilters;

        var $input, filter, values;
        var selector = '';

        $inputs.each(function () {

            $input = $(this);
            filter = $input.data('filter');
            values = $input.val();

            if (values && filter) {
                if (!$.isArray(values)) {
                    values = [values];
                }
                values.forEach(function (value) {
                    selector = selector + '[data-' + filter + '~="' + value + '"]';
                });
            }

        });

        if (selector !== '') {
            $visibleItems = $visibleItems.filter(selector);
            console.log('Filtered', selector);
        }

        return $visibleItems;

    };


    /**
     * Filter items from input query
     */
    var filterSearch = function ($visibleItems) {

        var $input = $searchFilter;

        return $visibleItems;

    };



    /**
     * Init collection filters
     */
    var initCollectionFilters = function () {

        var $inputs = $collectionFilters;
        if (!$inputs) {
            return false;
        }

        // Save filters default values in a data attribute
        var $input, value;
        $inputs.each(function () {
            $input = $(this);
            value = $input.val();
            $input.attr('data-default', value);
        });

        // When a collection filter change, display matching posts
        $inputs.on('change', function () {
            console.log('Collection filter changed');
            filterItems();
        });

        // Apply filter when input values restored from the local storage
        if ($().garlic) {
          $inputs.garlic({
              onRetrieve: function (elem, retrievedValue) {
                  console.log('Collection filter retrieved', retrievedValue);
                  filterItems();
              }
          });
        }

    };




    /**
     * Init search filter
     */
    var initSearchFilter = function () {

        var $input = $searchFilter;
        if (!$input) {
            return false;
        }

        // When the selection filter change, display matching posts
        $input.on('keyup', function () {
            filterItems();
        });

    };



    /**
     * Restore every filter values
     */
    var reset = function () {

        var value;

        var $inputs = $collectionFilters;
        if ($inputs) {
            $inputs.each(function () {
                $input = $(this);
                value = $input.data('default');
                $input.val(value).trigger('change');
            });
        }

    };


    /**
     * Filter items using selected values
     */
    var filterItems = function () {

        var $visibleItems = $items;

        //$visibleItems.hide();
        //$visibleItems.css('opacity', 0.2);
        $visibleItems = filterCollections($visibleItems);
        $visibleItems = filterSearch($visibleItems);
        //$visibleItems.show();
        //$visibleItems.css('opacity', 1);

        $items.not($visibleItems).addClass('hidden');
        $visibleItems.removeClass('hidden');

    };




    $(function() {

        $reset = $('.filter-reset');
        $collectionFilters = $('.filter');
        $searchFilter = $('.search-filter');
        $items = $('.filter-item');

        initCollectionFilters();
        initSearchFilter();

        // Init reset button
        $reset.on('click', function () {
            reset();
        });

    });

})();
{% endraw %}
