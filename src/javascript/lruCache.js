/**
 *
 * Implement LRU cache
 */

// Implementation using the map

class LRUCache {
  constructor() {
    this.map = new Map();
    this.capacity = 3;
  }

  set(key, val) {
    if (this.get(key) == -1) {
      if (this.map.size == this.capacity) {
        for (let item of this.map) {
          this.map.delete(item[0]);
          break
        }
      }
    }
    this.map.set(key, val);
  }

  get(key) {
    if (this.map.has(key)) {
      let val = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, val);
      return val;
    } else {
      return -1;
    }
  }

}

const lruCache = new LRUCache();
lruCache.set("key1", "val1")
lruCache.set("key2", "val1")
lruCache.set("key3", "val1")
lruCache.get("key1")
lruCache.set("key4", "val1")
console.log(lruCache.map);


// Implementation using doubly linked list
