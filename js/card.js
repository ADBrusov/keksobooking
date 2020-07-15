'use strict';

(function () {
  var typesOfAds = ['palace', 'flat', 'house', 'bungalo'];
  var typesOfAdsRus = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

  var adCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');
  var filtersContatiner = map.querySelector('.map__filters-container');

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

  var createCard = function (ad) {
    var adCard = adCardTemplate.cloneNode(true);

    adCard.querySelector('.popup__title').textContent = '' + ad.offer.title;
    adCard.querySelector('.popup__text--address').textContent = '' + ad.offer.address;
    adCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    adCard.querySelector('.popup__type').textContent = typesOfAdsRus[typesOfAds.indexOf(ad.offer.type)];
    adCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    createOfferFeatures(adCard.querySelector('.popup__features'), ad.offer.features);
    adCard.querySelector('.popup__description').textContent = ad.offer.description;
    createOfferPhotos(adCard.querySelector('.popup__photos'), ad.offer.photos);
    adCard.querySelector('.popup__avatar').setAttribute('src', '' + ad.author.avatar + '');

    adCard.querySelector('.popup__close').addEventListener('click', function () {
      adCard.remove();
      document.removeEventListener('keydown', onKeyboardCloseCard);
    });

    document.addEventListener('keydown', onKeyboardCloseCard);

    return adCard;
  };

  var closeCard = function () {
    var adCard = document.querySelector('.map__card');

    if (adCard) {
      adCard.remove();
      document.removeEventListener('keydown', onKeyboardCloseCard);
    }
  };

  var renderCard = function (ad) {
    closeCard();

    map.insertBefore(createCard(ad), filtersContatiner);
  };

  var onKeyboardCloseCard = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }

    document.removeEventListener('keydown', onKeyboardCloseCard);
  };

  window.card = {
    closeCard: closeCard,
    renderCard: renderCard
  };
})();
