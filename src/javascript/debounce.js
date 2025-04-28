function debounce(fn,delay){
    let timer;
    return function(...args){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fn(...args)
        },delay)
    }
}

let debouncedFn = debounce(()=>console.log("hi"),500)
debouncedFn()

/* 
Suppose there is a api call that started 2sec ago and there is api call started now and response of first api call came later than second api call. so the response of
first will override the response of second which is wrong. how do we prevent that ?

**  Abort Controller is used to cancel unfinished api calls
 

*/

const controller = new AbortController();
const {signal,abort} = controller;

fetch('url',signal)

abort()


