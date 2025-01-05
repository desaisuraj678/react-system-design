/**
 * Implement clearAllTimeout in js 
 * 
 * 
 */


(function (w){
    let timeoutIds = [];
    let origininalSetTimeout = w.setTimeout;
    // Monkey paching original setTimeout
    w.setTimeout = function(...args){
     let id = origininalSetTimeout(...args);
     timeoutIds.push(id)
     return id
    }
    w.clearAllTimeout =  function(){
     while(timeoutIds.length){
       console.log('clearing IDS')
       clearTimeout(timeoutIds.pop());
     }
    }
 })(global)
 
 
 
 setTimeout(()=>console.log('One'),2000)
 setTimeout(()=>console.log('Two'),3000)
 setTimeout(()=>console.log('Three'),4000)
 setTimeout(()=>console.log('Four'),4000)
 
 clearAllTimeout()