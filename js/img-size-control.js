const MAX_IMG_SIZE = 100;
const MIN_IMG_SIZE = 25;
const START_IMG_SIZE = 100;
const STEP_IMG_SIZE = 25;

let imgSize = 100;

const setImageSize = (size) => {
  imgSize = size;
  document.querySelector('.scale__control--value').value = size + '%';
  document.querySelector('.img-upload__preview').style.transform = 'scale('+size / 100+')';
}

const initSizeButtons = (startSize = START_IMG_SIZE) => {
  document.querySelector('.scale__control--smaller').addEventListener('click',() => { decreaseSize(); } );
  document.querySelector('.scale__control--bigger').addEventListener('click',() => { increaseSize(); } );
  setImageSize(startSize);
}

const decreaseSize = (step = STEP_IMG_SIZE) => {
  setImageSize( imgSize < MIN_IMG_SIZE+1 ? imgSize = MIN_IMG_SIZE : imgSize - step);
}

const increaseSize = (step = STEP_IMG_SIZE) => {
  setImageSize(imgSize > MAX_IMG_SIZE-1 ? imgSize = MAX_IMG_SIZE : imgSize + step);
}

export {setImageSize, initSizeButtons};
