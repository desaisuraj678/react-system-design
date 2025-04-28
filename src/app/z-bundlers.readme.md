# Metro bundler
- It takes in an entry file and various options, and gives you back a single JavaScript file that includes all your code and its dependencies
- For React Native, the bundler is responsible for transforming and bundling your code so it can run on both iOS and Android devices
Stages of metro:
1. Resolution
   - Metro builds a graph of all the modules that are required from the entry point
   - It traverses your import statements and builds a dependency graph
   - To find which file is required from another file Metro uses a resolver
2. Transformation
   - All modules go through a transformer
   - A transformer is responsible for converting (transpiling) a module to a format that is understandable by the target platform (eg. React Native)
   - Metro uses Babel under the hood to transform your JavaScript code into a format that can be executed by the JavaScript engine (e.g., Hermes or         JavaScriptCore)
   - It also handles assets like images, fonts, and other files, converting them into a format that can be bundled and loaded by the app
3. Serialization
   - As soon as all the modules have been transformed they will be serialized
   - A serializer combines the modules to generate one or multiple bundles
   - The bundle is optimized for performance, with features like tree-shaking (removing unused code) and minification (reducing file size)