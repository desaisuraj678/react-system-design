const TAB_SPACE = 4

function getSpaces(level){
    return Array(level*TAB_SPACE).fill(' ').join('')
}

class Node {
    constructor(name){
        this.name = name;
        this.children = [];
        this.innerHTML = ''
    }
    appendChild(node){
       this.children.push(node)
    }
}

class VDocument extends Node {
    constructor(){
        super('html')
    }

    createElement(name){
      let node = new Node(name);
      return node
    }

    render(){
       function printNode(node,level){
          let output = `${getSpaces(level)}<${node.name}> \n`;
          if(node.innerHTML){
            output += `${getSpaces(level+1)}${node.innerHTML} \n`
          }
          for(let item of node?.children){
             output += printNode(item,level+1)
          }
          output += `${getSpaces(level)}</${node.name}> \n`
          return output
       }
       return printNode(this,0)
    }

}

const vDocument = new VDocument();
const body = vDocument.createElement('body');
const div = vDocument.createElement('div');
div.innerHTML = 'My name is suraj';
vDocument.appendChild(body);
body.appendChild(div)

console.log(vDocument.render())

/**
 * <html>
 *     <body>
 *          <div>
 *              My name is suraj
 *          </div>
 *     </body>
 * </html>
 * 
 * 
 * 
 */
