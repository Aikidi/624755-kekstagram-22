const ALERT_SHOW_TIME = 5000;

const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    alert('Необходимо указать только положительные числа');
    return;
  }

  if (max < min) {
    let maxNew = min;
    min = max;
    max = maxNew;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  if (max === min) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isNormalLength = (string, maxLength) => {
  return (string.length <= maxLength); // ? true : false;
}

const createArray = (min, max) => {
  let newArr = [];
  for (let i = min; i <= max; i++) {
    newArr.push(i);
  }
  return newArr;
}

const createMixedArrayInRange = (min, max) => {
  let rangeArr = createArray(min, max);
  let mixedArray = [];
  while (rangeArr.length > 0) {
    let uniqueInt = getRandomIntInclusive(0, rangeArr.length-1);
    mixedArray.push(rangeArr[uniqueInt]);
    rangeArr.splice(uniqueInt, 1);
  }

  return mixedArray;
}

const removeAllChild = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const clearElementInner = (element) => {
  element.innerHTML = '';
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}


export {getRandomIntInclusive, isNormalLength, createMixedArrayInRange, removeAllChild, isEscEvent, clearElementInner, showAlert};




