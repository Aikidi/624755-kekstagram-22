const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const imgUploadDescription = imgUploadForm.querySelector('.text__description');
let cancelCloseModal = false;
const imgUploadHashtags = imgUploadForm.querySelector('.text__hashtags');
let PreviousInputHashtags = '';

imgUploadDescription.addEventListener('focus', () => {
  cancelCloseModal = true;
});

imgUploadDescription.addEventListener('blur', () => {
  cancelCloseModal = false;
});

imgUploadHashtags.addEventListener('focus', () => {
  cancelCloseModal = true;
});

imgUploadHashtags.addEventListener('blur', () => {
  cancelCloseModal = false;
});

export {cancelCloseModal};

imgUploadHashtags.addEventListener('input', () => {
  imgUploadHashtags.style.border = 'none';
  imgUploadHashtags.setCustomValidity('');
  imgUploadHashtags.value = imgUploadHashtags.value.replace(/ {2,}/g,' ');
  imgUploadHashtags.value = imgUploadHashtags.value.replace(/#{2,}/g,'#');
  imgUploadHashtags.value = imgUploadHashtags.value.replace(/(\w)#/g,'$1 #');
  let inputHashtags = imgUploadHashtags.value;

  if (inputHashtags.match(/([^#\sa-zA-Zа-яА-Я0-9]+)/)) {
    imgUploadHashtags.setCustomValidity('Недопустимый символ');
    imgUploadHashtags.value = PreviousInputHashtags;
  }

  inputHashtags = imgUploadHashtags.value.toLowerCase();
  PreviousInputHashtags = imgUploadHashtags.value;

  if (inputHashtags[0] !== '#' && inputHashtags.length > 0) {
    imgUploadHashtags.value = '#'+imgUploadHashtags.value;
    inputHashtags = '#'+inputHashtags;
    PreviousInputHashtags = '#'+PreviousInputHashtags;
  }

  if (inputHashtags.length > 2) {

    if (
      inputHashtags.match(/#([a-zA-Zа-яА-Я0-9]+)(?=(\s)|$)/g).length !==
      inputHashtags.match(/([a-zA-Zа-яА-Я0-9]+)(?=(\s)|$)/g).length
    )  {
      imgUploadHashtags.setCustomValidity('Добавьте # в начале каждого хештега');
    }

    if (
      inputHashtags.match(/#([a-zA-Zа-яА-Я0-9]{1,100})(?=(\s)|$)/g).length !==
      inputHashtags.match(/#([a-zA-Zа-яА-Я0-9]{0,100})(?=(\s)|$)/g).length
    ) {
      imgUploadHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
    }
    if (inputHashtags.length > 20 && inputHashtags.match(/#([a-zA-Zа-яА-Я0-9]+)(?=(\s)|$)/g).length === 1) {
      imgUploadHashtags.setCustomValidity('Длина хэш-тега должна быть не более 20 символов');
    } else if
    (
      inputHashtags.match(/#([a-zA-Zа-яА-Я0-9]{1,19})(?=(\s)|$)/g).length !==
      inputHashtags.match(/#([a-zA-Zа-яА-Я0-9]+)(?=(\s)|$)/g).length
    ) {
      imgUploadHashtags.setCustomValidity('Длина хэш-тега должна быть не более 20 символов');
    }

    let hashtagsArr = inputHashtags.match( /#([a-zA-Zа-яА-Я0-9]+)(?=(\s)|$)/g ) ;
    const uniq = new Set(hashtagsArr);

    if (hashtagsArr.length !== uniq.size) {
      imgUploadHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    }

    if ( uniq.size > 5) {
      imgUploadHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }

  } else if (inputHashtags[1] === ' ' ) {
    imgUploadHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
  }

  imgUploadHashtags.reportValidity();
});

imgUploadSubmit.addEventListener('click', () => {
  if (!imgUploadHashtags.checkValidity()) {
    imgUploadHashtags.style.border = '5px solid red';
  }
})

const clearUploadText = () => {
  imgUploadHashtags.value = '';
  imgUploadDescription.value = '';
}

export {clearUploadText};
