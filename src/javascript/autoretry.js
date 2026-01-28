/**
 * Implements a function fetchWithAutoRetry(fetcher, maximumRetryCount)
 * Automatically retries the fetcher up to the given number of attempts.
 */

function fetchWithAutoRetry(fetcher, maximumRetryCount = 3) {
  if (maximumRetryCount <= 0) {
    return Promise.reject(
      new Error("maximumRetryCount must be greater than 0")
    );
    /*
    What callers usually expect
    If function is async / promise-based:
        fetchWithAutoRetry().catch(err => { ... })
        This ONLY works if:
              the function throws
              or returns Promise.reject(...)
    */
  }

  console.log('retrying ..',maximumRetryCount)

  return fetcher()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (maximumRetryCount === 1) {
        throw err; // Rethrow the error if retries are exhausted
      }
      return fetchWithAutoRetry(fetcher, maximumRetryCount - 1); // Retry recursively
    });
}

// Example fetcher function
function fetcher() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a failure
      reject("hi rejected");
    }, 1000);
  });
}

// Test the function
(async () => {
  try {
    const result = await fetchWithAutoRetry(fetcher, 4);
    console.log(result);
  } catch (error) {
    console.error("Final error:", error); // Handle failure gracefully
  }
})();
