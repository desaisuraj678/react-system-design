1. JS Thread
2. UI/Main Thread
3. Shadow Thread

4. Worklet Thread - Can launch multiple Javascript runtimes with react native worklets.


** IMP Observation : 
- When JS thread is completely blocked like with infinite while loop then also things that are running on main thread keep on running. 
- eg. I was able to scroll through Reanimated flatlist items even after blocking JS thread.
- But things that are running on JS are not executed like seTimeout and State changes
- So no app crash was observed when JS thread is blocked.

 
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