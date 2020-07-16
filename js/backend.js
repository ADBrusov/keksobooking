'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var URL_DATA = 'https://javascript.pages.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  window.backend = {
    isDataLoad: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL_DATA);
      xhr.send();
    },
    isDataUpload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onSuccess();
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
