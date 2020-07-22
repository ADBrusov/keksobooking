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

  var onGuestsChange = function () {
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

  var onOfferTypeChange = function () {
    offerFormPrice.min = offerTypesMinPrices[offerFormType.value];
    offerFormPrice.placeholder = offerTypesMinPrices[offerFormType.value];
  };

  var onOfferTimeInChange = function () {
    offerFormTimeOut.value = offerFormTimeIn.value;
  };

  var onOfferTimeOutChange = function () {
    offerFormTimeIn.value = offerFormTimeOut.value;
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.isDataUpload(new FormData(form), onFormSubmitSuccess, onFormSubmitError);
  };

  var onFormSubmitSuccess = function () {
    window.map.deactivePage();
    window.images.reset();
    form.reset();
    renderMessage('success');
  };

  var onFormSubmitError = function () {
    renderMessage('error');
  };

  var renderMessage = function (messageType) {
    var messageTemplate = document.querySelector('#' + messageType)
      .content
      .querySelector('.' + messageType);
    var message = messageTemplate.cloneNode(true);

    document.querySelector('body').appendChild(message);

    var messageClose = function () {
      document.querySelector('body').removeChild(message);
      document.removeEventListener('click', onClickMessageClose);
      document.removeEventListener('keydown', onKeyboardMessageClose);
    };

    var onClickMessageClose = function () {
      messageClose();
    };

    var onKeyboardMessageClose = function (evt) {
      if (evt.key === 'Escape') {
        messageClose();
      }
    };

    var onErrorButtonClick = function () {
      messageClose();
    };

    if (messageType === 'error') {
      message.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
    }
    document.addEventListener('click', onClickMessageClose);
    document.addEventListener('keydown', onKeyboardMessageClose);
  };

  var onFormReset = function () {
    form.reset();
    window.map.deactivePage();
    window.images.reset();
  };

  offerFormCapacity.addEventListener('change', onGuestsChange);
  offerFormRoomNumber.addEventListener('change', onGuestsChange);
  offerFormType.addEventListener('change', onOfferTypeChange);
  offerFormTimeIn.addEventListener('change', onOfferTimeInChange);
  offerFormTimeOut.addEventListener('change', onOfferTimeOutChange);
  form.addEventListener('submit', onFormSubmit);
  resetFormButton.addEventListener('click', onFormReset);
})();
