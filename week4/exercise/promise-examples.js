
class Post {
  constructor(userId, id, title, body) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }
}

// Promise without defining onFulfilled and onRejected
fetch('https://jsonplaceholder.typicode.com/posted/1');

// Promise that succeeds
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => {
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }, (error) => {
    console.error('Posts endpoint failed with ', error);
    throw error;
  })
  .catch((error) => {
    console.error('Posts endpoint failed with ', error);
    throw error; // or return some default data for some weird reason : return { "userId": 1, "id": 1, "title": "Post 1", "body": "Body 1" }
  })
  .then((json) => {
    console.log('JSON:', json);
    return new Post(json.userId, json.id, json.title, json.body)
  })
  .then((post) => {
    console.log('Object:', post);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Promise that fails - error variant 1
fetch('https://jsonplaceholder.typicode.com/postssss/1')
  .then((response) => {
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }, (error) => {
    console.error('Posts endpoint failed with ...:', error);
    throw error;
  })
  .then((json) => {
    console.log('JSON:', json);
    return new Post(json.userId, json.id, json.title, json.body)
  })
  .then((post) => {
    console.log('Object:', post);
  })

  // Promise that fails - error variant 2
  fetch('https://jsonplaceholder.typicode.com/postssss/1')
  .then((response) => {
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  })
  .then((json) => {
    console.log('JSON:', json);
    return new Post(json.userId, json.id, json.title, json.body)
  })
  .then((post) => {
    console.log('Object:', post);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  // Promise that fails - error variant 3
  fetch('https://jsonplaceholder.typicode.com/postssss/1')
  .then((response) => {
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }, (error) => {
    console.error('Posts endpoint failed with ...:', error);
    throw error;
  })
  .catch((error) => {
    console.error('Posts endpoint failed with ...:', error);
    throw error; // or return some default data for some weird reason : return { "userId": 1, "id": 1, "title": "Post 1", "body": "Body 1" }
  })
  .then((json) => {
    console.log('JSON:', json);
    return new Post(json.userId, json.id, json.title, json.body)
  })
  .then((post) => {
    console.log('Object:', post);
  })
  .catch((error) => {
    console.error('Error:', error);
  });