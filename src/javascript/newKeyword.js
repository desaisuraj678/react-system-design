function Person(name,profession){
    // 1. a new empty object is created and assigned to this. this = {} 
    // this.__proto gets assigned to Person.Prototype

    // 2. A function body executes and can modify this
    this.name = name;
    this.profession = profession

    //3. The implicit this is returned, if no explicit non primitive value is returned.
    // Non primitive : [],{},()=>{} // if non primitive value is returned then this gets overridden
}

const suraj = new Person('suraj','SE')
console.log(suraj)


function MyLibrary(){
    if(!new.target){ // if constructor function is not called with new then new.target will be null.
        throw new Error('call me with new keyword!!')
    }
    this.name = 'suraj'
}

const lib = MyLibrary()

console.log(lib)