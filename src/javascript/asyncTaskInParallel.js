/**
 * Execute Asynchronous Functions in Parallel
 *     1. Given an array of asynchronous functions functions
 *     2. return a new promise promise
 *     3. whene all promises from an array are resolved , return the promise with value as output array of all promises. The order of Promises should be retained.
 *     4. If any of the promise is rejected then reeturn the Promise with rejected value
 *      
 * 
 *    I.e. Implement a Promise.All polyfill
 *    https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/?envType=study-plan-v2&envId=30-days-of-javascript
 */


var promiseAll = function(functions) {
    let len = functions.length;
    return new Promise((resolve,reject)=>{
        let output = Array(len)
        let count = 0
        for(let i=0;i<len;i++){
            functions[i]().then((val)=>{
                output[i] = val
                count++
                if(count === len){
                    resolve(output)
                }
            }).catch((err)=>{
                reject(err)
                /**
                 * The other promises are still executing, but their results are no longer relevant because the outer promise has already been rejected.
                    These promises will continue to run in the background unless they are explicitly canceled 
                        (which is not possible with standard JavaScript promises). However, their results will be ignored.
                 */
            })
        }
    })
};

// solution using async await
// VVImp : using ForEach instead of normal for loop because in normal for loop next function call has to wait before prev call , so it executes serially

// var promiseAll = function(functions) {
//     let len = functions.length;
//     return new Promise((resolve,reject)=>{
//         let output = Array(len)
//         let count = 0
//         functions.forEach(async (item,index)=>{
//             try{
//                 const val = await item()
//                 output[index] = val
//                 count++
//                 if(count === len){
//                     resolve(output)
//                 }
//             } catch(err){
//                 reject(err)
//             }
//         })
//     })
// };

const promise = promiseAll([() => new Promise(res => res(42))])
promise.then(console.log); // [42]






