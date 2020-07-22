'use strict';

(function () {
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
  var selectOfferRooms = formFilter.querySelector('#housing-rooms');
  var selectOfferGuests = formFilter.querySelector('#housing-guests');

  var getFilterByType = function (advertisement) {
    return (advertisement.offer.type === selectOfferType.value) || (selectOfferType.value === 'any');
  };

  var getFilterByPrice = function (advertisement) {
    switch (selectOfferPrice.value) {
      case PriceType.LOW: return advertisement.offer.price <= PriceType.MIN;
      case PriceType.MIDDLE: return advertisement.offer.price >= PriceType.MIN && advertisement.offer.price <= PriceType.MAX;
      case PriceType.HIGH: return advertisement.offer.price >= PriceType.MAX;
      default: return true;
    }
  };

  var getFilterByRooms = function (advertisement) {
    return (advertisement.offer.rooms === Number(selectOfferRooms.value)) || (selectOfferRooms.value === 'any');
  };

  var getFilterByGuests = function (advertisement) {
    return (advertisement.offer.guests === Number(selectOfferGuests.value)) || (selectOfferGuests.value === 'any');
  };

  var getFilterByFeatures = function (advertisement) {
    var checkedFeatures = Array.from(formFilter.querySelectorAll('input:checked'));
    return checkedFeatures.every(function (feature) {
      return advertisement.offer.features.includes(feature.value);
    });
  };

  var filterPins = function (data) {
    var filteredPins = [];

    for (var i = 0; i < data.length && filteredPins.length < MAX_PINS; i++) {
      if (getFilterByType(data[i]) &&
      getFilterByPrice(data[i]) &&
      getFilterByRooms(data[i]) &&
      getFilterByGuests(data[i]) &&
      getFilterByFeatures(data[i])) {
        filteredPins.push(data[i]);
      }
    }

    return filteredPins;
  };

  var onFormFilterChange = window.debounce.remove(function () {
    window.pins.render(filterPins(window.advertisements));
  });

  formFilter.addEventListener('change', onFormFilterChange);


  window.filter = {
    useOnPins: filterPins
  };
})();
