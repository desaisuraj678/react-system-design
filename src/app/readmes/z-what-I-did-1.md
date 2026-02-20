🔐 Security – Runtime Application Self-Protection (RASP)
### Problem Statement

During security audits, pentesters identified multiple runtime vulnerabilities in our Android and iOS applications.
Examples included:

- Ability to hook the app using tools like Frida
- Accessing in-memory data at runtime
- App tampering and reverse engineering risks

At the time, our codebase relied on the open-source library JailMonkey for root/jailbreak detection. However, this approach had several limitations:
- Easily bypassable
- Limited coverage of modern runtime threats
- Not suitable for production-grade security requirements

This pushed us to explore enterprise-level RASP solutions.

Evaluated Solutions

We evaluated multiple paid security providers for our React Native setup, including:
- Talsec
- GuardSquare (DexGuard / iXGuard)

After evaluation, we selected GuardSquare, as:
- It is widely adopted across the industry
- It provides strong RASP capabilities

It offers multiple integration models, allowing flexibility in architecture

Solution 1: Apply DexGuard on APK / IPA
Approach

- Generate APK (Android) and IPA (iOS) artifacts
- Run DexGuard / iXGuard scripts on these artifacts
- Allow GuardSquare to inject runtime security checks directly into the app binaries

Drawbacks

- Required exposing APKs/IPAs to a third party
- Extremely expensive
- The solution had to be applied per app
- Our codebase was a monorepo, generating 8 apps at the time
- Cost scaled linearly with every new app

➡️ This approach was not sustainable long-term.

Solution 2 (Final): Apply RASP at AAR / Framework Level ✅
Core Idea

Instead of securing final app binaries, we decided to:

- Apply GuardSquare checks at the library level
- Reuse the secured artifacts across multiple apps

Why This Worked

- Significantly cheaper than APK/IPA-level protection
- Reusable across all apps in the monorepo
- Centralized security logic
- Easier to maintain and scale

🔒 Runtime Threats Addressed (RASP)
Goal

Detect and mitigate runtime attacks in production, not just at build time.

Covered Threats:

- Rooted / jailbroken devices
- App tampering & repackaging
- Debugging & hooking (Frida, Xposed)
- Emulator & virtual environment attacks
- Reverse engineering attempts

Architecture & Implementation
High-Level Flow
1. Create minimal native projects

Android and iOS projects with minimal code

Only essential logic and exposed callbacks

2. Generate native artifacts

Android → AAR

iOS → Framework

3. Apply GuardSquare protection

Run DexGuard / iXGuard scripts on the AAR and Framework

Inject runtime security checks at the library level

4. Publish secured artifacts

Publish Android AAR to a private Maven repository

Use secured iOS Framework in the native module

5. Create a React Native security package

Consume the protected AAR and Framework

Expose native callbacks via a React Native bridge

6. Distribute the package

Publish the package to a private NPM repository

Install it inside the main monorepo

7. Runtime behavior based on risk severity

Low-severity checks (e.g., emulator detection):
→ Expose callbacks to the JS layer

High-severity checks (e.g., hooking detection):
→ Immediately crash the app

8. Obfuscation of failure signals

App crashes used randomized error codes

Prevented attackers from identifying the actual detection reason

9. CI/CD Integration

Entire process automated via CI/CD

Any change triggered:

Regeneration of artifacts

Re-application of GuardSquare scripts

Publishing of updated packages

Impact:
- Enterprise-grade RASP protection across all apps
- Drastically reduced cost compared to APK/IPA-level security
- Centralized and reusable security layer
- Harder to reverse engineer or bypass
- Seamless integration with existing monorepo and CI/CD pipelines
