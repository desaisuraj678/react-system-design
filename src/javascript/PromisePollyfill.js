function MyPromise(exec){

    let isCalled =false;
    let thenHandler;
    let catchHandler;
    function resolve(val){
        if(!isCalled && typeof thenHandler == 'function'){
            thenHandler(val)
            isCalled = true
        }
    }

    function reject(val){
        if(!isCalled && typeof catchHandler == 'function'){
            catchHandler(val);
            isCalled = true
        }
    }

    this.then = (thenCall)=>{
        thenHandler = thenCall;
        return this
    }

    this.catch = (catchCall)=>{
        catchHandler = catchCall
        return this
    }

    exec(resolve,reject)

}


new MyPromise((resolve,reject)=>{
    let temp = false
    if(temp){
        setTimeout(()=>{
            reject('Promise rejected')
         },500)
         return
    }
    setTimeout(()=>{
       resolve('Promise resolved')
    },1000)
})