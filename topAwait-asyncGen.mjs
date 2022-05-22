/**
 * Using top-level await operator (out of async IFI)
 */
'use strict';

async function* ids(...args) {
  for (let i = 0; i < args.length; i++) {
    const id = args[i];
    if (id === undefined) return;
    yield id;
  }
}

const id = ids(1234, 1327, 1769, 1048, 1923, 1580);
/*
let val;
do {
  val = await id.next();
  console.log({ val });
} while (!val.done);
*/
for await (const el of id) {
 console.log({ el });
}
