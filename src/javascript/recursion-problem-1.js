// You are given a CSV string that contains hierarchical data in the following format:

// id: A unique identifier for the node.

// parentId: The identifier of the parent node. The root node has a parentId of null (denoted as an empty string in the CSV).

// name: The name of the node.

// Your task is to write a function that parses this CSV string and converts it into a hierarchical JSON structure, where each node contains its child nodes. Nodes with a parentId of null are root nodes, and nodes should be nested recursively within their parents in a children array.

// [
//   {
//     "id": 1,
//     "parentId": null,
//     "name": "Root",
//     "children": [
//       {
//         "id": 2,
//         "parentId": 1,
//         "name": "Child A",
//         "children": [
//           {
//             "id": 4,
//             "parentId": 2,
//             "name": "Grandchild A1",
//             "children": [
//               {
//                 "id": 7,
//                 "parentId": 4,
//                 "name": "Great Grandchild A1-1",
//                 "children": [
                  
//                 ]
//               }
//             ]
//           },
//           {
//             "id": 5,
//             "parentId": 2,
//             "name": "Grandchild A2",
//             "children": [
              
//             ]
//           }
//         ]
//       },
//       {
//         "id": 3,
//         "parentId": 1,
//         "name": "Child B",
//         "children": [
//           {
//             "id": 6,
//             "parentId": 3,
//             "name": "Grandchild B1",
//             "children": [
              
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ]

// Test Data: CSV string input
const csvData = `id,parentId,name
1,,Root
2,1,Child A
3,1,Child B
4,2,Grandchild A1
5,2,Grandchild A2
6,3,Grandchild B1
7,4,Great Grandchild A1-1`;
// Call the function with CSV data'

function csvToJsonHierarchy(csv){
  const arr = csvData.split('\n');
  let map = new Map();
  
  let rootParent = null
  for(let i=1;i<arr.length;i++){
      let item = arr[i].split(',');
      if(item[1]==''){
         rootParent = {
             name: item[2],
             id: item[0]
         }
      } else {
         if(map.has(item[1])){
           let value = map.get(item[1]);
           let obj = {
               name:item[2],
               id: item[0],
               parentId:item[1],
               children : []
           }
           value.push(obj);
           map.set(item[1],value)
         } else {
             let obj = {
                 name : item[2],
                 id: item[0],
                 parentId : item[1],
                 children:[]
             }
             map.set(item[1],[obj]);
         }
      }
  }

  function process(node){
      let curr = map.get(node.id);
      if(!Array.isArray(curr)){
         return node;
      }

      for(let currNode = 0; currNode < curr.length; currNode++){
          let value = process(curr[currNode]);
          node.children.push(value)
      }
      return node;
  }

  let rootNode = {
      name: rootParent.name,
      id: rootParent.id,
      parentId: null,
      children : []
  }
  process(rootNode)
  return rootNode
}
const result = csvToJsonHierarchy(csvData);
// Output the result
console.log(JSON.stringify(result, null, 2));







