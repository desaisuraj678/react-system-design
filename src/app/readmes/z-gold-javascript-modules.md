# JavaScript Modules: How import / export really works

- JavaScript modules are singletons

- A module file is executed only once when it’s imported for the first time

- On first import:

- The entire file runs top-to-bottom

- Variables, functions, and exports are created

- The result is cached

Any later import of that module:

- Does not re-execute the file
- Gets the same cached exports

// counter.ts
console.log("module executed");
export const count = 0;


// fileA.ts
import { count } from "./counter";

// fileB.ts
import { count } from "./counter";


module executed
