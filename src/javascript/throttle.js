export function throttle(func, wait) {
    let isThrottled = false; // Tracks if the function is in the cooling period
    let lastArgs = null; // Stores the last arguments during the cooling period
    let lastThis = null; // Stores the `this` context during the cooling period
  
    return function (...args) {
      if (isThrottled) {
        // If the function is in the cooling period, save the arguments and context
        lastArgs = args;
        lastThis = this;
        return;
      }
  
      // Execute the function immediately
      func.apply(this, args);
      isThrottled = true; // Start the cooling period
  
      // Set a timeout to end the cooling period
      setTimeout(() => {
        isThrottled = false; // End the cooling period
  
        // If there was a call during the cooling period, execute the function again
        if (lastArgs) {
          func.apply(lastThis, lastArgs);
          lastArgs = null;
          lastThis = null;
        }
      }, wait);
    };
  }