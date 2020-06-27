'use strict';

var NUMBER_OF_ADS = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 10000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 4;
var MIN_GUESTS = 1;
var MAX_GUESTS = 6;
var X_MIN = 0;
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var TIMES = ['12:00', '13:00', '14:00'];
var typesOfFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var typesOfAds = ['palace', 'flat', 'house', 'bungalo'];
var pathsOfPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var mapPinsContainer = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var xMax = mapPinsContainer.clientWidth;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
};

var adsDescriptions = [];

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
        features: typesOfFeatures.slice().splice(getRandomNumber(0, typesOfFeatures.length - 1), getRandomNumber(0, typesOfFeatures.length)), // Возможно стоит доработать
        description: 'Лучшее место на свете',
        photos: pathsOfPhotos.slice().splice(getRandomNumber(0, pathsOfPhotos.length - 1), getRandomNumber(0, pathsOfPhotos.length)) // Возможно стоит доработать
      },
      location: {
        x: xCoordinate,
        y: yCoordinate
      }
    });
  }
};

var createPin = function (adNumber) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var mapPinImage = mapPin.querySelector('img');
  var pinLocationX = adsDescriptions[adNumber].location.x - PIN_WIDTH / 2;
  var pinLocationY = adsDescriptions[adNumber].location.y - PIN_HEIGHT;

  mapPin.setAttribute('style', 'left: ' + pinLocationX + 'px; top: ' + pinLocationY + 'px;');
  mapPinImage.setAttribute('src', '' + adsDescriptions[adNumber].author.avatar + '');
  mapPinImage.setAttribute('alt', '' + adsDescriptions[adNumber].offer.title + '');

  return mapPin;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    fragment.appendChild(createPin(i));
  }

  mapPinsContainer.appendChild(fragment);
};

createAdsDescriptions();
renderPins();
map.classList.remove('map--faded');
