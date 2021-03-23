import {createSimilarPhotosInfo} from './data.js';

const previewPictureListContainer = document.querySelector('.pictures');
const previewPictureTemplate = document.querySelector('#picture').content;
let previewPictureElements;

const previewPictureListFragment = document.createDocumentFragment();

const createPreviews = (previewPictureElementsShow = previewPictureElements) => {
  if (previewPictureElementsShow === null) { previewPictureElementsShow = createSimilarPhotosInfo; }
  previewPictureElements = previewPictureElementsShow ;
  previewPictureElements.forEach((picture) => {
    const previewPictureElement = previewPictureTemplate.cloneNode(true);
    previewPictureElement.querySelector('.picture').id = picture.id;
    previewPictureElement.querySelector('.picture__likes').textContent = picture.likes;
    previewPictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
    previewPictureElement.querySelector('.picture__img').src = picture.url;
    previewPictureListFragment.appendChild(previewPictureElement);

  })

  previewPictureListContainer.appendChild(previewPictureListFragment);
};

export {previewPictureElements, createPreviews};

