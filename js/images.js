'use strict';

(function () {
  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var photoFileChooser = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo').querySelector('img');

  var uploadImg = function (fileChooser, preview) {
    var FILE_TYPES = ['jpg', 'jpeg', 'png'];

    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarChange = function () {
    uploadImg(avatarFileChooser, avatarPreview);
  };

  var onPhotoChange = function () {
    photoPreview.removeAttribute('hidden');
    uploadImg(photoFileChooser, photoPreview);
  };

  var resetFormImages = function () {
    avatarPreview.setAttribute('src', 'img/muffin-grey.svg');
    photoPreview.removeAttribute('src');
    photoPreview.setAttribute('hidden', 'hidden');
  };

  avatarFileChooser.addEventListener('change', onAvatarChange);
  photoFileChooser.addEventListener('change', onPhotoChange);

  window.images = {
    reset: resetFormImages
  };
})();
