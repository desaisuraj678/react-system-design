/**
 * write a function memoize which will accept a callback and a exeecute a function only when the args have changed ,
 *  if args are same just return the cached value
 * 
 * const add = (a,b)=> a+b;
 * const memoizedAdd = memoize(add);
 * memoizedAdd(1,2) // executes add and returns value
 * memoizedAdd(1,2)  // returns cached value
 * 
 */



function memoize(fn){
    let cache = {};
    return function(...args){
        // Note: args here is an array.
        let argsString = args.join('_')
        if(cache[argsString]){
            return cache[argsString]
        }
        cache[argsString] = fn(...args);
        return cache[argsString]
    }
}

const add = (a,b)=> {
    console.log('executed');
    return a+b
}
const memoizedAdd = memoize(add);

memoizedAdd(1,2) 
memoizedAdd(1,2)