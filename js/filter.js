'use strict';

(function () {
  var MIN_PINS = 0;
  var MAX_PINS = 5;

  var PriceType = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MIN: '10000',
    MAX: '50000'
  };

  var formFilter = document.querySelector('.map__filters');
  var selectOfferType = formFilter.querySelector('#housing-type');
  var selectOfferPrice = formFilter.querySelector('#housing-price');

  var getFilterByType = function (el) {
    return (el.offer.type === selectOfferType.value) || (selectOfferType.value === 'any');
  };

  var getFilterByPrice = function (el) {
    switch (selectOfferPrice.value) {
      case PriceType.LOW: return el.offer.price <= PriceType.MIN;
      case PriceType.MIDDLE: return el.offer.price >= PriceType.MIN && el.offer.price <= PriceType.MAX;
      case PriceType.HIGH: return el.offer.price >= PriceType.MAX;
      default: return true;
    }
  };

  var filterPins = function (data) {
    return data.filter(function (el) {
      return getFilterByType(el) &&
            getFilterByPrice(el);
    }).slice(MIN_PINS, MAX_PINS);
  };

  var onFormFilterChange = function () {
    window.pin.renderPins(filterPins(window.ads));
  };

  formFilter.addEventListener('change', onFormFilterChange);


  window.filter = {
    filterPins: filterPins
  };
})();
