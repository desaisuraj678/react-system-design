// 1
class Person {
    constructor(name){
        this.name = name 
    }
    print = ()=>{ // this is arrow function so gets attached to this(same as normal variable), i.e this.print = ()=>{}
        console.log(this.name)
    }
}

class Employee extends Person {
    constructor(name,id){
        super(name);
        this.id = id;
    }
    print(){ // // this is not an arrow function so gets attached to Employee.prototype
        console.log(this.name,this.id)
    }
}

const one = new Person('one');
one.print(); // one
const two = new Employee('two',2)
two.print() // two since arrow function is first accessible, it gets called first




// 2
function Person1(name){
    this.name1 = name
}

Person1.prototype.getName = ()=>{ // arrow function do not have this, so this is of the function its declared.
    console.log(this) // global object
    return this.name1
}

const suraj = new Person1('suraj')
console.log(suraj.getName()) // undefined

// 3

function parseData(data){
    return data
}

class User {
    constructor(name,data){
        const parsedData = parseData(data);
        this.name = name;
        this.data = parsedData
        return parseData // since parseData is explicitly returned from here , the default return is dissmised and parseData is returned
    }
    getData(){
        return this.data
    }
}

const suraj1 = new User('suraj1',{
    temp1: 'sura/ss',
    value: true
})

// console.log(suraj1.getData()) // TypeError: suraj1.getData is not a function


function Person2(name){
    this.name = name;
}

Person2.prototype.sayName = function(){
    console.log(this.name)
}

const suraj2 = new Person2('suraj2');
console.log(suraj2.sayName()) // suraj2
console.log(Person2.prototype.sayName()); // undefined :  sayName is called by prototype object so it does not have name
console.log(Object.getPrototypeOf(suraj2).sayName()); // undefined :  sayName is called by prototype object so it does not have name
console.log(suraj2.__proto__.sayName())  // undefined :  sayName is called by prototype object so it does not have name