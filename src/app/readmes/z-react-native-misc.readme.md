1. Q. fetch() api lifecycle in react.
- When you call fetch() in your React Native app, you're using a JavaScript API that is part of the Web Standards and is polyfilled in React Native.
- The fetch() function is implemented in JavaScript but delegates the actual network request to the native side via the React Native bridge.
- When fetch() is called, the request details (URL, method, headers, body, etc.) are serialized into a message and sent across the bridge to the native side
- On the native side, React Native uses platform-specific networking libraries:
    iOS: NSURLSession (or URLSession in Swift) is used to handle the network request.
    Android: OkHttp (a popular HTTP client library) is used by default in React Native.

    These libraries handle the actual network operations:
        DNS resolution.
        Establishing a connection (TCP/TLS handshake).
        Sending the HTTP request.
        Receiving the HTTP response (status code, headers, and body)
- Once the native networking library receives the response, it is passed back to the JavaScript layer via the React Native bridge.
- The response is deserialized into a JavaScript Response object

Note: Even if we write own native module to replicate fetch(''), we still need to pass request data to native, so instead using react native's fetch() would be performant.


2. There are platform-specific issues when using React Native’s KeyboardAvoidingView.
- Currently, we can use react-native-keyboard-controller and enforce edge-to-edge mode on Android to handle this more reliably.
