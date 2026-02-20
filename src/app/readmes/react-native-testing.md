UNIT TESTS:

packages:
 - Vitest
 - @testing-library/react
 - @testing-library/jest-dom
 - react test renderer
 - msw




E2E test:
- Simulate user behaviour and interactions

packges:
- Maestro
- msw (for data/api mocking)
Please read:
https://dev.to/b42/test-your-react-native-app-with-maestro-5bfj

Maestro supports testing React Native screens and apps on both Android and iOS.

1. Create a test definition file called flow.yaml 
we can create multiple flow yml files to test.

``` appId: host.exp.Exponent
---
- launchApp
- tapOn: "Add one"
- tapOn:
    id: "add_ten"
- assertVisible: "Number of taps: 11"
- tapOn: "Change me!"
- inputText: "Hello, Maestro!"
- assertVisible: "You typed: Hello, Maestro!" ```
