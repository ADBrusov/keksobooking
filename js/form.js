'use strict';

(function () {
  var offerTypesMinPrices = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var form = document.querySelector('.ad-form');
  var offerFormRoomNumber = form.querySelector('#room_number');
  var offerFormCapacity = form.querySelector('#capacity');
  var offerFormPrice = form.querySelector('#price');
  var offerFormType = form.querySelector('#type');
  var offerFormTimeIn = form.querySelector('#timein');
  var offerFormTimeOut = form.querySelector('#timeout');

  var guestsValidationHandler = function () {
    if (offerFormRoomNumber.value !== '100' && offerFormCapacity.value === '0') {
      offerFormCapacity.setCustomValidity('Укажите количество гостей');
    } else if (offerFormRoomNumber.value === '100' && offerFormCapacity.value !== '0') {
      offerFormCapacity.setCustomValidity('100 комнат - не для гостей');
    } else if (offerFormRoomNumber.value < offerFormCapacity.value) {
      offerFormCapacity.setCustomValidity('Количество гостей не может превышать количество комнат');
    } else {
      offerFormCapacity.setCustomValidity('');
    }
  };

  var minPriceValidationHandler = function () {
    offerFormPrice.min = offerTypesMinPrices[offerFormType.value];
    offerFormPrice.placeholder = offerTypesMinPrices[offerFormType.value];
  };

  var onOfferTimeInChange = function () {
    offerFormTimeOut.value = offerFormTimeIn.value;
  };

  var onOfferTimeOutChange = function () {
    offerFormTimeIn.value = offerFormTimeOut.value;
  };

  offerFormCapacity.addEventListener('change', guestsValidationHandler);
  offerFormRoomNumber.addEventListener('change', guestsValidationHandler);
  offerFormType.addEventListener('change', minPriceValidationHandler);
  offerFormTimeIn.addEventListener('change', onOfferTimeInChange);
  offerFormTimeOut.addEventListener('change', onOfferTimeOutChange);
})();
