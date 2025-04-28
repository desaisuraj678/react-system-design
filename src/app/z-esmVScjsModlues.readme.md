# why need modules
- To avoid global namespace variable collisions




Every file we write is a module


import x from 'react'  -> ecma script modules
const x = require('./file.ts')  -> common js module  (found in Node)




1. when we are writing importing es modules in script without any bundler.
  <body>
    <script scr='./example.js' type='module'>

    </script>
  </body>


2. we can use 
  import x from './file1' or
  import x from './file1.js'

  because the bundler (webpack or Vite) will automatically resolve the file by looking for .js, .jsx, .ts, .tsx, or other supported extensions.



# Differences
1. Syntax
   ES Modules (ESM) : 
    // Exporting
    export const example = 'Hello, ES Modules!';
    export default function() { console.log('Default export'); }

    // Importing
    import example, { example as namedExample } from './example.js';

    CommonJS (CJS): 
    // Exporting
    const example = 'Hello, CommonJS!';
    module.exports = example;
    // or
    exports.example = example;

    // Importing
    const example = require('./example');

2. Loading Mechanism and module resolution
  ES Modules (ESM): 
  - Both static and dynamic imports are possible with this.
    static : import example from './example.js'; // This must be at the top level  -> static imports are resolved at compile time
    dynamic : import('./example.js').then(module => {   // dynamic imports are loaded and resolved at run time
                console.log(module.default);
                });
  - Uses a strict, standardized module resolution algorithm
  - File extensions (.js, .mjs, etc.) must be explicitly provided or resolved by the bundler/runtime.



  CommonJS (CJS) : 
  - Dynamic: Modules are loaded and executed at runtime.
  - You can use require() anywhere in the code, including conditionally or dynamically
  if (someCondition) {
    const example = require('./example');
  }
  - Uses a more flexible module resolution algorithm.
  - File extensions are optional (.js is assumed by default).

3. 
 ES Modules (ESM): 
 - The top-level this is undefined
 - Strict mode is enabled by default (can not disable it)
 - Uses .mjs for module files or .js with "type": "module" in package.json
 - Handles circular dependencies more predictably
 - Natively supported in modern browsers (<script type="module" src="./example.js"></script>)
 - Tree Shaking : Supports tree shaking (dead code elimination) because of static imports/exports
                  Bundlers like Webpack and Rollup can optimize ESM code

 CommonJS (CJS):
 - The top-level this refers to module.exports
 - Strict mode is not enabled by default (can enable it by 'use strict')
 - Uses .js for module files or .cjs for explicit CommonJS files
 - Circular dependencies can lead to unexpected behavior
 - Not natively supported in browsers (Requires a bundler like Webpack or Browserify to work in the browser)
 - Tree Shaking : Does not support tree shaking because of dynamic imports/exports
                  Harder for bundlers to optimize
  

