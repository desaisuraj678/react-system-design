/**
 * const arr = [1,2,[3,4],[5,6]]
 * output =  [1,2,3,4,5,6]
 * 
 */

let output = []

function flattenArray(arr){
    for(let i=0;i<arr.length;i++){
        let item = arr[i];
        if(Array.isArray(item)){
            flattenArray(item)
        } else{
            output.push(item)
        }
    }
}
const arr = [1,2,[3,4],[5,6]]
flattenArray(arr)

console.log(output)