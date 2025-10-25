// todo 
// examples for falsy and truthy values
// examples for ?? 
// examples for !!
//

// examples for Promise.reject and .catch

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (false) {
            reject('Promise rejected!');
            return;
        }
        resolve('Promise resolved!');
    }, 5000);
});

promise.then((message) => {
    console.log(message);
});

promise.then((message) => {
    console.log('Second then: ' + message);
});



// simple implementation of the Promis class in ES5 for teaching purposes
// without using any external libraries

function SimplePromise(executor) {
    this.onResolve = null;
    this.onReject = null;
    
    const resolve = (value) => {
        if (this.onResolve) {
            this.onResolve(value);
        }
    };

    const reject = (reason) => {
        if (this.onReject) {
            this.onReject(reason);
        }
    };

    executor(resolve, reject);
}

SimplePromise.prototype.then = function(onFulfilled, onRejected) {
    return new SimplePromise((resolve, reject) => {
        this.onResolve = (value) => {
            try {
                const result = onFulfilled(value);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        };
        this.onReject = (reason) => {
            if (onRejected) {
                try {
                    const result = onRejected(reason);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(reason);
            }
        };
    });
};

SimplePromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}

const simplePromise = new SimplePromise((resolve, reject) => {
    setTimeout(() => {
        resolve('SimplePromise resolved!');
    }, 3000);
});

// and we can use it likewise

simplePromise.then((message) => {
    console.log(message);
    return 'Chained value';
}).then((chainedMessage) => {
    console.log(chainedMessage);
}).then(() => {
    console.log('End of SimplePromise chain');
}).catch((error) => {
    console.error('Error:', error);
});