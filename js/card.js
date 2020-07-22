'use strict';

(function () {
  var typesOfAds = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var adCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');
  var filtersContatiner = map.querySelector('.map__filters-container');

  var createOfferFeatures = function (featuresContainer, featuresArr) {
    featuresContainer.innerHTML = '';

    featuresArr.forEach(function (it) {
      featuresContainer.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + it + '"></li>');
    });
  };

  var createOfferPhotos = function (photosContainer, photosArr) {
    photosContainer.innerHTML = '';

    photosArr.forEach(function (it) {
      photosContainer.insertAdjacentHTML('beforeend', '<img src="' + it + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    });
  };

  var createCard = function (advertisement) {
    var adCard = adCardTemplate.cloneNode(true);

    adCard.querySelector('.popup__title').textContent = '' + advertisement.offer.title;
    adCard.querySelector('.popup__text--address').textContent = '' + advertisement.offer.address;
    adCard.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
    adCard.querySelector('.popup__type').textContent = typesOfAds[advertisement.offer.type];
    adCard.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    createOfferFeatures(adCard.querySelector('.popup__features'), advertisement.offer.features);
    adCard.querySelector('.popup__description').textContent = advertisement.offer.description;
    createOfferPhotos(adCard.querySelector('.popup__photos'), advertisement.offer.photos);
    adCard.querySelector('.popup__avatar').setAttribute('src', '' + advertisement.author.avatar + '');

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

  var renderCard = function (advertisement) {
    closeCard();

    map.insertBefore(createCard(advertisement), filtersContatiner);
  };

  var onKeyboardCloseCard = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }

    document.removeEventListener('keydown', onKeyboardCloseCard);
  };

  window.card = {
    close: closeCard,
    render: renderCard
  };
})();
