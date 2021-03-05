import {imgUploadPreview} from './upload-img.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
let scaleControlValue = document.querySelector('.scale__control--value');
let imgSize = 100;
const maxImgSize = 100;
const minImgSize = 25;
scaleControlValue.value = maxImgSize + '%';

scaleControlSmaller.addEventListener('click', () => {
  imgSize -= 25;
  if (imgSize < 25) {
    imgSize = minImgSize;
  }
  scaleControlValue.value = imgSize + '%';
  imgUploadPreview.style.transform = 'scale('+imgSize / 100+')';
});

scaleControlBigger.addEventListener('click', () => {
  imgSize += 25;
  if (imgSize > 100) {
    imgSize = maxImgSize;
  }
  scaleControlValue.value = imgSize + '%';
  imgUploadPreview.style.transform = 'scale('+imgSize / 100+')';
});
