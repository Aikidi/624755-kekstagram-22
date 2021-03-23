import {getRandomIntInclusive, isNormalLength, createMixedArrayInRange} from './util.js';

const PHOTO_INFO_COUNT = 25;

const AUTHORS = [
  'Василий',
  'Мария',
  'Анна',
  'Александр',
  'Иван',
  'Дмитрий',
  'Алексей',
  'Светлана',
  'Ольга',
  'Вероника',
  'Матвей',
  'Никита',
  'Ирина',
  'Алина',
  'Игорь',
]

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]

const createRandomText = (maxSentencesQuantity, sentencesArray) => {
  let sentencesQuantity = getRandomIntInclusive(1, maxSentencesQuantity);
  let text;
  text = sentencesArray[sentencesQuantity];
  if (sentencesQuantity > 1) {
    for (let i = 1; i < sentencesQuantity; i++) {
      text = text + ' ' + sentencesArray[i];
    }
  }
  return text;
}

const createComment = () => {
  return {
    id: getRandomIntInclusive(0, PHOTO_INFO_COUNT * 2),
    avatar: 'img/avatar-' + getRandomIntInclusive(1, 6) + '.svg',
    message: createRandomText(2, MESSAGES),
    name: AUTHORS[getRandomIntInclusive(0, AUTHORS.length-1)],
  }
}

const createCommentsArr = (maxCommentsQuantity) => {
  let commentsQuantity = getRandomIntInclusive(1, maxCommentsQuantity);
  let comments = [];
  comments.push(createComment());
  if (commentsQuantity > 1) {
    for (let i = 2; i <= commentsQuantity; i++) {
      comments.push(createComment());
    }
  }
  return comments;
}

const idArr = createMixedArrayInRange(1, PHOTO_INFO_COUNT);
const urlArr = createMixedArrayInRange(1, PHOTO_INFO_COUNT);

const createPhotoInfo = () => {
  let photoInfo =  {
    id: idArr[idArr.length-1],
    url: 'photos/' + urlArr[urlArr.length-1] +'.jpg',
    description: 'Фото №' + idArr[idArr.length-1],
    likes: getRandomIntInclusive(15, 200),
    comments: createCommentsArr(5),
  };
  idArr.splice([idArr.length-1], 1);
  urlArr.splice([urlArr.length-1], 1);
  return photoInfo;
};

const createSimilarPhotosInfo = () => new Array(PHOTO_INFO_COUNT).fill(null).map(() => createPhotoInfo());

isNormalLength('test', 4);

export {createSimilarPhotosInfo};
