// Simple async task simulator
function asyncTask(value, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Task completed with value: ${value}`);
      resolve(value);
    }, delay);
  });
}

// Generator runner
function run(generatorFunc) {
  const iterator = generatorFunc();
  
  function handle(result) {
    if (result.done) return Promise.resolve(result.value);
    
    return Promise.resolve(result.value)
      .then(value => handle(iterator.next(value)))
      .catch(err => handle(iterator.throw(err)));
  }
  
  return handle(iterator.next());
}

// Using generator as async runner
function* asyncFlow() {
  console.log('Starting async flow...');
  
  const result1 = yield asyncTask('Step 1', 100);
  console.log('Got:', result1);
  
  const result2 = yield asyncTask('Step 2', 50);
  console.log('Got:', result2);
  
  const result3 = yield asyncTask('Step 3', 75);
  console.log('Got:', result3);
  
  return 'All done!';
}

run(asyncFlow).then(result => console.log('Final:', result));