/** VVV. IMP
 * In this question, we need to implement a functionality that can be used to show different features to different users. 
 * It is commonly known as A/B testing. We need to build a common utility on frontend that can be used
 *  by the entire web-app to get the status of a feature flag. Assume that the BE is pre-built and a mock function is provided for it.

Functional Requirements
    getFeatureState should return the value of the provided feature flag.
    In case, flag is missing in the response or there is an error, return the provided default value.
    getFeatureState should support caching with a ttl and minimize calls to backend APIs.

getFeatureState(featureName: string, defaultValue: boolean): Promise<boolean>;
Arguments
    featureName (string): The name of the feature flag for which we need the status.
    defaultValue (boolean): The optional default value that would be returned by the utility function in case of error or as a fallback.
Return
    A promise where then callback receives the feature flag value or the provided default value.
 * 
 * 
 * 
 */

/**
 For unauthenticated users:
   - Feature flag or A/B testing can be done using cookies .
   - server can send the cookies set-cookies header with the value feature_flag_A , so that in next requests client can send the same cookie in the header
 */

/**
 * For authenticated users :
 *  - we can write a function
 */

const featureFlags = {
  Event_A: false,
  Event_B: true,
  Event_C: true,
};

async function getFeatureFlagAPI() {
  console.log("call to backend");
  return new Promise((resolve) => {
    setTimeout(() => resolve(featureFlags), 2000);
  });
}

class FeatureFlag {
  constructor() {
    this.featureFlagCache = {
      ttl: 2000,
      flags: {},
    };
    this.timeStamp = -Infinity;
    this.instance = null;
  }

  static returnFlag(featureName, cache, defaultValue) {
    return Object.prototype.hasOwnProperty.call(cache.flags, featureName)
      ? cache.flags[featureName]
      : defaultValue;
  }

  async getFeatureState(featureName, defaultValue) {
    const isDataFresh =
      Date.now() - this.timeStamp < this.featureFlagCache.ttl;
    const isDataPresent =
      Object.keys(this.featureFlagCache.flags).length > 0;

    if (isDataFresh && isDataPresent) {
      /**
        In an async function:
            Any returned value is automatically wrapped in Promise.resolve(value)

        An async function always returns a Promise.
          No exceptions.
          Rules:
              return value → Promise.resolve(value)
              throw error → Promise.reject(error)
              Returning a Promise → returned as-is (but still awaited internally)
       */
      return FeatureFlag.returnFlag(
        featureName,
        this.featureFlagCache,
        defaultValue
      );
    }

    if (!this.instance) {
      /* “I cache feature flags with TTL and use an in-flight promise to de-duplicate parallel API calls,
      ensuring only one backend request is made at a time.” */

      this.instance = getFeatureFlagAPI()
        .then((res) => {
          this.featureFlagCache.flags = res;
          this.timeStamp = Date.now();
        })
        .finally(() => {
          this.instance = null;
        });
    }

    try {
      await this.instance;
      return FeatureFlag.returnFlag(
        featureName,
        this.featureFlagCache,
        defaultValue
      );
    } catch {
      return defaultValue;
    }
  }
}


const ffInstance = new FeatureFlag();

ffInstance.getFeatureState("Event_A", false).then((value) => {
  console.log("Event_A :", value);
});

ffInstance.getFeatureState("Event_A", false).then((value) => {
  console.log("Event_A :", value);
});

ffInstance.getFeatureState("Event_B", false).then((value) => {
  console.log("Event_B :", value);
});

ffInstance.getFeatureState("Event_C", false).then((value) => {
  console.log("Event_C :", value);
});

ffInstance.getFeatureState("Event_D", false).then((value) => {
    console.log("Event_D :", value);
});


setTimeout(()=>{
  ffInstance.getFeatureState("Event_C", false).then((value) => {
    console.log("Event_C :", value);
  });
},4500)
