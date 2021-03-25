/* global noUiSlider:readonly */

const initFilter = (imgUploadPreviewElement) => {
  const imgForEffect = imgUploadPreviewElement.querySelector('img');
  let setEffect = 'effects__preview--none';
  imgForEffect.classList.add(setEffect);
  const sliderElement = document.querySelector('.effect-level__slider');
  const valueElement = document.querySelector('.effect-level__value');
  valueElement.step = 0.1;
  const effectsButtons = document.querySelectorAll('.effects__radio');
  imgForEffect.classList.add(setEffect);
  let effectValue;
  let effect = 'none';
  let sliderDisplay = 'none';
  let sliderOptions = {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  };

  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, sliderOptions);

    effectsButtons.forEach((effectOneItem) => {
      effectOneItem.addEventListener('click' , function () {
        let chosenEffect = effectOneItem.value;
        let newClass = 'effects__preview--' + chosenEffect;
        imgForEffect.classList.remove(setEffect);
        imgForEffect.classList.add(newClass);
        setEffect = newClass;

        switch (chosenEffect) {
          case 'chrome':
            effect = 'grayscale';
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
            effect = 'sepia';
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
            effect = 'invert';
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
            effect = 'blur';
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
            effect = 'brightness';
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
          effect = 'none';
          sliderDisplay = 'none';
          imgUploadPreviewElement.style.filter = 'none';
          sliderElement.style.display = sliderDisplay;
        } else {
          sliderDisplay = 'block';
          sliderElement.noUiSlider.updateOptions(sliderOptions);
          sliderElement.noUiSlider.set(sliderOptions.start);
        }
        imgUploadPreviewElement.name = effect;

      });
    });

    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      valueElement.value = unencoded[handle];
      effectValue = valueElement.value;
      sliderElement.style.display = sliderDisplay;
      if (imgUploadPreviewElement.name === 'invert') {
        imgUploadPreviewElement.style.filter = imgUploadPreviewElement.name +'('+effectValue+'%)';
      } else if (imgUploadPreviewElement.name === 'blur') {
        imgUploadPreviewElement.style.filter = imgUploadPreviewElement.name +'('+effectValue+'px)';
      } else {
        imgUploadPreviewElement.style.filter = imgUploadPreviewElement.name +'('+effectValue+')';
      }
    });

  } else {
    document.getElementById('effect-none').click();
  }
}

export {initFilter};
