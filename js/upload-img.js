import {isEscEvent} from './util.js';
import {isEscCloseEnable} from './valid-form.js';
import {sendDataOnServer} from './api.js';
import {setImageSize, initSizeButtons, removeSizeButtonListener} from './img-size-control.js';
import {clearUploadText} from './valid-form.js';
import {initFilter} from './img-filter.js';

const modalMessageVariations = {
  'success' : document.querySelector('#success').content.querySelector('.success') ,
  'error' : document.querySelector('#error').content.querySelector('.error') ,
} ;

const showModalMessage = (messageType = 'success') => {

  const closeMessageModal = (messageType) => {
    document.removeEventListener('keydown', onModalMessageEscKeydown, true);
    document.removeEventListener('click', onOutOfMessageClick, true);
    document.removeEventListener('keydown', onCloseButtonClick, true);
    if (modalMessageVariations[messageType].parentNode) {
      document.querySelector('main').removeChild(modalMessageVariations[messageType]);
    }
  }

  const onCloseButtonClick = () => {
    closeMessageModal(messageType);
  }

  const onOutOfMessageClick = (evt) => {
    if ((!evt.target.classList.contains('success__inner'))
      &&
      (!evt.target.classList.contains('error__inner'))
      &&
      !modalMessageVariations[messageType].querySelector('.'+messageType+'__inner').contains(evt.target)) {
      closeMessageModal(messageType);
    }
  }

  const onModalMessageEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeMessageModal(messageType);
    }
  };

  document.querySelector('main').appendChild(modalMessageVariations[messageType]);
  document.querySelector('.'+messageType+'__button').addEventListener('click', onCloseButtonClick, true);
  document.addEventListener('keydown',  onModalMessageEscKeydown, true);
  document.addEventListener('click', onOutOfMessageClick, true);
}

const closeUploadModal = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('#upload-file').value = '';
  setImageSize(100);
  initFilter(document.querySelector('.img-upload__preview'));
  clearUploadText();
  document.removeEventListener('keydown', onUploadModalEscKeydown);
  removeSizeButtonListener();
}

const onUploadModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    if (isEscCloseEnable()) { closeUploadModal(); }
  }
};

const setUserFormSubmit = () => {
  document.querySelector('.img-upload__form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendDataOnServer(
      () => {
        closeUploadModal();
        showModalMessage();
      },
      () => {
        closeUploadModal();
        showModalMessage('error');
      },
      new FormData(evt.target),
    );
  });
}

const showUploadImage = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onUploadModalEscKeydown);
  setUserFormSubmit();
  document.querySelector('#upload-cancel').addEventListener('click', () => {
    closeUploadModal();
  });
  initFilter(document.querySelector('.img-upload__preview'));
  initSizeButtons();
}

export {closeUploadModal, showUploadImage};

