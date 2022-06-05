/**
 * Comparing String.prototype.matchAll() with and without new /d flag
 */
'use strict';

const regexp = /test/g; //without the /d flag
const newRegexp = /test/dg; //with the /d flag
const str = '---test---test---';
const arr1 = [...str.matchAll(regexp)];
const arr2 = [...str.matchAll(newRegexp)];

console.log(arr1[0]);
console.log(arr2[0]);

console.log('-'.repeat(100));

console.log(arr1[1]);
console.log(arr2[1]);
