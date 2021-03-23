import './upload-img.js';
import './data.js';
import './big-picture.js';
import './preview-pictures.js';
import './img-size-control.js';
import './img-filter.js';
import './valid-form.js';
import {createPreviews} from './preview-pictures.js';
import {setOnPreviewClick} from './big-picture.js';
import {showAlert} from './util.js';
import {loadServerData} from './api.js'


loadServerData.then(
  (getData) => {
    createPreviews(getData);
    setOnPreviewClick();
  },
  (err) => {
    showAlert('Не удалось загрузить данные. ' + err + '.');
  });



