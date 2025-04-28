function flattenObj(currObj){
    const flattendObj = {};
    function process(obj, currKey){
        Object.entries(obj).forEach(([key, value]) => {
            let newKey;
            if(currKey){
                newKey = `${currKey}_${key}`
            }else {
                newKey =  key;
            }
            if (typeof value == 'object'){
                return process(value, newKey)
            }else {
                flattendObj[newKey] = value
            }
        })
        return flattendObj
    }
    return process(currObj)
}

let currObj = {
    address: {
        pin: 1222,
        village: 'sangli'
    },
    name: 'suraj',
    arr: [{name: 'suraj'}, 3, 4]
}

console.log(flattenObj(currObj))