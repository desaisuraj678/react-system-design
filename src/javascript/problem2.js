/**
 * Implement an asynchrous task runner with concurreny control.
 *
 *
 */

class TaskRunner {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.currentTasks = 0;
    this.queue = [];
  }

  // Schedule a task (fire-and-forget)
  push(task) {
    if (this.currentTasks < this.concurrency) {
      this.execute(task);
    } else {
      this.queue.push(task);
    }
  }

  async execute(task) {
    this.currentTasks++;

    try {
      await task();
    } finally {
      this.currentTasks--;

      if (this.queue.length > 0 && this.currentTasks < this.concurrency) {
        const nextTask = this.queue.shift();
        this.execute(nextTask);
      }
    }
  }
}


const taskRunnerInstance = new TaskRunner(3)

async function delay(timeout) {
    return new Promise((resolve)=>setTimeout(resolve,timeout))
}
const t1 = async ()=>{
    console.log('t1 started')
    await delay(2000)
    console.log('t1 finished')
}

const t2 = async ()=>{
    console.log('t2 started')
    await delay(1000)
    console.log('t2 finished')
}

const t3 = async ()=>{
    console.log('t3 started')
    await delay(1500)
    console.log('t3 finished')
}

const t4 = async ()=>{
    console.log('t4 started')
    await delay(1000)
    console.log('t4 finished')
}

const t5 = async ()=>{
    console.log('t5 started')
    await delay(1000)
    console.log('t5 finished')
}

taskRunnerInstance.push(t1)
taskRunnerInstance.push(t2)
taskRunnerInstance.push(t3)
taskRunnerInstance.push(t4)
taskRunnerInstance.push(t5)