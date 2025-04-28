Native Modules:

1. activity.runOnUiThread(new Runnable() {
    // code
})

2. reactContext.runOnJsQueueThread {
     promise.resolve(photos) 
   }

Reanimated: 
3. runOnJS()
4. runOnUI()