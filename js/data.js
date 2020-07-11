'use strict';

(function () {
  var NUMBER_OF_ADS = 8;
  var X_MIN = 0;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 10000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 3;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 3;
  var TIMES = ['12:00', '13:00', '14:00'];

  var typesOfAds = ['palace', 'flat', 'house', 'bungalo'];
  var typesOfAdsRus = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var typesOfFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var pathsOfPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var adsDescriptions = [];

  var mapPinsContainer = document.querySelector('.map__pins');
  var xMax = mapPinsContainer.clientWidth;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
  };

  var createAdsDescriptions = function () {
    for (var i = 0; i < NUMBER_OF_ADS; i++) {
      var xCoordinate = getRandomNumber(X_MIN, xMax + 1);
      var yCoordinate = getRandomNumber(Y_MIN, Y_MAX + 1);

      adsDescriptions.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: 'Предложение №' + (i + 1),
          address: xCoordinate + ', ' + yCoordinate,
          price: getRandomNumber(MIN_PRICE, MAX_PRICE + 1),
          type: typesOfAds[getRandomNumber(0, typesOfAds.length)],
          rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS + 1),
          guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS + 1),
          checkin: TIMES[getRandomNumber(0, TIMES.length)],
          checkout: TIMES[getRandomNumber(0, TIMES.length)],
          features: typesOfFeatures.slice().splice(getRandomNumber(0, typesOfFeatures.length - 1), getRandomNumber(0, typesOfFeatures.length)),
          description: 'Лучшее место на свете',
          photos: pathsOfPhotos.slice().splice(getRandomNumber(0, pathsOfPhotos.length - 1), getRandomNumber(0, pathsOfPhotos.length))
        },
        location: {
          x: xCoordinate,
          y: yCoordinate
        }
      });
    }
  };

  createAdsDescriptions();

  window.data = {
    NUMBER_OF_ADS: NUMBER_OF_ADS,
    X_MIN: X_MIN,
    Y_MIN: Y_MIN,
    Y_MAX: Y_MAX,
    xMax: xMax,
    typesOfAds: typesOfAds,
    typesOfAdsRus: typesOfAdsRus,
    adsDescriptions: adsDescriptions
  };
})();
