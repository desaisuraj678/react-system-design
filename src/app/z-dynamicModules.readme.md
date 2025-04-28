# Importing Dynamic modules 
- reduces initial load time
- Reduces memory


Q: How to handle runtime errors in dynamic imports
** When using dynamic imports in React or React Native, errors can occur at runtime if the module fails to load
 (e.g., due to network issues, incorrect paths, or server errors)

 1. Using try/catch with Dynamic Imports

    `const [Component, setComponent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                const module = await import('./SomeComponent'); // ** dynamic imports returns promise
                setComponent(() => module.default);
            } catch (err) {
                setError(err);
                console.error('Failed to load component:', err);
            }
        };
        loadComponent();
    }, []);`

2. Using React Error Boundaries
React Error Boundaries can catch JavaScript errors anywhere in the component tree and display a fallback UI.
You can wrap your dynamically imported component in an Error Boundary to handle runtime errors.

    `<ErrorBoundary>
      <Component />
    </ErrorBoundary>`


In react:
1. Code Splitting with React.lazy and Suspense
React provides built-in support for dynamic imports using React.lazy and Suspense.

`const SomeComponent = React.lazy(() => import('./SomeComponent'));
const MyComponent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SomeComponent />
  </Suspense>
);`

Also should wrap it with Error boundary for catching errors
