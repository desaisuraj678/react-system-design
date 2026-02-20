/**
    Promise.all waits for all fulfillments (or the first rejection).
 */

const p1 = Promise.resolve(3);
const p2 = 1337;
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 100);
});
// Accepts an array of Promises
Promise.all([p1, p2, p3]).then((values) => {
  console.log(values); // [3, 1337, "foo"]
});




/*
  The Promise.any() static method takes an iterable of promises as input and returns a single Promise.
  This returned promise fulfills when any of the input's promises fulfills,
  with this first fulfillment value.
  It rejects when all of the input's promises reject (including when an empty iterable is passed)

*/

const promise1 = Promise.reject(new Error("error"));
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// Expected output: "quick"