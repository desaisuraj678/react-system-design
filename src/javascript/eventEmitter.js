

/**
 * How to implement Event Emitter in JavaScript? |
 * 
 */

class Emitter {
  // write your code here
  constructor() {
    this.events = new Map();
  }
  subscribe(name, callback) {
    if (typeof callback != "function") {
      throw new TypeError("Callback should be function");
    }
    if (!this.events.has(name)) {
      this.events.set(name, new Map());
    }
    let subscriptions = this.events.get(name);
    let subID = Symbol();
    subscriptions.set(subID, callback);

    const release = () => {
      if (!subscriptions.has(subID)) {
        throw new Error("Not Present");
      }
      subscriptions.delete(subID);
    };
    return {
      release,
    };
  }
  emit(name, ...args) {
    if (this.events.has(name)) {
      let cbs = this.events.get(name);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (let [_, cb] of cbs) {
        cb(...args);
      }
    } else {
      return;
    }
  }
}

const emitter = new Emitter();
emitter.emit("event_name");

const sub1 = emitter.subscribe("event_name", () => {
  console.log("callback 1");
});
// you can have multiple callbacks to the same event
const sub2 = emitter.subscribe("event_name", () => {
  console.log("callback 2");
});

emitter.emit("event_name");

sub2.release();
emitter.emit("event_name");
sub1.release();
sub1.release();
