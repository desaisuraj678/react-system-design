function Person(name,profession){
    // 1. a new empty object is created and assigned to this. this = {} 
    // 2. this.__proto gets assigned to Person.Prototype

    // 3. A function body executes and can modify this
    this.name = name;
    this.profession = profession

    // 4. The implicit this is returned, if no explicit non primitive value is returned.
    // Non primitive : [],{},()=>{} // if non primitive value is returned then this gets overridden
}

const suraj = new Person('suraj','SE')
console.log(suraj)


function MyLibrary(){
    // If a constructor function is called without `new`,
    // `new.target` will be undefined (or null in some explanations).
    // This allows us to detect incorrect usage and enforce construction with `new`.
    
    if(!new.target){
        throw new Error('call me with new keyword!!')
    }
    this.name = 'suraj'
}

const lib = MyLibrary()

console.log(lib)