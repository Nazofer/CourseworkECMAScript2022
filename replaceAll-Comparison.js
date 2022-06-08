/**
 * Benchmark of two ways of replacing all the characters in string
 * 1. str.replace(/substr/g, newSubStr);
 * 2. replaceAll(subStr, newSubStr)
 */
'use strict';

const benchmark = require('./optBenchmark.js');
const { randStrGenerator } = require('./generate.js');

// Get random string, substring of it, regexp with /g flag, new substring
const randStr = randStrGenerator(10).repeat(1000);
const subStr = randStr.slice(2, 7);
const regExp = new RegExp(subStr, 'g');
const newSubStr = randStrGenerator(5);

const replaceWrap = () => randStr.replace(regExp, newSubStr);

const replaceAllWrap = () => randStr.replaceAll(subStr, newSubStr);

benchmark.do(1000, [replaceWrap, replaceAllWrap]);
