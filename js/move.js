'use strict';

(function () {
  var X_MIN = 0;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var xMax = document.querySelector('.map__pins').clientWidth;
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinX = mainPin.offsetLeft - shift.x + window.map.MAIN_PIN_WIDTH / 2;
      var mainPinY = mainPin.offsetTop - shift.y + window.map.MAIN_PIN_HEIGHT;

      if (mainPinY >= Y_MIN && mainPinY <= Y_MAX) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if (mainPinX >= X_MIN && mainPinX <= xMax) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      window.map.addMainPinAddress(true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
