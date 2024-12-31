/**
 * Implement a ComputeAmount function which will support ComputeAmount().lakhs(15).crores(5).crores(2).thousand(45).value() 
       should return the sum value of operations
 */

function ComputeAmount() {
  class helper {
    constructor() {
      this.total = 0;
    }
    crores(value) {
      this.total += value * 10000000;
      return this
    }
    lakhs(value) {
      this.total += value * 100000;
      return this
    }
    value () {
        return this.total;
    }
  }
  return new helper();
}

console.log(ComputeAmount().lakhs(10).crores(2).value());
