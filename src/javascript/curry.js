/**
 * In mathematics and computer science, currying is the technique of translating a function that takes multiple
 *  arguments into a sequence of families of functions, each taking a single argument.
 * 
 * 
 * 
 */

// Please implement a curry() function, which accepts a function and return a curried function.

// Here is an example

function curry(fn) {
    // your code here
    return function curried(...args){
      if(args.length>=fn.length){ // mostly it will return when == but if extra args are provided it will run and will ignore extra args
        return fn.call(this,...args)
      }
      return function(...remainingArgs){
        return curried.call(this,...args,...remainingArgs)
      }
    }
}

const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)
curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(1)(2, 3) // '1_2_3'
curriedJoin(1, 2)(3) // '1_2_3'