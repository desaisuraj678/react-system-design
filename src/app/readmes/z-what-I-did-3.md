🍎 Apple Wallet Extension (Expo + iOS Targets)
Problem Statement

Apple Wallet integration requires multiple iOS targets, including:

A UI Extension

A Non-UI (Service) Extension

However, Expo (managed workflow) does not natively support creating or managing multiple iOS targets within a single application. This became a major roadblock for integrating Apple Wallet.

Initial Consideration: Expo Eject

The most straightforward solution was to eject from Expo and manage targets manually in Xcode.
While technically feasible, this approach had significant drawbacks:

Loss of Expo-managed workflow benefits

Increased manual intervention in Xcode

Difficult to scale across multiple bank-specific apps

High operational overhead during releases

Poor fit for a monorepo with configurable builds

Given that we were releasing the same app across multiple banks, this approach was not sustainable.

Final Approach: Automated Target Generation via Expo Config Plugin ✅
Key Insight

Instead of ejecting, we decided to extend Expo’s capabilities by programmatically generating iOS targets during the CI/CD process.

Taking inspiration from expo-target by Evan Bacon, we implemented a custom Expo config plugin that dynamically creates and configures Apple Wallet extension targets.

Solution Architecture
High-Level Flow

Expo Config Plugin

Implemented a custom Expo config plugin

Plugin runs during the prebuild phase

Responsible for orchestrating target creation

Xcode Project Manipulation

Used xcodeproj (Ruby) to modify the Xcode project

Generated:

Apple Wallet UI Extension target

Apple Wallet Non-UI extension target

Targets were created dynamically during the CI/CD pipeline

Configuration Injection

Critical configuration values were passed from the Expo config plugin to the Ruby script, including:

Bundle identifiers

App group identifiers

App / extension display names

Entitlements and capabilities

Enabled per-bank customization without manual Xcode changes

CI/CD Integration

Entire flow executed automatically in CI/CD

No local Xcode intervention required

Each build generated correctly configured targets based on environment

Why This Approach Worked

Preserved Expo managed workflow

Avoided ejecting and manual Xcode maintenance

Fully compatible with monorepo architecture

Supported multiple banks / white-label apps

Enabled reproducible and configurable builds

Reduced human error in release pipelines

Key Advantages

🚀 Zero manual target setup

🔁 Fully automated and repeatable

🧩 Scales across multiple apps and clients

🏗 Maintains clean separation between app and extensions

🔐 Proper handling of entitlements and app groups

Impact

Successfully integrated Apple Wallet extensions without ejecting from Expo

Simplified release process across multiple banks

Reduced operational risk and maintenance cost

Enabled rapid onboarding of new Apple Wallet integrations
