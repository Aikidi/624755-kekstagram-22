/* global noUiSlider:readonly */

const initFilter = (imgUploadPreviewElement) => {
  const sliderElement = document.querySelector('.effect-level__slider');
  document.querySelector('.effect-level__value').step = 0.1;

  const sliderOptionsList = [];

  sliderOptionsList['none'] = {
    effect : 'effects__preview--none',
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

  const getRightUnits = (currentEffect) => {
    return (currentEffect === 'invert') ? '%' : ( (currentEffect === 'blur') ? 'px' : '' );
  }

  const getRightFilterString = (currentValue, currentEffect) => {
    return currentEffect +'('+ currentValue + getRightUnits(currentEffect)+')';
  }

  imgUploadPreviewElement.querySelector('img').classList.add(sliderOptionsList['none'].effect);
  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, sliderOptionsList['none'].sliderOptions);
    document.querySelector('.img-upload__effect-level').style.display = 'none';
    document.querySelectorAll('.effects__radio').forEach((effectOneItem) => {

      effectOneItem.addEventListener('click' , function () {
        imgUploadPreviewElement.querySelector('img').removeAttribute('class')
        imgUploadPreviewElement.querySelector('img').classList.add('effects__preview--'+effectOneItem.value);
        if (effectOneItem.value === 'none') {
          document.querySelector('.img-upload__effect-level').style.display = 'none';
        } else {
          document.querySelector('.img-upload__effect-level').style.display = 'block';
        }
        sliderElement.noUiSlider.updateOptions(sliderOptionsList[effectOneItem.value].sliderOptions);
        sliderElement.noUiSlider.set(sliderOptionsList[effectOneItem.value].sliderOptions.start);
        imgUploadPreviewElement.name = sliderOptionsList[effectOneItem.value].effect;
        imgUploadPreviewElement.querySelector('img').style.filter= getRightFilterString(
          sliderOptionsList[effectOneItem.value].sliderOptions.start,
          sliderOptionsList[effectOneItem.value].effect);
      });
    });

    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      document.querySelector('.effect-level__value').value = unencoded[handle];
      imgUploadPreviewElement.querySelector('img').style.filter = getRightFilterString(
        unencoded[handle],
        imgUploadPreviewElement.name );
    });

  } else {
    document.getElementById('effect-none').click();
    if (sliderElement.noUiSlider) {
      sliderElement.noUiSlider.destroy();
    }
  }
}

export {initFilter};
