/**
 * Benchmark of three ways to get last element of the array:
 * 1. Array.at(-1)
 * 2. Array.slice(-1)
 * 3. arr[Array.length - 1]
 */
'use strict';

const benchmark = require('./optBenchmark.js');
const { generateArr } = require('./generate.js');

const array1 = generateArr();

const wrapAt = () => array1.at(-1);

const wrapSlice = () => array1.slice(-1)[0];

const wrapLength = () => array1[array1.length - 1];

benchmark.do(100000, [wrapAt, wrapSlice, wrapLength]);
