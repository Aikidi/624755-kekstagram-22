import './preview-pictures.js';
import {isEscEvent, clearElementInner} from './util.js';
import {previewPictureElements} from './preview-pictures.js';

const pageBody = document.querySelector('body');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImg = bigPictureModal.querySelector('img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureModal.querySelector('.comments-count');
const bigPictureCommentsList = bigPictureModal.querySelector('.social__comments');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');
const previewsList = document.querySelectorAll('.picture');

const createNewComment = (commentInfo) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  const newCommentImg = document.createElement('img');
  newCommentImg.classList.add('social__picture');
  newCommentImg.src = commentInfo.avatar;
  newCommentImg.alt = commentInfo.name;
  newCommentImg.width = 35;
  newCommentImg.height = 35;
  newComment.appendChild(newCommentImg);
  const newCommentText = document.createElement('p');
  newCommentText.classList.add('social__text');
  newCommentText.textContent = commentInfo.message;
  newComment.appendChild(newCommentText);
  bigPictureCommentsList.appendChild(newComment);
}
const createBigPictureContent = (photoInfo) => {
  bigPictureImg.src = photoInfo.url;
  bigPictureLikes.textContent = photoInfo.likes;
  bigPictureCommentsCount.textContent = photoInfo.comments.length;
  bigPictureDescription.textContent = photoInfo.description;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  for (let i = 0; i < photoInfo.comments.length; i++) {
    createNewComment(photoInfo.comments[i]);
  }
}

const onModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const closeModalButton = document.querySelector('.big-picture__cancel');

const closeModal = () => {
  bigPictureModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  clearElementInner(bigPictureCommentsList);
  document.removeEventListener('keydown', onModalEscKeydown);
}

closeModalButton.addEventListener('click', () => {
  closeModal();
});

const onPreviewClick = (preview, photoInfo) => {
  preview.addEventListener('click', function () {
    bigPictureModal.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    clearElementInner(bigPictureCommentsList);
    createBigPictureContent(photoInfo);
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

for (let i = 0; i < previewsList.length; i++) {
  onPreviewClick(previewsList[i], previewPictureElements[i]);
}






