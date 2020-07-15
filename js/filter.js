'use strict';

(function () {
  var formFilter = document.querySelector('.map__filters');
  var selectOfferType = formFilter.querySelector('#housing-type');

  var filterPins = function (arr) {
    var filterPinsByType = function () {
      var type = selectOfferType.value;
      var ads = arr.filter(function (el) {
        return (el.offer.type === type) || (selectOfferType.value === 'any');
      });
      window.card.closeCard();
      window.pin.renderPins(ads);
    };

    formFilter.addEventListener('change', filterPinsByType);
  };

  window.filter = {
    filterPins: filterPins
  };
})();
