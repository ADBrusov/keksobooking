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
  var resetFormButton = form.querySelector('.ad-form__reset');

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

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), function () {
      window.map.deactivePage();
      form.reset();
      window.map.addMainPinAddress();
      window.map.mainPin.addEventListener('mousedown', window.map.onMousePageActivate);
      window.map.mainPin.addEventListener('keydown', window.map.onKeyboardPageActivate);
      renderMessage('success');
    }, function () {
      renderMessage('error');
    });
  };

  var renderMessage = function (messageType) {
    var messageTemplate = document.querySelector('#' + messageType)
      .content
      .querySelector('.' + messageType);
    var message = messageTemplate.cloneNode(true);

    document.querySelector('body').appendChild(message);

    var onClickMessageClose = function () {
      document.querySelector('body').removeChild(message);

      document.removeEventListener('click', onClickMessageClose);
      document.removeEventListener('keydown', onKeyboardMessageClose);
    };

    var onKeyboardMessageClose = function (evt) {
      if (evt.key === 'Escape') {
        document.querySelector('body').removeChild(message);

        document.removeEventListener('click', onClickMessageClose);
        document.removeEventListener('keydown', onKeyboardMessageClose);
      }
    };

    if (message.querySelector('.error__button')) {
      var onErrorButtonClick = function () {
        document.querySelector('body').removeChild(message);

        document.removeEventListener('click', onClickMessageClose);
        document.removeEventListener('keydown', onKeyboardMessageClose);
      };

      message.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
    }

    document.addEventListener('click', onClickMessageClose);
    document.addEventListener('keydown', onKeyboardMessageClose);
  };

  var onFormReset = function () {
    form.reset();
  };

  offerFormCapacity.addEventListener('change', guestsValidationHandler);
  offerFormRoomNumber.addEventListener('change', guestsValidationHandler);
  offerFormType.addEventListener('change', minPriceValidationHandler);
  offerFormTimeIn.addEventListener('change', onOfferTimeInChange);
  offerFormTimeOut.addEventListener('change', onOfferTimeOutChange);
  form.addEventListener('submit', submitHandler);
  resetFormButton.addEventListener('click', onFormReset);
})();
