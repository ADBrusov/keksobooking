'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPinsContainer = document.querySelector('.map__pins');
  var adsDescriptions = window.data.adsDescriptions;

  var createPin = function (adNumber) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');
    var pinLocationX = adsDescriptions[adNumber].location.x - PIN_WIDTH / 2;
    var pinLocationY = adsDescriptions[adNumber].location.y - PIN_HEIGHT;

    mapPin.setAttribute('style', 'left: ' + pinLocationX + 'px; top: ' + pinLocationY + 'px;');
    mapPinImage.setAttribute('src', '' + adsDescriptions[adNumber].author.avatar + '');
    mapPinImage.setAttribute('alt', '' + adsDescriptions[adNumber].offer.title + '');

    mapPin.addEventListener('click', function () {
      window.card.renderCard(adNumber);
    });

    mapPin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.card.renderCard(adNumber);
      }
    });

    return mapPin;
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.NUMBER_OF_ADS; i++) {
      fragment.appendChild(createPin(i));
    }

    mapPinsContainer.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
