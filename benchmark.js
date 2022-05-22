'use strict';

const benchmark = {};
module.exports = benchmark;

const rpad = (s, char, count) => s + char.repeat(count - s.length);
const lpad = (s, char, count) => char.repeat(count - s.length) + s;

const relativePercent = (best, time) => (time * 100n) / best - 100n;

benchmark.do = (count, tests) => {
  const times = tests.map((fn) => {
    const result = [];
    const begin = process.hrtime.bigint();
    for (let i = 0; i < count; i++) result.push(fn());
    const end = process.hrtime.bigint();
    const diff = end - begin;
    const name = rpad(fn.name, '.', 22);
    const log = [name, diff];
    console.log(log.join(' '));
    return { name, time: diff };
  });
  console.log();
  console.log(times);
  const top = times.sort((t1, t2) => (t1.time > t2.time ? 1 : -1));
  const best = top[0].time;
  times.forEach((test) => {
    test.percent = relativePercent(best, test.time);
    const time = lpad(test.time.toString(), '.', 10);
    const percent = test.percent === 0 ? 'min' : test.percent + '%';
    const line = lpad(percent, '.', 10);
    console.log(test.name + time + line);
  });
};
