'use strict';

(function () {
  var X_MIN = 0;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var typesOfAds = ['palace', 'flat', 'house', 'bungalo'];
  var typesOfAdsRus = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

  var mapPinsContainer = document.querySelector('.map__pins');
  var xMax = mapPinsContainer.clientWidth;

  window.data = {
    X_MIN: X_MIN,
    Y_MIN: Y_MIN,
    Y_MAX: Y_MAX,
    xMax: xMax,
    typesOfAds: typesOfAds,
    typesOfAdsRus: typesOfAdsRus,
  };
})();
