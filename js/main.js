import './upload-img.js';
import './big-picture.js';
import './preview-pictures.js';
import './img-size-control.js';
import './img-filter.js';
import './valid-form.js';
import {saveData} from './sort.js' ;
import {initSortMode, renderImages} from './preview-pictures.js';
import {loadServerData} from './api.js';
import {showAlert} from './util.js';

loadServerData.then(
  (getData) => { return renderImages(getData); },
  (err) => { showAlert(err);} ).then(
  (viewData) => {
    return saveData(viewData);
  }).then(() => {
  initSortMode();
});

