React Native: Old vs New Architecture
1️⃣ Old Architecture (Bridge-based)
High-Level Overview

- In the old React Native architecture, communication between JavaScript and native code happened through an asynchronous Bridge.

Internal Working::

Metro Bundler
- Bundles JavaScript code into a single JS bundle.

JavaScript Engine (JSC)
- Executes the JS bundle on the JavaScript thread.
- JS logic (state updates, event handling) runs here.

Bridge (JSON-based)

JS communicates with native modules using serialized JSON messages.

Communication is:

- Asynchronous
- Batched
- One-directional per batch

Native Side

Runs on the UI thread

Handles:

Native UI rendering

Native modules (camera, storage, etc.)

Yoga (Shadow Thread)

Calculates layout using Flexbox.

Sends layout results back to native UI.

Key Characteristics

❌ JSON serialization/deserialization overhead

❌ No synchronous calls

❌ Bridge bottleneck for high-frequency updates

❌ Difficult to share objects between JS and Native

❌ Performance issues in animation-heavy or large apps

2️⃣ Problems with Old Architecture
Area	Issue
Performance	Bridge becomes a bottleneck
Memory	Duplicate copies of data (JS + Native)
Latency	Async-only communication
Debugging	Hard to trace JS ↔ Native calls
Scaling	Poor performance for complex UIs
3️⃣ New Architecture (JSI-based)

The New Architecture fundamentally removes the Bridge and introduces direct communication between JavaScript and native code.

Core Building Blocks of the New Architecture
🧠 Hermes Engine

Hermes is the default JavaScript engine in the new architecture.

What it does:

Precompiles JS into bytecode

Loads bytecode directly at runtime

Executes JS faster with lower memory footprint

Benefits:

Faster startup time (TTI)

Reduced memory consumption

Smaller app bundle size

Optimized specifically for React Native

🔗 JavaScript Interface (JSI)

JSI is the core replacement for the Bridge.

Key Points:

Written in C++

Provides direct access between JS and native

No JSON serialization

No async-only limitation

What changes:

JS can hold references to native objects

Native can directly invoke JS functions

Enables synchronous execution when needed

4️⃣ JSI – Internal Working
How it works

JS code references a native object

JSI creates a shared C++ representation

Both JS and Native operate on the same memory

Calls are:

Faster

Type-safe

Synchronous (when required)

📌 This eliminates:

Bridge queues

Message batching delays

Serialization cost

5️⃣ Turbo Modules (New Native Modules System)

Turbo Modules replace the old Native Modules system.

Internal Working

Type-safe specs

Defined using TypeScript interfaces

Example: Spec extends TurboModule

Codegen

Automatically generates:

C++ bindings

Platform-specific native code

Ensures consistency across platforms

Lazy Loading

Native modules are loaded only when accessed

Reduces startup time and memory usage

Benefits

Strong type safety

Faster native calls

Shared code across platforms

Reduced runtime errors

6️⃣ Fabric (New Rendering System)

Fabric is the new UI rendering system.

How Fabric Works

Uses JSI for communication

UI updates can happen synchronously

Layout calculations and rendering are more tightly coupled

Better thread coordination

Improvements

Reduced dropped frames

Better animation performance

Improved interoperability with native UI components

7️⃣ New Architecture Data Flow (Simplified)
JS (Hermes)
   ↕ (JSI – C++)
Fabric / Turbo Modules
   ↕
Native UI & Native Modules


📌 No Bridge
📌 No JSON
📌 Shared memory
📌 Faster execution

8️⃣ Old vs New Architecture – Summary Table
Aspect	Old Architecture	New Architecture
Communication	Bridge (JSON)	JSI (C++)
Calls	Async only	Sync + Async
Serialization	Required	Not required
Performance	Slower	Faster
Native Modules	Legacy	Turbo Modules
Rendering	Legacy UI Manager	Fabric
JS Engine	JSC	Hermes
Memory Usage	Higher	Lower
9️⃣ Why the New Architecture Matters

Designed for modern mobile apps

Handles complex animations and gestures

Enables real-time native integrations

Scales better for large applications

Brings React Native closer to true native performance