import {pageBody}  from './big-picture.js';
import {isEscEvent} from './util.js';

const uploadFileField = document.querySelector('#upload-file');
const uploadFileCancel = document.querySelector('#upload-cancel');
const imgUploadModal = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview');

const closeUploadModal = () => {
  imgUploadModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadFileField.value = '';
  document.removeEventListener('keydown', onUploadModalEscKeydown);
}

const onUploadModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

uploadFileField.addEventListener('change', () => {
  imgUploadModal.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onUploadModalEscKeydown);
});

uploadFileCancel.addEventListener('click', () => {
  closeUploadModal();
});

export {imgUploadPreview};
