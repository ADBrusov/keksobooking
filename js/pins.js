'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPinsContainer = document.querySelector('.map__pins');

  var createPin = function (advertisement) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');
    var pinLocationX = advertisement.location.x - PIN_WIDTH / 2;
    var pinLocationY = advertisement.location.y - PIN_HEIGHT;

    mapPin.setAttribute('style', 'left: ' + pinLocationX + 'px; top: ' + pinLocationY + 'px;');
    mapPinImage.setAttribute('src', '' + advertisement.author.avatar + '');
    mapPinImage.setAttribute('alt', '' + advertisement.offer.title + '');

    mapPin.addEventListener('click', function () {
      window.card.render(advertisement);
    });

    mapPin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.card.render(advertisement);
      }
    });

    return mapPin;
  };

  var renderPins = function (advertisements) {
    var fragment = document.createDocumentFragment();

    deletePins();
    window.card.close();

    advertisements.forEach(function (advertisement) {
      fragment.appendChild(createPin(advertisement));
    });

    mapPinsContainer.appendChild(fragment);
  };

  var deletePins = function () {
    var mapPins = mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.forEach(function () {
      mapPinsContainer.lastChild.remove();
    });
  };

  var deactiveMainPin = function () {
    var mainPin = mapPinsContainer.querySelector('.map__pin--main');
    mainPin.style.top = MAIN_PIN_DEFAULT_Y + 'px';
    mainPin.style.left = MAIN_PIN_DEFAULT_X + 'px';

  };

  window.pins = {
    render: renderPins,
    delete: deletePins,
    deactiveMain: deactiveMainPin
  };
})();
