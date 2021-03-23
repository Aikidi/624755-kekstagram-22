import {pageBody}  from './big-picture.js';
import {isEscEvent} from './util.js';
import {cancelCloseModal} from './valid-form.js';
import {sendDataOnServer} from './api.js';
import {setImageSize} from './img-size-control.js';
import {clearUploadText} from './valid-form.js';
import {initFilter} from './img-filter.js';

const uploadFileField = document.querySelector('#upload-file');
const uploadFileCancel = document.querySelector('#upload-cancel');
const imgUploadModal = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadForm = document.querySelector('.img-upload__form');

const mainContent = document.querySelector('main');

const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;

const successModalSection = successMessageTemplate.querySelector('.success');
const errorModalSection = errorMessageTemplate.querySelector('.error');

let modalSection = null;

const closeMessageModal = (modalSectionClose) => {
  mainContent.removeChild(modalSectionClose);
  document.removeEventListener('keydown', onModalMessageEscKeydown);
}

const onModalMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    if (modalSection === 'error') {
      document.querySelector('.error__button').click();
    } else {
      document.querySelector('.success__button').click();
    }
  }
};

const showSuccessMessage = () => {
  mainContent.appendChild(successModalSection);
  document.querySelector('.success__button').addEventListener('click', () => { closeMessageModal(successModalSection); });
  document.addEventListener('keydown', onModalMessageEscKeydown);
  modalSection = 'success';
}

const showErrorMessage = () => {
  mainContent.appendChild(errorModalSection);
  document.querySelector('.error__button').addEventListener('click', () => { closeMessageModal(errorModalSection); });
  document.addEventListener('keydown', onModalMessageEscKeydown);
  modalSection = 'error';
}

const closeUploadModal = () => {
  imgUploadModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadFileField.value = '';
  setImageSize(100);
  initFilter(imgUploadPreview);
  clearUploadText();
  document.removeEventListener('keydown', onUploadModalEscKeydown);
}

const onUploadModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    if (!cancelCloseModal) { closeUploadModal(); }
  }
};

const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendDataOnServer(
      () => {
        showSuccessMessage();
        closeUploadModal();
      },
      () => {
        showErrorMessage();
        closeUploadModal();
      },
      new FormData(evt.target),
    );
  });
}

uploadFileField.addEventListener('change', () => {
  initFilter(imgUploadPreview);
  imgUploadModal.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onUploadModalEscKeydown);
  setUserFormSubmit();
  setImageSize(100);

});

uploadFileCancel.addEventListener('click', () => {
  closeUploadModal();
});

export {imgUploadPreview, closeUploadModal};

