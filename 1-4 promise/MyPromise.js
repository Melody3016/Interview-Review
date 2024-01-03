// 三种状态定义为常量
const PENDING = 'pending';
const RESOLVED = 'fulfilled';
const REJECTED = 'rejected';

// 判断是否为thenable
const isThenable = result => {
    return result !== null && (typeof result === 'function' || typeof result === 'object') && typeof result.then === 'function'
}

// 自定义Promise构造函数
function MyPromise(actuator) {
    const self = this;
    // 定义属性
    // 初始状态为pending状态
    this.status = PENDING;
    // 存放数据
    this.result = undefined;
    // 存放回调函数
    this.callbacks = [];


    // 将pending状态改为resolved状态
    function resolve(value) {
        // 如果状态不为pending，则不执行
        if (self.status !== PENDING) return;
        if (value instanceof Promise || isThenable(value)) {
            try {
                value.then(resolve, reject)
            } catch (error) {
                return reject(error)
            }
        } else {
            // 改变状态
            self.status = RESOLVED;
            // 改变数据
            self.result = value;
        }
        // 如果callbacks已经有值，则调用其中的onResolved回调函数
        if (self.callbacks.length > 0) {
            setTimeout(() => {
                self.callbacks.forEach(callbacksObj => {
                    callbacksObj.onResolved(value);
                });
            }, 100)
        }
    }

    // 将pending状态改为rejected状态
    function reject(reason) {
        // 如果状态不为pending，则不执行
        if (self.status !== PENDING) return;
        // 改变状态
        self.status = REJECTED;
        // 改变数据
        self.result = reason;
        // 如果callbacks已经有值，则调用其中的onRejected回调函数
        if (self.callbacks.length > 0) {
            setTimeout(() => {
                self.callbacks.forEach(callbacksObj => {
                    callbacksObj.onRejected(reason);
                });
            }, 100)
        }
    }

    // 立即同步调用actuator，参数为两个能改变状态的函数
    try {
        actuator(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

// 给原型添加then()方法
MyPromise.prototype.then = function (onResolved, onRejected) {
    const self = this;

    // 判断onResolved和onRejected是否传入的是函数
    onResolved = typeof onResolved === 'function' ? onResolved : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : error => {
        throw error
    };

    // then()方法会返回一个新的Promise实例对象，状态根据这次执行的结果而改变
    return new MyPromise((resolve, reject) => {
        function handle(callback) {
            // 如果函数执行过程中抛出异常，则状态直接改为rejected
            try {
                // onResolved()的返回值分为Promise对象和非Promise对象两种情况
                var result = callback(self.result);
                if (result instanceof MyPromise || isThenable(result)) {
                    // 返回值为Promise对象
                    // 调用result的then()方法，判断其状态
                    result.then(resolve, reject);
                } else {
                    // 返回值为非Promise对象
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        }

        // 如果状态为pending
        if (self.status === PENDING) {
            // 将两个回调函数存入callbacks数组中
            self.callbacks.push({
                onResolved() {
                    handle(onResolved);
                },
                onRejected() {
                    handle(onRejected);
                }
            })
        } else if (self.status === RESOLVED) {
            // 状态为resolved
            setTimeout(() => {
                handle(onResolved);
            })

        } else {
            // 状态为rejected
            setTimeout(() => {
                handle(onRejected);
            })
        }
    });
}

// 给原型添加catch方法
MyPromise.prototype.catch = function (onRejected) {
    this.then(undefined, onRejected);
}

// 给函数对象添加resolve方法，返回一个成功的Promise实例对象
MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => {
        // value分为Promise对象和非Promise对象两种情况
        if (value instanceof MyPromise || isThenable(value)) {
            // 为Promise对象
            // 调用result的then()方法，判断其状态
            value.then(resolve, reject);
        } else {
            // 为非Promise对象
            resolve(value);
        }
    })
}

// 给函数对象添加reject方法，返回一个失败的Promise实例对象
MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => {
        reject(reason);
    })
}

// 给函数对象添加all方法
MyPromise.all = function (promises) {
    // 定义数组存放所有成功状态的promise的value值
    const values = new Array(promises.length);
    // 定义计数器
    let count = 0;
    return new MyPromise((resolve, reject) => {
        promises.forEach((p, index) => {
            MyPromise.resolve(p).then(
                value => {
                    count++;
                    values[index] = value;
                    if (count === promises.length) {
                        resolve(values)
                    }
                },
                reason => {
                    reject(reason)
                }
            )
        })
    })
}

// 给函数对象添加race方法
MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        promises.forEach((p) => {
            MyPromise.resolve(p).then(resolve, reject)
        })
    })
}

// 给函数对象添加resolveDelay方法，延时返回一个成功的Promise实例对象
MyPromise.resolveDelay = function (value, time) {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            // value分为Promise对象和非Promise对象两种情况
            if (value instanceof MyPromise) {
                // 为Promise对象
                // 调用result的then()方法，判断其状态
                value.then(resolve, reject);
            } else {
                // 为非Promise对象
                resolve(value);
            }
        }, time)
    })
}

// 给函数对象添加rejectDelay方法，延时返回一个失败的Promise实例对象
MyPromise.rejectDelay = function (reason, time) {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject(reason);
        }, time)
    })
}

MyPromise.deferred = function () {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });

    return result;
}
module.exports = MyPromise;