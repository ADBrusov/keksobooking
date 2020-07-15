'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var MAX_PINS = 5;

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPinsContainer = document.querySelector('.map__pins');

  var createPin = function (ad) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');
    var pinLocationX = ad.location.x - PIN_WIDTH / 2;
    var pinLocationY = ad.location.y - PIN_HEIGHT;

    mapPin.setAttribute('style', 'left: ' + pinLocationX + 'px; top: ' + pinLocationY + 'px;');
    mapPinImage.setAttribute('src', '' + ad.author.avatar + '');
    mapPinImage.setAttribute('alt', '' + ad.offer.title + '');

    mapPin.addEventListener('click', function () {
      window.card.renderCard(ad);
    });

    mapPin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.card.renderCard(ad);
      }
    });

    return mapPin;
  };

  var renderPins = function (wizards) {
    deletePins();

    var fragment = document.createDocumentFragment();
    var maxPins = 0;

    if (wizards.length <= MAX_PINS) {
      maxPins = wizards.length;
    } else {
      maxPins = 5;
    }

    for (var i = 0; i < maxPins; i++) {
      fragment.appendChild(createPin(wizards[i]));
    }

    mapPinsContainer.appendChild(fragment);
  };

  var deletePins = function () {
    var mapPins = mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      mapPinsContainer.lastChild.remove();
    }
  };

  window.pin = {
    renderPins: renderPins,
    deletePins: deletePins
  };
})();
