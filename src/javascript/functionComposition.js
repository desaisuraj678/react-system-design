/**
 * Function composition is the process of combining two or more functions to produce a new function.
 *  Composing functions together is like snapping together a series of pipes for our data to flow through.
 * Put simply, a composition of functions `f` and `g` can be defined as `f(g(x))`
 *
 *
 *
 *
 */

// Implement a function compose which takes array of unlimited functions, and returns a composed function which can be called with initial args.
// in the returned function, function should be called from right to left i.e returned value of right function is passed to left function

var compose = function (functions) { // eg. functions = [(x) => x + 1, (x) => 2 * x]
  return function (x) {
    return functions.reduceRight((acc, item) => {
      return item(acc);
    }, x);
  };
};

const composedFunction = compose([(x) => x + 1, (x) => 2 * x]);
composedFunction(4); // 9
