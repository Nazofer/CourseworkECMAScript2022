/**
 * Benchmark of two ways to check if an object's property exists
 * 1. Object.hasOwn(obj, prop)
 * 2. obj.hasOwnProperty(prop)
 */
'use strict';

const benchmark = require('./benchmark.js');
const { randStrGenerator, objGenerator } = require('./generate.js');

const KEY_COUNTER = 1000;
const obj1 = objGenerator(KEY_COUNTER);

//create array of keys that do not exsist, for hasOwn to return `false`
const notExistingKeysArr = [];
for (let i = 0; i < KEY_COUNTER; i++) {
  notExistingKeysArr.push(randStrGenerator(10));
}

//create array of keys, for hasOwn to return `true`
const existingKeys = Object.keys(obj1);

const hasOwnWrap = () => {
  for (let i = 0; i < existingKeys.length; i++) {
    Object.hasOwn(obj1, existingKeys[i]);
    Object.hasOwn(obj1, notExistingKeysArr[i]);
  }
};

const hasOwnPropertyWrap = () => {
  for (let i = 0; i < existingKeys.length; i++) {
    obj1.hasOwnProperty(existingKeys[i]);
    obj1.hasOwnProperty(notExistingKeysArr[i]);
  }
};

benchmark.do(1000, [hasOwnWrap, hasOwnPropertyWrap]);
