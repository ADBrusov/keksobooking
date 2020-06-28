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
var typesOfAdsRus = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
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

//
var adCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var filtersContatiner = document.querySelector('.map__filters-container');

// Создание элементов списка удобств объявления
var createOfferFeatures = function (featuresContainer, featuresArr) {
  featuresContainer.innerHTML = '';

  for (var i = 0; i < featuresArr.length; i++) {
    featuresContainer.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + featuresArr[i] + '"></li>');
  }
};

// Создание изображений для объявления
var createOfferPhotos = function (photosContainer, photosArr) {
  photosContainer.innerHTML = '';

  for (var i = 0; i < photosArr.length; i++) {
    photosContainer.insertAdjacentHTML('beforeend', '<img src="' + photosArr[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  }
};

// Создание и заполнение карточки объявления
var createCard = function (adNumber) {
  var adCard = adCardTemplate.cloneNode(true);

  adCard.querySelector('.popup__title').textContent = '' + adsDescriptions[adNumber].offer.title;
  adCard.querySelector('.popup__text--address').textContent = '' + adsDescriptions[adNumber].offer.address;
  adCard.querySelector('.popup__text--price').textContent = adsDescriptions[adNumber].offer.price + '₽/ночь';
  adCard.querySelector('.popup__type').textContent = typesOfAdsRus[typesOfAds.indexOf(adsDescriptions[adNumber].offer.type)];
  adCard.querySelector('.popup__text--capacity').textContent = adsDescriptions[adNumber].offer.rooms + ' комнаты для ' + adsDescriptions[adNumber].offer.guests + ' гостей';
  adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsDescriptions[adNumber].offer.checkin + ', выезд до ' + adsDescriptions[adNumber].offer.checkout;
  createOfferFeatures(adCard.querySelector('.popup__features'), adsDescriptions[adNumber].offer.features);
  adCard.querySelector('.popup__description').textContent = adsDescriptions[adNumber].offer.description;
  createOfferPhotos(adCard.querySelector('.popup__photos'), adsDescriptions[adNumber].offer.photos);
  adCard.querySelector('.popup__avatar').setAttribute('src', '' + adsDescriptions[adNumber].author.avatar + '');

  return adCard;
};

// Рендеринг карточки первого объявления из массива adsDescriptionsии
var renderCard = function () {
  map.insertBefore(createCard(0), filtersContatiner);
};

renderCard();
