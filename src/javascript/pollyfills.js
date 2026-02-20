const arr = [1,2,3,4,5]
// let newArr = arr.filter((item)=>item%2==0)

Array.prototype.filterP = function (fn){
    let arr = this;
    let ans = [];
    for(let i=0;i<arr.length;i++){
        if(fn(arr[i])){
            ans.push(arr[i])
        }
    }
    return ans
}

let newArr = arr.filterP((item)=>item%2==0)



// let newArr = arr.filter((item)=>item%2==0)

Array.prototype.reduceP = function(fn,iValue){
    let temp = this;
    let ans = iValue;
    for(let item of temp){
        ans = fn(ans,item)
    }
    return ans
}

const ans = arr.reduceP((acc,value)=>{
  return acc+value 
},0)

console.log(ans)