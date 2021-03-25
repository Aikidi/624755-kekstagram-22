/* global _:readonly */
import {changeViewMode} from './sort.js';
import {showBigPicture} from './big-picture.js';
import {showUploadImage} from './upload-img.js';
import {initValidator} from './valid-form.js';

const RERENDER_DELAY = 500;

const previewPictureListContainer = document.querySelector('.pictures');
const defaultPictureListContainerInnerHtml = previewPictureListContainer.innerHTML ;

const initSortMode = () => {
  const imgFilters = document.querySelector('.img-filters');
  const imgFilterButtons = document.querySelectorAll('.img-filters__button');
  imgFilters.classList.remove('img-filters--inactive');
  imgFilterButtons.forEach((filterButton) => {

    const debounceRender = _.debounce(() => renderImages(changeViewMode(filterButton.id)), RERENDER_DELAY);
    filterButton.addEventListener('click', () => {
      const chosenFilterButton = document.querySelector('#' + filterButton.id);
      imgFilterButtons.forEach((filterButton) => { filterButton.classList.remove('img-filters__button--active'); });
      chosenFilterButton.classList.add('img-filters__button--active');
      debounceRender();
    })
  });
}

const renderImages = (previewArray) => new Promise((resolve) => {
  const previewPictureTemplate = document.querySelector('#picture').content;
  const previewPictureListFragment = document.createDocumentFragment();
  previewArray.forEach((picture) => {
    const previewPictureOneElement = previewPictureTemplate.cloneNode(true);
    previewPictureOneElement.querySelector('.picture').id = picture.id;
    previewPictureOneElement.querySelector('.picture__likes').textContent = picture.likes;
    previewPictureOneElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
    previewPictureOneElement.querySelector('.picture__img').src = picture.url;
    previewPictureOneElement.querySelector('.picture__img').alt = picture.description;
    const picObj = previewPictureOneElement.querySelector('.picture') ;
    picObj.addEventListener('click',() => { showBigPicture(picture); })
    previewPictureListFragment.appendChild(previewPictureOneElement);
  })
  previewPictureListContainer.innerHTML = defaultPictureListContainerInnerHtml;
  previewPictureListContainer.appendChild(previewPictureListFragment);
  previewPictureListContainer.querySelector('#upload-file').addEventListener( 'change', () => { showUploadImage();  });
  initValidator();
  resolve(previewArray);
});

export {initSortMode, renderImages};

