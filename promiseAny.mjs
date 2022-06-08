/**
 * Example of using Promise.any()
 */
'use strict';

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Promise 1 resolved');
  }, Math.random() * 1000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Promise 2 resolved');
  }, Math.random() * 1000);
});

const p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Promise 3 resolved');
  }, Math.random() * 1000);
});

const res = await Promise.any([p1, p2, p3]);
console.log(res); // first resolved promise
