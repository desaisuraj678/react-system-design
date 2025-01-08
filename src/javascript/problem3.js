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



 /**
  * Implement a Credit Card Masker 
  *   It should replace all but the 1st and last 4 digits in the provided sequence.
      Should not mask input shorter than 6 characters.
      Should not mask non-numeric characters.
      Should return empty string for all other input types apart from string and number
  * 
    Arguments
        cardNumber (string | number): The credit card number provided by the user
  */


function maskify(cardNumber) {
  // write your code below
  if(typeof cardNumber != 'string' && typeof cardNumber != 'number'){
    return ''
  }
  let cardString = String(cardNumber)
  let len = cardString.length;
  if(len<6){
    return cardString
  }
  let first = cardString.slice(0,1); // starts fromn 0 till 1 excluding 1
  let last = cardString.slice(-4); // last 4 chars
  let masked = '';
  for(let i=1;i<len-4;i++){
    let char = cardString[i];
    let num = Number(char)
    // console.log(num)
    if(!isNaN(num)){
      masked += '#'
    } else{
      masked += char;
    }
  }
  return `${first}${masked}${last}`
}

console.log(maskify('S2k3i4p65p7y'))
console.log(maskify('4556-3646-0793-5616'))
console.log(maskify('Devtools Tech'))
console.log(maskify('S2k3i4p65p7y'))
console.log(maskify(''))