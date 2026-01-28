Q. useEffect runs first or its cleanup function ? Does it run on every dependencies change of useEffect 
- Clean up function runs before useeffect and clean ups previous useeffect.
- Yes useEffect runs on every dependency change of useEffect
- eg. usefull for avoiding race situations

Q. Does all children of React Context Provider rerun on context state change?
- No if we handle the context correctly

    `import React from "react"

    export const CountContext = useContext(null)

    export default function CountContextProvider({children}) {
    const [count, setCount] = useState(0)

    return (
        <CountContext.Provider value={{count, setCount}}>
        {children}
        </CountContext.Provider>
    )
    }`



    `import CountContextProvider, {CountContext} from './contexts/count-context'

    export default function App() {
    return (
        <main>
            <CountContextProvider>
                <ExampleComponent1 />
                <ExampleComponent2 />
            </CountContextProvider>
        </main>
    )
    }`

 - Put react context Provider in seperate Component/file
 - Manage state in that file
 - pass {children} to Provider component
 - By using this <CountContextProvider>
            <ExampleComponent1 />
            <ExampleComponent2 />
        </CountContextProvider> strategy react does not rerender all children but renders only those which consumes context
- this is because {children} does not change on every state change.
- Above technique is useful in without context as well


# React techniques to optimize rerenders by composition (Moving State Up).
1. Components as children prop -> Containment (Children Composition pattern)   ::(used in above context example)  
  Few Concepts:
   - Component is a function that returns an element (an object that describes a component)
    const Parent = ()=>{
        const [state,setState] = useState(0)
        return <Child/>  Before: {type: Child, ...} 
        // type tells react what should be rerendered from this component
        // If type is a function then react will assume it is a component and will rerender that function (does this recursively)
        // when some interaction happens its time to trigger rerender. This is where diffing and reconciliation comes in.
        // Starting from the componets that triggered state updates, react will start building new tree object with new state value. after : {type: Child,...}
        // React does shallow comparison of before and after object (for object compoaring by reference)
        // If comparison returns true, react assumes there is no change. so no rerender.
        // If comparison returns false, react rerenders the component
        // In our case when state of the parent component change => react will create new object for Child hence it rerenders.

    }

    const Parent = ({children})=>{
        const [state,setState] = useState(0)
        return children
        // In this case when state of the parent component change => react will still have same children props hence no rerender.
    }

  
  const ComponentWithScroll = ({children})=>{
     const [scrollX,setScrollX] = useState(0);
     return <div onScroll={({target}) => setScrollX(target)}>
                {children}
     </div>
  }


  const Component = ()=>{
    <ComponentWithScroll>
        <VerySlowcomponent/>
        <BunchOfSlowStuff/>
    </ComponentWithScroll>
  }

  This does not rerender because props(here children) are not affected by state changes
  as long as it is the same component references and props


2. Components as props (composition pattern)


const ComponentWithScroll = ({column,content})=>{
    const [isCollapsed,setIsCollapsed] = useState(false);
    return <div>
    <div style={{width:isCollapsed?10:30}}>
        {column}
    </div>
    <div>
    <button onClick={()=>setIsCollapsed(true)}>
     {content}
    </div>
    </div>
}

 const Component = ()=>{
    <ComponentWithScroll column={<VerySlowcomponent/>} content={<BunchOfSlowStuff/>} />
  }

# HOC (Higher order component)

function withLogging(WrappedComponent) {
  return function (props) {
    console.log("Component rendered:", WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}

const EnhancedComponent = withLogging(MyComponent);


# Moving state down (performance optimization)

Q. Suppose we want to add a modal component which opens and closes on a button click. and this resides on the Top of the hierarchy.
If we dont move state down then we will face perfomance issue.

// State change is source of rerender of a component and all of its children.

const ModalComponent = ()=>{
  const [isOpen,setIsOpen] = useState(false);
  return <div>
    <button onClick={()=>setIsOpen(true)}/>
    {isOpen ? <Modal onClose={()=>setIsOpen(false)}/> : null}
    </div>
}

export default function App() {
  return (
    <div className="App">
      <ModalComponent/> // by moving state of modal component down to child we optimize the performance.
      <VerySlowComponent/>
      <OtherStuff/>
      <ComplicatedStuff/>
    </div>
  );
}


# Memoizatiom

1. UseCallback
 - Memoizes function itself
 - Every hook (here useCallback) is called on every rerender.
    Then how does it caches function or reference is same?
    under the hood

    let cachedCallback
    const useCallback = (callbackToMemoize)=>{
        // so callbackToMemoize arg is different for every rerender but it returns cachedCallback if dependencies are not changed
        if(!dependenciesEqual()){
            cachedCallback = callbackToMemoize
        }
        return cachedCallback
    }



2. useMemo
 - Memoizes the value returned from the function
 - useMemo impl is same just diff is it calls the callbackToMemoize()


Q. useMemo is better in performance than useCallback?
- Myth. none of them is better than other.


// Unnecessary
const Component = ()=>{
    // This is useless. Dont do this
    const onClick = useMemo(()=>{
        console.log('rendered)
    },[])

    return <button onClick={onClick}>Click me</button>
}

1. // should use in below case
const memoChild = useMemo(Child);

const Parent = ()=>{
    const memoData = useMemo(()=>({id:1}),[])
    return <memoChild data={memoData}/>
}


1. 
const ParentComponent = ()=>{
    const [state,setState] = useState(0);
    return <MemoChild>
        <div>This will rerender </div>
    </MemoChild>
}
Above MemoChild component will rerender if ParentComponent rerenders or state changes in ParentComponent  because children ( <div>This will rerender </div>)
 which is passed to MemoChild changes on every rerender.

Solution
// here MemoChild does not rerender
const ParentComponent = ()=>{
    const [state,setState] = useState(0);
    const children = useMemo(()=><div>This will rerender </div>,[])
    return <MemoChild>
        {children}
    </MemoChild>
}

2. 
const MemoChild = React.memo(Child)
const MemoParent = React.memo(Parent)

const Component = ()=>{
    return <MemoParent>
       <MemoChild/> // this is not memoized so will rerender every time parent rerenders
    </MemoParent>
}

Solution.

const Component = ()=>{
    const children = useMemo(()=> <MemoChild/>,[])
    return <MemoParent>
       {children} 
    </MemoParent>
}

IMP: useCallback and useMemo used with React.memo() prevents rerendering. Alone they wont be able to.


# Reconciliation

Virtual DOM: 

{
    type:'input', // for dom elements (string type)
    props:{
        children :{
            ....
        }
    }
}

{
    type: Component,  // for components : represents as function
    props:{
        children :{
            ....
        }
    }
}

- react iterates over all nodes and its children to get the actual dom to render
- when state changes then new DOM is created with new state.
- Compares new DOM with old DOM
- It first does shallow comparisons of objects at each level
- If both are same no need to update actual DOM
- If not same then check for the "type" property (for exampe type:"input")
  a. - If types are same then react will mark this portion of tree as "needs update"
     - and rerender of that component will trigger 
     - only new props of that componets will be applied

  b. - If types are different (for exampe {type:"input"} and {type:"button"}) then react assumes this subtree needs some radical change
     - needs to remove old subtree from the actual DOM, destroy instance
     - and new subtree will be build and mounted from scratch , everything inside will be brand new






