'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 85;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelectorAll('.map__filter');
  var form = document.querySelector('.ad-form');
  var formElements = form.querySelectorAll('.ad-form__element');
  var offerFormAddress = form.querySelector('#address');

  var disableElements = function (elementsCollection) {
    for (var i = 0; i < elementsCollection.length; i++) {
      elementsCollection[i].setAttribute('disabled', 'disabled');
    }
  };

  var enableElements = function (elementsCollection) {
    for (var i = 0; i < elementsCollection.length; i++) {
      elementsCollection[i].removeAttribute('disabled');
    }
  };

  var addMainPinAddress = function (isPageActivate) {
    var mainPinX = mainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
    var mainPinY = mainPin.offsetTop + MAIN_PIN_HEIGHT / 2;

    if (isPageActivate === true) {
      mainPinY = mainPin.offsetTop + MAIN_PIN_HEIGHT;
    }

    offerFormAddress.value = Math.round(mainPinX) + ', ' + Math.round(mainPinY);
    offerFormAddress.readOnly = true;
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    enableElements(formElements);
    enableElements(mapFilters);
    window.pin.renderPins();
    addMainPinAddress(true);
    mainPin.removeEventListener('mousedown', onMousePageActivate);
    mainPin.removeEventListener('keydown', onKeyboardPageActivate);
  };

  var onMousePageActivate = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  var onKeyboardPageActivate = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
    }
  };

  disableElements(formElements);
  disableElements(mapFilters);
  addMainPinAddress();
  mainPin.addEventListener('mousedown', onMousePageActivate);
  mainPin.addEventListener('keydown', onKeyboardPageActivate);

  window.map = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    addMainPinAddress: addMainPinAddress
  };
})();