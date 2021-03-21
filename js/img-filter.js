/* global noUiSlider:readonly */
import {imgUploadPreview} from './upload-img.js';
const imgForEffect = imgUploadPreview.querySelector('img');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const Effects = document.querySelectorAll('.effects__radio');
let setEffect = 'effects__preview--none';
imgForEffect.classList.add(setEffect);
let effectValue;
let Effect = 'none';
let sliderDisplay = 'none';

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  valueElement.value = unencoded[handle];
  effectValue = valueElement.value;
  sliderElement.style.display = sliderDisplay;
  if (Effect === 'invert') {
    imgUploadPreview.style.filter = Effect +'('+effectValue+'%)';
  } else if (Effect === 'blur') {
    imgUploadPreview.style.filter = Effect +'('+effectValue+'px)';
  } else {
    imgUploadPreview.style.filter = Effect +'('+effectValue+')';
  }
});

for (let i = 0; i < Effects.length; i++) {
  Effects[i].addEventListener('click' , function () {
    let chosenEffect = Effects[i].value;
    let newClass = 'effects__preview--' + chosenEffect;
    imgForEffect.classList.remove(setEffect);
    imgForEffect.classList.add(newClass);
    setEffect = newClass;
    let sliderOptions;

    switch (chosenEffect) {
      case 'chrome':
        Effect = 'grayscale';
        sliderOptions = {
          range: {
            min: 0,
            max: 1,
          },
          start: 0,
          step: 0.1,
        };
        break;

      case 'sepia':
        Effect = 'sepia';
        sliderOptions = {
          range: {
            min: 0,
            max: 1,
          },
          start: 0,
          step: 0.1,
        };
        break;

      case 'marvin':
        Effect = 'invert';
        sliderOptions = {
          range: {
            min: 0,
            max: 100,
          },
          start: 0,
          step: 1,
        };
        break;

      case 'phobos':
        Effect = 'blur';
        sliderOptions = {
          range: {
            min: 1,
            max: 3,
          },
          start: 1,
          step: 0.1,
        };
        break;

      case 'heat':
        Effect = 'brightness';
        sliderOptions = {
          range: {
            min: 1,
            max: 3,
          },
          start: 1,
          step: 0.1,
        };
        break;
    }

    if (chosenEffect === 'none') {
      Effect = 'none';
      sliderDisplay = 'none';
      imgUploadPreview.style.filter = 'none';
      sliderElement.style.display = sliderDisplay;
    }
    else {
      sliderDisplay = 'block';
      sliderElement.noUiSlider.updateOptions(sliderOptions);
      sliderElement.noUiSlider.set(sliderOptions.start);
    }
  });
}
