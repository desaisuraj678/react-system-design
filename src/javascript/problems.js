/**
 * Implement a ComputeAmount function which will support ComputeAmount().lakhs(15).crores(5).crores(2).thousand(45).value() 
       should return the sum value of operations
 */

function ComputeAmount() {
  class helper {
    constructor() {
      this.total = 0;
    }
    crores(value) {
      this.total += value * 10000000;
      return this
    }
    lakhs(value) {
      this.total += value * 100000;
      return this
    }
    value () {
        return this.total;
    }
  }
  return new helper();
}

console.log(ComputeAmount().lakhs(10).crores(2).value());



/**
 * Write a function chunck(arr,size) and returns a chunked array
 * chunck([1,2,3,4,5],2)    => [[1,2],[3,4],5]
 */


function chunck(arr,size){
  let result = [];
  let temp = [];
  for(let item of arr){
     temp.push(item)
     if(temp.length == size){
       result.push([...temp])
       temp.length = 0;
     }
  }
  if(temp.length){
    result.push([...temp])
    temp.length = 0
  }
  return result
}


console.log(chunck([1,2,3,4,5],2))



/**
 * create a count function which will increment count on every count() call and count.reset() will reset it
 * count() // 1
 * count() // 2
 * count() // 3
 * count.reset() // 0
 * count() // 1
 * count() // 2
 * count() // 3
 */ 



let count = (function (){
  let count = 0
  function temp(){
      count++
      return count
  }
  temp.reset = function(){
    count = 0
    return count
  }
  return temp
})()

console.log(count())
console.log(count())
console.log(count())
console.log(count())
console.log(count.reset())
console.log(count())
console.log(count())
console.log(count())