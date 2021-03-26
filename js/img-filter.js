/* global noUiSlider:readonly */
import {initSizeButtons} from './img-size-control.js';

const initSliderOptions = (allElements = true) => {
  const sliderOptionsList = [];

  sliderOptionsList['none'] = {
    effect : 'none',
    sliderOptions : {
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1,
      connect: 'lower',
    },
  };

  sliderOptionsList['chrome'] = {
    effect : 'grayscale',
    sliderOptions : {
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1,
    },
  };

  sliderOptionsList['sepia'] = {
    effect : 'sepia',
    sliderOptions : {
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1,
    },
  };

  sliderOptionsList['marvin'] = {
    effect : 'invert',
    sliderOptions : {
      range: {
        min: 0,
        max: 100,
      },
      start: 0,
      step: 1,
    },
  };

  sliderOptionsList['phobos'] = {
    effect : 'blur',
    sliderOptions : {
      range: {
        min: 0,
        max: 3,
      },
      start: 0,
      step: 0.1,
    },
  };

  sliderOptionsList['heat'] = {
    effect : 'brightness',
    sliderOptions : {
      range: {
        min: 1,
        max: 3,
      },
      start: 1,
      step: 0.1,
    },
  };

  return allElements ? sliderOptionsList : sliderOptionsList[allElements];
}

const getRightUnits = (currentEffect) => {
  return (currentEffect === 'invert') ? '%' : ( (currentEffect === 'blur') ? 'px' : '' );
}

const getRightFilterString = (currentValue, currentEffect) => {
  return currentEffect === 'none'? currentEffect : currentEffect +'('+ currentValue + getRightUnits(currentEffect)+')';
}

const resetFilter = (imgUploadPreviewElementForReset = document.querySelector('.img-upload__preview')) => {
  if (imgUploadPreviewElementForReset) {
    imgUploadPreviewElementForReset.name = initSliderOptions('none').effect ;
    imgUploadPreviewElementForReset.querySelector('img').style.filter = 'effects__preview--none';
    imgUploadPreviewElementForReset.querySelector('img').removeAttribute('class');
    imgUploadPreviewElementForReset.querySelector('img').classList.add(initSliderOptions('none').effect);
  }
  document.querySelector('.effect-level__value').step = 0.1;
  document.querySelector('.img-upload__effect-level').style.display = 'none';
  if (document.querySelector('.effect-level__slider').noUiSlider) {
    document.querySelector('.effect-level__slider').noUiSlider.destroy();
  }
  initSizeButtons();
}

const initFilter = (imgUploadPreviewElement = document.querySelector('.img-upload__preview')) => {
  const sliderElement = document.querySelector('.effect-level__slider');
  const sliderOptionsList = initSliderOptions();
  resetFilter();
  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, sliderOptionsList['none'].sliderOptions);
  }

  const onSelectEffectButtonClick = (evt) => {
    imgUploadPreviewElement.querySelector('img').removeAttribute('class');
    imgUploadPreviewElement.querySelector('img').classList.add('effects__preview--'+evt.target.value);
    if (evt.target.value === 'none') {
      document.querySelector('.img-upload__effect-level').style.display = 'none';
    } else {
      document.querySelector('.img-upload__effect-level').style.display = 'block';
    }
    sliderElement.noUiSlider.updateOptions(sliderOptionsList[evt.target.value].sliderOptions);
    sliderElement.noUiSlider.set(sliderOptionsList[evt.target.value].sliderOptions.start);
    imgUploadPreviewElement.name = sliderOptionsList[evt.target.value].effect;
    imgUploadPreviewElement.querySelector('img').style.filter= getRightFilterString(
      sliderOptionsList[evt.target.value].sliderOptions.start,
      sliderOptionsList[evt.target.value].effect);
  }
  document.querySelectorAll('.effects__radio').forEach((effectOneItem) => {
    effectOneItem.removeEventListener('click' , onSelectEffectButtonClick,true );
  });
  document.querySelectorAll('.effects__radio').forEach((effectOneItem) => {
    effectOneItem.addEventListener('click' , onSelectEffectButtonClick, true );
  });

  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    document.querySelector('.effect-level__value').value = unencoded[handle];
    imgUploadPreviewElement.querySelector('img').style.filter = getRightFilterString(
      unencoded[handle],
      imgUploadPreviewElement.name );
  });
}

export {initFilter, resetFilter};
