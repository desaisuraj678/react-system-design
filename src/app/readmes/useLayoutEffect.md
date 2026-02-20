🧠 High-level answer (one line)

- Render → Commit → useLayoutEffect → Paint → useEffect

Now let’s break it down precisely.

✅ Exact execution order (step by step)

1️⃣ Render phase (JS only, no DOM / native mutations)
This is where React:
- Calls your function component
- Executes all code inside the component body
- Calculates JSX
- Does NOT touch the DOM / native UI yet

Example:

function MyComponent() {
  console.log("render");
  return <View />;
}

📌 This runs first.

⚠️ Render phase:
- Can run multiple times
- Must be pure
- No side effects allowed

2️⃣ Commit phase – DOM / Native UI mutations
React now:

- Applies changes to DOM (web) or Native UI (React Native)
- Updates layout, props, styles

📌 Still no effects have run yet.

3️⃣ useLayoutEffect runs (synchronously)
useLayoutEffect(() => {
  console.log("layout effect");
}, []);


📌 Runs after DOM/native UI mutations
📌 Runs before the screen is painted
📌 Runs synchronously (blocking paint)

This is why:

- You can read layout (measure, getBoundingClientRect)
- You can synchronously update state without flicker
- React guarantees that useLayoutEffect runs before the browser paints.

4️⃣ Paint happens (screen is updated)
Now:
- Browser paints pixels (web)
- Native UI renders to screen (RN)
- User can see the UI now.

5️⃣ useEffect runs (asynchronously)
useEffect(() => {
  console.log("effect");
}, []);

📌 Runs after paint
📌 Non-blocking
📌 Safe for:
- API calls
- Subscriptions
- Logging
- Analytics

🔁 Cleanup order (also exact)

On re-render or unmount:

useLayoutEffect cleanup

DOM/native mutations

useLayoutEffect setup

Paint

useEffect cleanup

useEffect setup

🧪 Example with logs (actual order)
function Demo() {
  console.log("render");

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    return () => console.log("cleanup layout");
  }, []);

  useEffect(() => {
    console.log("useEffect");
    return () => console.log("cleanup effect");
  }, []);

  return null;
}

Output order (first mount):
render
useLayoutEffect
useEffect


(Paint happens between useLayoutEffect and useEffect.)

📊 Final comparison table
Phase	Runs when	Blocks paint	Typical use
Render	First	❌	JSX, calculations
Commit	After render	❌	DOM / Native updates
useLayoutEffect	After commit	✅	Layout reads, sync updates
Paint	After layout effects	—	UI visible
useEffect	After paint	❌	API calls, subscriptions
🔑 Absolute rule (no exceptions)

Render always runs first

useLayoutEffect always runs before useEffect

useEffect never blocks paint