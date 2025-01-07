/**
 * const arr = [1,2,[3,4],[5,6]]
 * output =  [1,2,3,4,5,6]
 * 
 */


function flattenArray(){
    let output = []
    function process(arr){
        for(let i=0;i<arr.length;i++){
            let item = arr[i];
            if(Array.isArray(item)){
                process(item)
            } else{
                output.push(item)
            }
        }
    }
    process(this)
    return output
}

Array.prototype.flatten = flattenArray
const arr = [1,2,[3,4],[5,[6]]]
const ans = arr.flatten()

console.log(ans)