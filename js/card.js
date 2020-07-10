'use strict';

(function () {
  var adCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');
  var filtersContatiner = map.querySelector('.map__filters-container');
  var adsDescriptions = window.data.adsDescriptions;

  var createOfferFeatures = function (featuresContainer, featuresArr) {
    featuresContainer.innerHTML = '';

    for (var i = 0; i < featuresArr.length; i++) {
      featuresContainer.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + featuresArr[i] + '"></li>');
    }
  };

  var createOfferPhotos = function (photosContainer, photosArr) {
    photosContainer.innerHTML = '';

    for (var i = 0; i < photosArr.length; i++) {
      photosContainer.insertAdjacentHTML('beforeend', '<img src="' + photosArr[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }
  };

  var createCard = function (adNumber) {
    var adCard = adCardTemplate.cloneNode(true);

    adCard.querySelector('.popup__title').textContent = '' + adsDescriptions[adNumber].offer.title;
    adCard.querySelector('.popup__text--address').textContent = '' + adsDescriptions[adNumber].offer.address;
    adCard.querySelector('.popup__text--price').textContent = adsDescriptions[adNumber].offer.price + '₽/ночь';
    adCard.querySelector('.popup__type').textContent = window.data.typesOfAdsRus[window.data.typesOfAds.indexOf(adsDescriptions[adNumber].offer.type)];
    adCard.querySelector('.popup__text--capacity').textContent = adsDescriptions[adNumber].offer.rooms + ' комнаты для ' + adsDescriptions[adNumber].offer.guests + ' гостей';
    adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsDescriptions[adNumber].offer.checkin + ', выезд до ' + adsDescriptions[adNumber].offer.checkout;
    createOfferFeatures(adCard.querySelector('.popup__features'), adsDescriptions[adNumber].offer.features);
    adCard.querySelector('.popup__description').textContent = adsDescriptions[adNumber].offer.description;
    createOfferPhotos(adCard.querySelector('.popup__photos'), adsDescriptions[adNumber].offer.photos);
    adCard.querySelector('.popup__avatar').setAttribute('src', '' + adsDescriptions[adNumber].author.avatar + '');

    adCard.querySelector('.popup__close').addEventListener('click', function () {
      adCard.remove();
      document.removeEventListener('keydown', onKeyboardCloseCard);
    });

    document.addEventListener('keydown', onKeyboardCloseCard);

    return adCard;
  };

  var renderCard = function (adNumber) {
    var adCard = document.querySelector('.map__card');

    if (adCard) {
      adCard.remove();
    }

    map.insertBefore(createCard(adNumber), filtersContatiner);
  };

  var onKeyboardCloseCard = function (evt) {
    var adCard = document.querySelector('.map__card');

    if (evt.key === 'Escape') {
      adCard.remove();
    }

    document.removeEventListener('keydown', onKeyboardCloseCard);
  };

  window.card = {
    renderCard: renderCard
  };
})();
