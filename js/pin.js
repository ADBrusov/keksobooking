'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

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
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(createPin(wizards[i]));
    }

    mapPinsContainer.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
