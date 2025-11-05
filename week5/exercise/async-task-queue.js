class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(function(listener) {
      listener(data);
    });
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) return;
      this.events[event] = this.events[event].filter(function(listener) {
      return listener !== listenerToRemove;
    });
  }
}

class AsyncTaskQueue extends EventEmitter {
  constructor(options) {
    super();
    this.options = options || { concurrency: 1 };
    this.pendingTasks = new Map();
    this.runningTasks = [];

    this.isRunning = false;

    this.on('completed', this.tick)
    this.on('error', this.tick)
  }

  resume() {
    this.isRunning = true;
    this.tick();
  }

  pause() {
    this.isRunning = false;
  }

  add(task, priority = 0) {
    return new Promise((resolve, reject) => {
      const priorityTasks = this.pendingTasks.get(priority) || [];
      this.pendingTasks.set(priority, [...priorityTasks, task]);
      this.on('completed', (completedTask) => {
        if (completedTask.task === task) {
          resolve(completedTask.result);
        }
      });
      this.on('error', (errorTask) => {
        if (errorTask.task === task) {
          reject(errorTask.error);
        }
      });
      if (!this.isRunning) {
        this.resume();
      } else if (this.runningTasks.length < this.options.concurrency) {
        this.tick();
      }
    })
  }

  tick = (finishedTaskData) => {
    if (!this.isRunning) return

    if (finishedTaskData) this.runningTasks = this.runningTasks.filter(task => task !== finishedTaskData.task);

    if (this.runningTasks.length >= this.options.concurrency) return;

    // get next priority task
    const priorities = [...this.pendingTasks.keys()];
    const topPriority = priorities.filter(key => this.pendingTasks.get(key).length > 0).sort()[0];
    if (topPriority === undefined) return;
    const topPriorityTasks = this.pendingTasks.get(topPriority);
    const nextTask = topPriorityTasks.shift();
    this.runTask(nextTask);
  }

  runTask = async (task) => {
    this.runningTasks.push(task);
    this.emit('active', { task })
    try {
      const result = await task();
      this.emit('completed', { task, result });
    } catch (error) {
      this.emit('error', { task, error });
    } finally {
      if (this.runningTasks.length) return
      this.isRunning = false;
      this.emit('idle');
    }
  }

  onIdle() {
    return new Promise((resolve) => {
      this.on('idle', () => resolve());
    });
  }

  clear() {
    this.pendingTasks.clear();
  }
}


const queue = new AsyncTaskQueue({ concurrency: 6 });
let startTime = Date.now();

// Event listeners
queue.on('add', () => console.log('[queue] Task added to queue'));
queue.on('active', (data) => console.log('[queue] Task started', data));
queue.on('completed', (data) => console.log('[queue] Task completed', data));
queue.on('error', (data) => console.log('[queue] Task failed', data));
queue.on('idle', () => {
  console.log('[queue] All tasks completed! Total duration: ', Date.now() - startTime);
});

let task1StartTime
let task2StartTime
let task3StartTime

queue.add(() => {
  task1StartTime = Date.now();
  console.log('[task] Task 1 start', task1StartTime);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('[task] Task 1 done');
      resolve("result 1")
    }, 2000);
  });
}).then(() => {
  console.log('[task] handled Task 1 done', Date.now() - task1StartTime);
});

queue.add(() => {
  task2StartTime = Date.now();
  console.log('[task] Task 2 start', task2StartTime);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('[task] Task 2 done');
      resolve("result 2")
    }, 5000);
  });
}).then(() => {
  console.log('[task] handled Task 2 done', Date.now() - task2StartTime);
});
queue.add(() => {
  task3StartTime = Date.now();
  console.log('[task] Task 3 start', task3StartTime);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('[task] Task 3 done');
      resolve("result 3")
    }, 4000);
  });
}).then(() => {
  console.log('[task] handled Task 3 done', Date.now() - task3StartTime);
});