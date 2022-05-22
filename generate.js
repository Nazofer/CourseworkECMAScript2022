'use strict';

const letters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const EL_COUNT = 1000;

const randNumGenerator = (n) => {
  const randNum = Math.round(Math.random() * n);
  return randNum;
};

const randStrGenerator = (n) => {
  let resStr = '';
  for (let i = 0; i < n; i++) {
    resStr += letters[randNumGenerator(letters.length)];
  }
  return resStr;
};

const generateArr = () => {
  const testArr = [];
  const arrayLength = EL_COUNT + randNumGenerator(500);

  for (let i = 0; i < arrayLength; i++) {
    testArr.push(
      i % 2 === 0
        ? randNumGenerator(EL_COUNT)
        : randStrGenerator(randNumGenerator(20))
    );
  }
  return testArr;
};

const objGenerator = (n) => {
  const obj = {};
  for (let i = 0; i < n; i++) {
    obj[randStrGenerator(5)] = randNumGenerator(100);
  }
  return obj;
};

module.exports = {
  randNumGenerator,
  randStrGenerator,
  generateArr,
  objGenerator,
};
