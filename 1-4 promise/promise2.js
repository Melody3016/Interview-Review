// 命令常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 判断变量是否为thenable
 * thenable 是指任何拥有then(..)方法的对象或函数。
 * @param {*} val
 */
function isThenable(val) {
  /* if (!val) return false;
  if ((typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function')
    return true;
  return false; */
  return (
    val !== null &&
    (typeof val === 'function' || typeof val === 'object') &&
    typeof val.then === 'function'
  );
}
function isPromise(val) {
  return val instanceof MyPromise;
}

class MyPromise {
  PromiseState = 'pending';
  PromiseResult = undefined;
  #callback = [];

  constructor(actuator) {
    // 更改状态函数
    const resolve = value => {
      if (this.PromiseState !== PENDING) return;
      if (isThenable(value)) {
        try {
          value.then(resolve, reject);
        } catch (error) {
          return reject(error);
        }
      } else {
        this.PromiseState = FULFILLED;
        this.PromiseResult = value;
      }
      // 调用回调函数
      if (this.#callback.length) {
        this.#callback.forEach(item => {
          setTimeout(() => {
            item.onResolved(this.PromiseResult);
          });
        });
      }
    };
    const reject = reason => {
      if (this.PromiseState !== PENDING) return;
      this.PromiseState = REJECTED;
      this.PromiseResult = reason;
      // 调用回调函数
      if (this.#callback.length) {
        this.#callback.forEach(item => {
          setTimeout(() => {
            item.onRejected(this.PromiseResult);
          });
        });
      }
    };
    // 执行actuator，并传入两个改变状态的函数
    try {
      actuator(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onResolved, onRejected) {
    const self = this;
    // 值传透
    onResolved = typeof onResolved === 'function' ? onResolved : value => value;
    // 错误传透
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason;
          };

    return new MyPromise((resolve, reject) => {
      const handle = callback => {
        try {
          const res = callback(self.PromiseResult);
          // 是否为（thenable）
          if (isThenable(res)) {
            // 调用then确认其状态
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (err) {
          reject(err);
        }
      };

      // 判断状态
      if (this.PromiseState === PENDING) {
        // 保存回调函数
        this.#callback.push({
          onResolved() {
            handle(onResolved);
          },
          onRejected() {
            handle(onRejected);
          }
        });
      } else if (this.PromiseState === FULFILLED) {
        // 成功状态
        setTimeout(() => {
          handle(onResolved);
        });
      } else {
        // 失败状态
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
  }

  catch(onRejected) {
    this.then(undefined, onRejected);
  }

  static deferred = function () {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
    });

    return result;
  };
}

module.exports = MyPromise;
