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
    elementsCollection.forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });
  };

  var enableElements = function (elementsCollection) {
    elementsCollection.forEach(function (el) {
      el.removeAttribute('disabled');
    });
  };

  var deactivePage = function () {
    disableElements(formElements);
    disableElements(mapFilters);
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.pin.deletePins();
    window.card.closeCard();
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

  var onPinsLoadSuccess = function (data) {
    window.ads = data;
    enableElements(mapFilters);
    window.pin.renderPins(window.filter.filterPins(data));
  };

  var onPinsLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    enableElements(formElements);
    window.backend.isDataLoad(onPinsLoadSuccess, onPinsLoadError);
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

  deactivePage();
  addMainPinAddress();
  mainPin.addEventListener('mousedown', onMousePageActivate);
  mainPin.addEventListener('keydown', onKeyboardPageActivate);

  window.map = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    map: map,
    mainPin: mainPin,
    addMainPinAddress: addMainPinAddress,
    deactivePage: deactivePage,
    onMousePageActivate: onMousePageActivate,
    onKeyboardPageActivate: onKeyboardPageActivate,
    onPinsLoadSuccess: onPinsLoadSuccess
  };
})();
