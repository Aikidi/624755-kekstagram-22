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

getRandomIntInclusive();


const isNormalLength = (string, maxLength) => {
  return (string.length <= maxLength) ? true : false;
}

isNormalLength();
