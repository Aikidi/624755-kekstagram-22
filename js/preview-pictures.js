import {createSimilarPhotosInfo} from './data.js';

const previewPictureListContainer = document.querySelector('.pictures');
const previewPictureTemplate = document.querySelector('#picture').content;

const previewPictureElements = createSimilarPhotosInfo();

const previewPictureListFragment = document.createDocumentFragment();

previewPictureElements.forEach((picture) => {
  const previewPictureElement = previewPictureTemplate.cloneNode(true);
  previewPictureElement.querySelector('.picture__likes').textContent = picture.likes;
  previewPictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  previewPictureElement.querySelector('.picture__img').src = picture.url;
  previewPictureListFragment.appendChild(previewPictureElement);
})

previewPictureListContainer.appendChild(previewPictureListFragment);
