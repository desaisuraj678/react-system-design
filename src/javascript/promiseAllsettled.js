/**
    Promise.allSettled()
        The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise.
        This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed
 */

const promise1 = Promise.resolve(3) // this also returns a promise
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "foo"),
);
const promises = [promise1, promise2]; // IMPORTANT: it is an array of promises.

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status)),
);

// Expected output:
// "fulfilled"
// "rejected"

/* results array returned from Promise.allSettled is an array of objects with {status:,value:,reason:}
status:
    A string, either "fulfilled" or "rejected", indicating the eventual state of the promise.

value
    Only present if status is "fulfilled". The value that the promise was fulfilled with.

reason
    Only present if status is "rejected". The reason that the promise was rejected with.

*/

/* 
Q. For each handle, you need to make an independent API call and collect the results such that:
    All API calls run in parallel

    A failure in one API call must not fail the entire operation

    Successful responses should be mapped back to their corresponding handles

    Failed API calls should return null for that handle

    The final result should be returned as a Map
*/

const handles = ['a','b','c'];

async function getHandlesResponse(handles){
    function getApiRes(id){
        const endPoint = `https://dummyjson.com/products/${id}`
        return fetch(endPoint).then((res)=>{
            return res.json()
        }).catch(()=>{
            return null
        })
    }
    let handlesFn = handles.map((id)=>{
        return getApiRes(id);
    })
    let ansMap = new Map();
    await Promise.allSettled(handlesFn).then((ans)=>{
        ans.forEach((item,index)=>{
            if(item.status === 'fulfilled'){
                ansMap.set(handles[index],item.value)
            }
        })
    })
    
    return ansMap
}

// response 
// {'a':{},'b':{},'c':null,........}
getHandlesResponse(handles).then((res)=>{
        console.log(res)
})
